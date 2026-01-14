#!/usr/bin/env node

/**
 * Automated Test ID Injection System
 *
 * Usage:
 *   node scripts/inject-ids.js              # Add IDs to all elements
 *   node scripts/inject-ids.js --clean tid  # Remove all attributes with "tid-" prefix
 *   node scripts/inject-ids.js --clean el   # Remove all attributes with "el-" prefix
 *
 * This script:
 * 1. Scans all component files (.tsx, .jsx)
 * 2. Parses JSX/TSX to find ALL elements (HTML and React components)
 * 3. Assigns permanent, unique data-testid attributes to each element
 * 4. Stores ID mappings in a JSON file
 * 5. Modifies source files directly with the IDs
 * 6. Reuses existing IDs on subsequent runs (stable across changes)
 *
 * Uses data-testid instead of id because:
 * - Works with React components (they forward data-* attributes)
 * - Industry standard for testing (Playwright, Cypress, etc.)
 * - Won't conflict with CSS or accessibility IDs
 */

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

// Configuration
const COMPONENT_DIRS = [
  'src/components',
  'src/app'
];

const ID_MAP_FILE = 'style-mappings.json';
const ID_PREFIX = 'stylo';
const ATTR_NAME = 'data-style-id';

// Parse command line arguments
const args = process.argv.slice(2);
const cleanIndex = args.indexOf('--clean');
const isCleanMode = cleanIndex !== -1;
const cleanPrefix = isCleanMode ? args[cleanIndex + 1] : null;

if (isCleanMode && !cleanPrefix) {
  console.error('❌ Error: --clean requires a prefix argument');
  console.error('   Example: node scripts/inject-ids.js --clean tid');
  console.error('   Example: node scripts/inject-ids.js --clean el');
  process.exit(1);
}

// Load existing ID mappings or create new one
let idMappings = {};
let idCounter = 0;

if (!isCleanMode && fs.existsSync(ID_MAP_FILE)) {
  idMappings = JSON.parse(fs.readFileSync(ID_MAP_FILE, 'utf-8'));
  // Find highest existing ID number
  Object.values(idMappings).forEach(id => {
    const match = id.match(new RegExp(`${ID_PREFIX}-(\\d+)`));
    if (match) {
      const num = parseInt(match[1]);
      if (num >= idCounter) idCounter = num + 1;
    }
  });
  console.log(`📂 Loaded ${Object.keys(idMappings).length} existing test ID mappings`);
} else if (!isCleanMode) {
  console.log('🆕 Creating new test ID mapping file');
}

/**
 * Generate a unique key for an element based on:
 * - File path
 * - Element type (tag name)
 * - Attributes (especially className)
 * - Position in file
 */
function generateElementKey(filePath, element, line, column) {
  const nameNode = element.openingElement.name;
  // Handle both simple names and member expressions (e.g., Card.Header)
  let tag = 'unknown';
  if (nameNode.name) {
    tag = nameNode.name;
  } else if (nameNode.object && nameNode.property) {
    tag = `${nameNode.object.name}.${nameNode.property.name}`;
  }

  // Get className if it exists
  let className = '';
  const classAttr = element.openingElement.attributes.find(attr =>
    attr.name && attr.name.name === 'className'
  );

  if (classAttr && classAttr.value) {
    if (t.isStringLiteral(classAttr.value)) {
      className = classAttr.value.value;
    } else if (t.isJSXExpressionContainer(classAttr.value)) {
      // For template strings or expressions, use a simplified version
      className = 'dynamic';
    }
  }

  // Create unique key
  const relativePath = path.relative(process.cwd(), filePath);
  return `${relativePath}:${tag}:${className}:${line}:${column}`;
}

/**
 * Get or create ID for an element
 */
function getOrCreateId(elementKey) {
  if (idMappings[elementKey]) {
    return idMappings[elementKey];
  }

  const newId = `${ID_PREFIX}-${idCounter++}`;
  idMappings[elementKey] = newId;
  return newId;
}

/**
 * Clean file - remove attributes with given prefix
 */
function cleanFile(filePath, prefix) {
  console.log(`\n📄 Cleaning: ${path.relative(process.cwd(), filePath)}`);

  const code = fs.readFileSync(filePath, 'utf-8');

  let ast;
  try {
    ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
  } catch (error) {
    console.error(`❌ Parse error in ${filePath}:`, error.message);
    return 0;
  }

  let modified = false;
  let removedCount = 0;
  const prefixPattern = new RegExp(`^${prefix}-\\d+$`);

  traverse(ast, {
    JSXElement(path) {
      const element = path.node;
      const attrs = element.openingElement.attributes;

      // Find and remove attributes with matching prefix
      for (let i = attrs.length - 1; i >= 0; i--) {
        const attr = attrs[i];
        if (attr.name && attr.value && t.isStringLiteral(attr.value)) {
          if (prefixPattern.test(attr.value.value)) {
            attrs.splice(i, 1);
            modified = true;
            removedCount++;
          }
        }
      }
    }
  });

  if (modified) {
    const output = generate(ast, {
      retainLines: true,
      retainFunctionParens: true,
    }, code);

    fs.writeFileSync(filePath, output.code, 'utf-8');
    console.log(`🧹 Removed ${removedCount} attributes with "${prefix}-" prefix`);
  } else {
    console.log(`⏭️  No "${prefix}-" attributes found`);
  }

  return removedCount;
}

/**
 * Process a single file - add IDs
 */
function processFile(filePath) {
  console.log(`\n📄 Processing: ${path.relative(process.cwd(), filePath)}`);

  const code = fs.readFileSync(filePath, 'utf-8');

  let ast;
  try {
    ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
  } catch (error) {
    console.error(`❌ Parse error in ${filePath}:`, error.message);
    return;
  }

  let modified = false;
  let addedCount = 0;
  let skippedCount = 0;

  traverse(ast, {
    JSXElement(path) {
      const element = path.node;
      const { line, column } = element.loc.start;

      // Get the tag name (works for both HTML elements and React components)
      const nameNode = element.openingElement.name;
      let tagName = null;
      if (nameNode.name) {
        tagName = nameNode.name;
      } else if (nameNode.object && nameNode.property) {
        tagName = `${nameNode.object.name}.${nameNode.property.name}`;
      }

      if (!tagName) {
        return;
      }

      // Skip if already has the attribute
      const hasTestId = element.openingElement.attributes.some(attr =>
        attr.name && attr.name.name === ATTR_NAME
      );

      if (hasTestId) {
        skippedCount++;
        return;
      }

      // Generate element key and get/create ID
      const elementKey = generateElementKey(filePath, element, line, column);
      const id = getOrCreateId(elementKey);

      // Add attribute
      const testIdAttr = t.jsxAttribute(
        t.jsxIdentifier(ATTR_NAME),
        t.stringLiteral(id)
      );

      element.openingElement.attributes.unshift(testIdAttr);
      modified = true;
      addedCount++;
    }
  });

  if (modified) {
    const output = generate(ast, {
      retainLines: true,
      retainFunctionParens: true,
    }, code);

    fs.writeFileSync(filePath, output.code, 'utf-8');
    console.log(`✅ Added ${addedCount} IDs, skipped ${skippedCount} (already have IDs)`);
  } else {
    console.log(`⏭️  No changes needed (${skippedCount} elements already have IDs)`);
  }
}

/**
 * Recursively find all component files
 */
function findComponentFiles(dir) {
  const files = [];

  if (!fs.existsSync(dir)) {
    console.warn(`⚠️  Directory not found: ${dir}`);
    return files;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules and .next
      if (item === 'node_modules' || item === '.next' || item === 'ui') {
        continue;
      }
      files.push(...findComponentFiles(fullPath));
    } else if (item.match(/\.(tsx|jsx)$/) && !item.includes('.test.') && !item.includes('.spec.')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Main execution
 */
function main() {
  if (isCleanMode) {
    console.log(`🧹 Starting Clean Mode - Removing "${cleanPrefix}-" prefixed attributes\n`);
    console.log('='.repeat(60));
  } else {
    console.log('🚀 Starting Automated ID Injection System\n');
    console.log(`   Attribute: ${ATTR_NAME}`);
    console.log(`   Prefix: ${ID_PREFIX}\n`);
    console.log('='.repeat(60));
  }

  // Find all component files
  let allFiles = [];
  for (const dir of COMPONENT_DIRS) {
    const files = findComponentFiles(dir);
    allFiles.push(...files);
  }

  console.log(`\n📦 Found ${allFiles.length} component files to process\n`);

  if (isCleanMode) {
    // Clean mode - remove attributes
    let totalRemoved = 0;
    for (const file of allFiles) {
      totalRemoved += cleanFile(file, cleanPrefix);
    }
    console.log('\n' + '='.repeat(60));
    console.log(`\n🧹 Cleaned ${totalRemoved} total "${cleanPrefix}-" attributes`);
    console.log('\n✨ Done!');
  } else {
    // Normal mode - add IDs
    for (const file of allFiles) {
      processFile(file);
    }

    // Save updated ID mappings
    fs.writeFileSync(ID_MAP_FILE, JSON.stringify(idMappings, null, 2), 'utf-8');
    console.log('\n' + '='.repeat(60));
    console.log(`\n💾 Saved ${Object.keys(idMappings).length} ID mappings to ${ID_MAP_FILE}`);
    console.log(`\n✨ Done! All elements now have permanent IDs.`);
    console.log(`\nNext ID will be: ${ID_PREFIX}-${idCounter}`);
  }
}

// Run the script
main();
