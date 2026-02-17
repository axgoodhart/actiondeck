#!/usr/bin/env node

/**
 * Automated Style ID Injection System
 *
 * Usage:
 *   node inject-ids.js                  # Add IDs to all elements (auto-discovers project)
 *   node inject-ids.js --clean          # Remove all style-id="stylo-*" attributes
 *   node inject-ids.js --clean tid      # Remove ANY attribute with "tid-*" value (migration)
 *   node inject-ids.js --dry-run        # Preview without modifying files
 *   node inject-ids.js --clean --dry-run # Preview what --clean would remove
 *
 * This script automatically:
 * 1. Detects your project structure (Next.js, Vite, CRA, etc.)
 * 2. Finds all JSX/TSX component files
 * 3. Skips UI library folders (shadcn, Radix, etc.)
 * 4. Assigns permanent, unique style-id attributes to each element
 * 5. Stores ID mappings in a JSON file for stability across runs
 *
 * Zero configuration required - just run it in any React project.
 */

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

// Constants
const ID_MAP_FILE = 'style-mappings.json';
const ID_PREFIX = 'stylo';
const ATTR_NAME = 'style-id';

// Directories to always skip
const SKIP_DIRS = new Set([
  'node_modules',
  '.next',
  'dist',
  'build',
  '.git',
  'coverage',
  '__tests__',
  '__mocks__',
  '.turbo',
  'out',
  '.vercel',
]);

// Patterns that indicate a UI library folder (should be skipped)
const UI_LIBRARY_PATTERNS = [
  /^ui$/,                    // shadcn: components/ui
  /^primitives$/,            // custom primitive folders
  /^radix-ui$/,
  /^@radix-ui$/,
  /^chakra$/,
  /^@chakra-ui$/,
  /^mantine$/,
  /^@mantine$/,
  /^ant-design$/,
  /^antd$/,
];

// Parse command line arguments
const args = process.argv.slice(2);
const isCleanMode = args.includes('--clean');
const isDryRun = args.includes('--dry-run');

// --clean with no arg removes stylo-* from style-id attrs
// --clean <prefix> removes <prefix>-* from ANY attribute value (for migrating away from old systems)
const cleanIndex = args.indexOf('--clean');
const cleanArg = (cleanIndex !== -1 && args[cleanIndex + 1] && !args[cleanIndex + 1].startsWith('--'))
  ? args[cleanIndex + 1]
  : null;
const isCustomClean = isCleanMode && cleanArg !== null;

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
  console.log(`📂 Loaded ${Object.keys(idMappings).length} existing style ID mappings`);
} else if (!isCleanMode) {
  console.log('🆕 Creating new style ID mapping file');
}

/**
 * Auto-detect project structure and find source directories
 */
function discoverProjectStructure() {
  const result = {
    framework: null,
    srcDirs: [],
    uiLibraryDirs: [],
  };

  // Try to detect framework from package.json
  const pkgPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };

      if (deps['next']) result.framework = 'Next.js';
      else if (deps['vite']) result.framework = 'Vite';
      else if (deps['react-scripts']) result.framework = 'Create React App';
      else if (deps['gatsby']) result.framework = 'Gatsby';
      else if (deps['remix']) result.framework = 'Remix';
      else if (deps['react']) result.framework = 'React';
    } catch (e) {
      // Ignore parse errors
    }
  }

  // Common source directory patterns to check
  const commonSrcPaths = [
    'src/components',
    'src/app',
    'src/pages',
    'src/views',
    'src/features',
    'src/modules',
    'src/screens',
    'src/layouts',
    'components',
    'app',
    'pages',
    'lib',
    'src',
  ];

  // Find which directories exist and contain JSX/TSX files
  for (const srcPath of commonSrcPaths) {
    const fullPath = path.join(process.cwd(), srcPath);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
      if (hasJsxFiles(fullPath)) {
        result.srcDirs.push(srcPath);
      }
    }
  }

  // If no common paths found, scan from current directory
  if (result.srcDirs.length === 0) {
    result.srcDirs.push('.');
  }

  // Remove nested paths (if we have 'src' and 'src/components', just use 'src')
  result.srcDirs = removeNestedPaths(result.srcDirs);

  return result;
}

/**
 * Check if a directory contains any JSX/TSX files (shallow check)
 */
function hasJsxFiles(dir, depth = 0) {
  if (depth > 2) return false; // Don't go too deep for initial check

  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      if (SKIP_DIRS.has(item)) continue;

      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isFile() && /\.(tsx|jsx)$/.test(item)) {
        return true;
      }
      if (stat.isDirectory() && hasJsxFiles(fullPath, depth + 1)) {
        return true;
      }
    }
  } catch (e) {
    // Ignore permission errors etc
  }
  return false;
}

/**
 * Remove nested paths - if 'src' exists, remove 'src/components'
 */
function removeNestedPaths(paths) {
  const sorted = [...paths].sort((a, b) => a.length - b.length);
  const result = [];

  for (const p of sorted) {
    const isNested = result.some(existing =>
      p.startsWith(existing + '/') || p.startsWith(existing + path.sep)
    );
    if (!isNested) {
      result.push(p);
    }
  }

  return result;
}

/**
 * Check if a directory looks like a UI library folder
 */
function isUiLibraryDir(dirName, dirPath) {
  // Check against known patterns
  if (UI_LIBRARY_PATTERNS.some(pattern => pattern.test(dirName))) {
    return true;
  }

  // Heuristic: if folder has many small files that look like primitives, skip it
  try {
    const files = fs.readdirSync(dirPath);
    const jsxFiles = files.filter(f => /\.(tsx|jsx)$/.test(f));

    // If >10 JSX files and most are small (<100 lines), likely a UI library
    if (jsxFiles.length > 10) {
      let smallFileCount = 0;
      for (const file of jsxFiles.slice(0, 10)) { // Sample first 10
        const content = fs.readFileSync(path.join(dirPath, file), 'utf-8');
        const lines = content.split('\n').length;
        if (lines < 100) smallFileCount++;
      }
      if (smallFileCount >= 7) return true; // 70%+ are small
    }
  } catch (e) {
    // Ignore errors
  }

  return false;
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
 * Clean file - remove style IDs or custom-prefixed attribute values
 *
 * Default (--clean):         removes style-id="stylo-*" attrs
 * Custom  (--clean <prefix>): removes ANY attr whose value matches <prefix>-*
 */
function cleanFile(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
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

  if (isCustomClean) {
    // Custom prefix mode: remove ANY attribute whose value matches <prefix>-<number>
    const prefixPattern = new RegExp(`^${cleanArg}-\\d+$`);

    traverse(ast, {
      JSXElement(nodePath) {
        const attrs = nodePath.node.openingElement.attributes;
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
  } else {
    // Default mode: remove style-id="stylo-*" attributes specifically
    const prefixPattern = new RegExp(`^${ID_PREFIX}-\\d+$`);

    traverse(ast, {
      JSXElement(nodePath) {
        const attrs = nodePath.node.openingElement.attributes;
        for (let i = attrs.length - 1; i >= 0; i--) {
          const attr = attrs[i];
          if (attr.name && attr.name.name === ATTR_NAME && attr.value && t.isStringLiteral(attr.value)) {
            if (prefixPattern.test(attr.value.value)) {
              attrs.splice(i, 1);
              modified = true;
              removedCount++;
            }
          }
        }
      }
    });
  }

  if (modified) {
    if (isDryRun) {
      console.log(`  ${relativePath}: would remove ${removedCount} IDs`);
    } else {
      const output = generate(ast, {
        retainLines: true,
        retainFunctionParens: true,
      }, code);

      fs.writeFileSync(filePath, output.code, 'utf-8');
      console.log(`  ${relativePath}: removed ${removedCount} IDs`);
    }
  }

  return removedCount;
}

/**
 * Process a single file - add IDs
 */
function processFile(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
  const code = fs.readFileSync(filePath, 'utf-8');

  let ast;
  try {
    ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
  } catch (error) {
    console.error(`❌ Parse error in ${filePath}:`, error.message);
    return { added: 0, skipped: 0 };
  }

  let modified = false;
  let addedCount = 0;
  let skippedCount = 0;

  traverse(ast, {
    JSXElement(nodePath) {
      const element = nodePath.node;
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
      const hasStyleId = element.openingElement.attributes.some(attr =>
        attr.name && attr.name.name === ATTR_NAME
      );

      if (hasStyleId) {
        skippedCount++;
        return;
      }

      // Generate element key and get/create ID
      const elementKey = generateElementKey(filePath, element, line, column);
      const id = getOrCreateId(elementKey);

      // Add attribute
      const styleIdAttr = t.jsxAttribute(
        t.jsxIdentifier(ATTR_NAME),
        t.stringLiteral(id)
      );

      element.openingElement.attributes.unshift(styleIdAttr);
      modified = true;
      addedCount++;
    }
  });

  if (modified) {
    if (isDryRun) {
      console.log(`  ${relativePath}: would add ${addedCount} IDs`);
    } else {
      const output = generate(ast, {
        retainLines: true,
        retainFunctionParens: true,
      }, code);

      fs.writeFileSync(filePath, output.code, 'utf-8');
      console.log(`  ${relativePath}: added ${addedCount} IDs`);
    }
  }

  return { added: addedCount, skipped: skippedCount };
}

/**
 * Recursively find all component files, with smart skipping
 */
function findComponentFiles(dir, skippedDirs = []) {
  const files = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);

    let stat;
    try {
      stat = fs.statSync(fullPath);
    } catch (e) {
      continue; // Skip files we can't stat
    }

    if (stat.isDirectory()) {
      // Skip known non-source directories
      if (SKIP_DIRS.has(item)) {
        continue;
      }

      // Check if this looks like a UI library folder
      if (isUiLibraryDir(item, fullPath)) {
        skippedDirs.push(path.relative(process.cwd(), fullPath));
        continue;
      }

      files.push(...findComponentFiles(fullPath, skippedDirs));
    } else if (
      /\.(tsx|jsx)$/.test(item) &&
      !item.includes('.test.') &&
      !item.includes('.spec.') &&
      !item.includes('.stories.')
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Main execution
 */
function main() {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║           Style ID Injection System                      ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log('');

  // Auto-discover project structure
  console.log('🔍 Analyzing project structure...');
  const structure = discoverProjectStructure();

  if (structure.framework) {
    console.log(`   Framework: ${structure.framework}`);
  }
  console.log(`   Source dirs: ${structure.srcDirs.join(', ')}`);
  console.log(`   Attribute: ${ATTR_NAME}="${ID_PREFIX}-*"`);
  if (isDryRun) {
    console.log('   Mode: DRY RUN (no files will be modified)');
  }
  console.log('');

  // Find all component files
  const skippedDirs = [];
  let allFiles = [];
  for (const dir of structure.srcDirs) {
    const files = findComponentFiles(dir, skippedDirs);
    allFiles.push(...files);
  }

  // Deduplicate files (in case of overlapping paths)
  allFiles = [...new Set(allFiles)];

  console.log(`📦 Found ${allFiles.length} component files`);
  if (skippedDirs.length > 0) {
    console.log(`   Skipped UI libraries: ${skippedDirs.join(', ')}`);
  }
  console.log('');

  if (allFiles.length === 0) {
    console.log('⚠️  No JSX/TSX files found. Make sure you\'re in a React project root.');
    process.exit(1);
  }

  if (isCleanMode) {
    // Clean mode - remove attributes
    const target = isCustomClean ? `${cleanArg}-* (any attribute)` : `${ATTR_NAME}="${ID_PREFIX}-*"`;
    console.log(`🧹 Removing ${target}...`);
    let totalRemoved = 0;
    for (const file of allFiles) {
      totalRemoved += cleanFile(file);
    }
    console.log('');
    if (isDryRun) {
      console.log(`Would remove ${totalRemoved} total IDs`);
    } else {
      console.log(`✓ Removed ${totalRemoved} IDs`);
    }
  } else {
    // Normal mode - add IDs
    console.log('📝 Injecting style IDs...');
    let totalAdded = 0;
    let totalSkipped = 0;
    for (const file of allFiles) {
      const { added, skipped } = processFile(file);
      totalAdded += added;
      totalSkipped += skipped;
    }
    console.log('');

    if (isDryRun) {
      console.log(`Would add ${totalAdded} IDs (${totalSkipped} already have IDs)`);
    } else {
      // Save updated ID mappings
      fs.writeFileSync(ID_MAP_FILE, JSON.stringify(idMappings, null, 2), 'utf-8');
      console.log(`✓ Added ${totalAdded} IDs (${totalSkipped} already had IDs)`);
      console.log(`✓ Saved mappings to ${ID_MAP_FILE}`);
      console.log(`   Next ID: ${ID_PREFIX}-${idCounter}`);
    }
  }

  console.log('');
}

// Run the script
main();
