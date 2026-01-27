#!/usr/bin/env node
const admin = require('firebase-admin');
const readline = require('readline');
const path = require('path');

// Initialize Firebase
const serviceAccount = require(path.join(__dirname, '..', 'serviceAccountKey.json'));
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

// ANSI colors
const c = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(q) {
  return new Promise(resolve => rl.question(q, resolve));
}

function printBox(title) {
  const line = '─'.repeat(50);
  console.log(`\n${c.cyan}┌${line}┐${c.reset}`);
  console.log(`${c.cyan}│${c.reset} ${c.bright}${title.padEnd(48)}${c.reset} ${c.cyan}│${c.reset}`);
  console.log(`${c.cyan}└${line}┘${c.reset}`);
}

function printHelp() {
  console.log(`
${c.bright}Commands:${c.reset}
  ${c.green}query <collection>${c.reset}    Query a collectionGroup (e.g., query inboxDaily)
  ${c.green}path <full/path>${c.reset}      Query a specific collection path
  ${c.green}doc <full/doc/path>${c.reset}   Get a specific document
  ${c.green}list <doc/path>${c.reset}       List subcollections under a document
  ${c.green}limit <n>${c.reset}             Set result limit (default: 10)
  ${c.green}json${c.reset}                  Toggle JSON output mode
  ${c.green}help${c.reset}                  Show this help
  ${c.green}exit${c.reset}                  Quit
`);
}

let resultLimit = 120;
let jsonMode = true;

async function queryCollectionGroup(name) {
  console.log(`${c.dim}Querying collectionGroup: ${name} (limit: ${resultLimit})${c.reset}\n`);

  try {
    const snapshot = await db.collectionGroup(name).limit(resultLimit).get();

    if (snapshot.empty) {
      console.log(`${c.yellow}No documents found.${c.reset}`);
      return;
    }

    console.log(`${c.green}Found ${snapshot.size} document(s):${c.reset}\n`);

    snapshot.forEach((doc, i) => {
      console.log(`${c.magenta}[${doc.ref.path}]${c.reset}`);
      if (jsonMode) {
        console.log(JSON.stringify(doc.data(), null, 2));
      } else {
        printData(doc.data());
      }
      console.log('');
    });
  } catch (err) {
    console.log(`${c.red}Error: ${err.message}${c.reset}`);
  }
}

async function queryPath(collPath) {
  console.log(`${c.dim}Querying path: ${collPath} (limit: ${resultLimit})${c.reset}\n`);

  try {
    const snapshot = await db.collection(collPath).limit(resultLimit).get();

    if (snapshot.empty) {
      console.log(`${c.yellow}No documents found.${c.reset}`);
      return;
    }

    console.log(`${c.green}Found ${snapshot.size} document(s):${c.reset}\n`);

    snapshot.forEach(doc => {
      console.log(`${c.magenta}[${doc.id}]${c.reset}`);
      if (jsonMode) {
        console.log(JSON.stringify(doc.data(), null, 2));
      } else {
        printData(doc.data());
      }
      console.log('');
    });
  } catch (err) {
    console.log(`${c.red}Error: ${err.message}${c.reset}`);
  }
}

async function getDoc(docPath) {
  console.log(`${c.dim}Getting document: ${docPath}${c.reset}\n`);

  try {
    const doc = await db.doc(docPath).get();

    if (!doc.exists) {
      console.log(`${c.yellow}Document does not exist (may have subcollections only).${c.reset}`);
      // Try listing subcollections
      const subs = await db.doc(docPath).listCollections();
      if (subs.length > 0) {
        console.log(`${c.green}Subcollections:${c.reset}`);
        subs.forEach(s => console.log(`  ${c.cyan}${s.id}${c.reset}`));
      }
      return;
    }

    console.log(`${c.magenta}[${doc.id}]${c.reset}`);
    if (jsonMode) {
      console.log(JSON.stringify(doc.data(), null, 2));
    } else {
      printData(doc.data());
    }
  } catch (err) {
    console.log(`${c.red}Error: ${err.message}${c.reset}`);
  }
}

async function listSubcollections(docPath) {
  console.log(`${c.dim}Listing subcollections under: ${docPath}${c.reset}\n`);

  try {
    const subs = await db.doc(docPath).listCollections();

    if (subs.length === 0) {
      console.log(`${c.yellow}No subcollections found.${c.reset}`);
      return;
    }

    console.log(`${c.green}Found ${subs.length} subcollection(s):${c.reset}\n`);

    for (const coll of subs) {
      const snapshot = await coll.limit(1).get();
      const count = snapshot.size > 0 ? '1+' : '0';
      console.log(`  ${c.cyan}${coll.id}${c.reset} ${c.dim}(${count} docs)${c.reset}`);
    }
  } catch (err) {
    console.log(`${c.red}Error: ${err.message}${c.reset}`);
  }
}

function printData(data, indent = '') {
  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) {
      console.log(`${indent}${c.cyan}${key}:${c.reset} ${c.dim}null${c.reset}`);
    } else if (value._seconds !== undefined) {
      // Firestore timestamp
      const date = new Date(value._seconds * 1000);
      console.log(`${indent}${c.cyan}${key}:${c.reset} ${c.yellow}${date.toISOString()}${c.reset}`);
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        console.log(`${indent}${c.cyan}${key}:${c.reset} []`);
      } else if (typeof value[0] === 'object') {
        console.log(`${indent}${c.cyan}${key}:${c.reset} [${value.length} items]`);
      } else {
        const preview = value.slice(0, 3).join(', ');
        const more = value.length > 3 ? `, +${value.length - 3} more` : '';
        console.log(`${indent}${c.cyan}${key}:${c.reset} [${preview}${more}]`);
      }
    } else if (typeof value === 'object') {
      console.log(`${indent}${c.cyan}${key}:${c.reset} {${Object.keys(value).length} keys}`);
    } else if (typeof value === 'string' && value.length > 80) {
      console.log(`${indent}${c.cyan}${key}:${c.reset} "${value.substring(0, 77)}..."`);
    } else {
      console.log(`${indent}${c.cyan}${key}:${c.reset} ${JSON.stringify(value)}`);
    }
  }
}

async function main() {
  printBox('Firestore CLI - briizos');
  console.log(`${c.dim}Type 'help' for commands${c.reset}`);

  while (true) {
    const input = await prompt(`\n${c.green}firestore>${c.reset} `);
    const [cmd, ...args] = input.trim().split(/\s+/);

    switch (cmd?.toLowerCase()) {
      case 'query':
      case 'q':
        if (args[0]) await queryCollectionGroup(args[0]);
        else console.log(`${c.yellow}Usage: query <collectionName>${c.reset}`);
        break;

      case 'path':
      case 'p':
        if (args[0]) await queryPath(args.join(' '));
        else console.log(`${c.yellow}Usage: path <collection/path>${c.reset}`);
        break;

      case 'doc':
      case 'd':
        if (args[0]) await getDoc(args.join(' '));
        else console.log(`${c.yellow}Usage: doc <document/path>${c.reset}`);
        break;

      case 'list':
      case 'ls':
        if (args[0]) await listSubcollections(args.join(' '));
        else console.log(`${c.yellow}Usage: list <document/path>${c.reset}`);
        break;

      case 'limit':
      case 'l':
        if (args[0] && !isNaN(args[0])) {
          resultLimit = parseInt(args[0]);
          console.log(`${c.green}Limit set to ${resultLimit}${c.reset}`);
        } else {
          console.log(`${c.dim}Current limit: ${resultLimit}${c.reset}`);
        }
        break;

      case 'json':
      case 'j':
        jsonMode = !jsonMode;
        console.log(`${c.green}JSON mode: ${jsonMode ? 'ON' : 'OFF'}${c.reset}`);
        break;

      case 'help':
      case 'h':
      case '?':
        printHelp();
        break;

      case 'exit':
      case 'quit':
      case 'q!':
        console.log(`${c.dim}Goodbye!${c.reset}`);
        rl.close();
        process.exit(0);

      case '':
      case undefined:
        break;

      default:
        console.log(`${c.yellow}Unknown command: ${cmd}. Type 'help' for commands.${c.reset}`);
    }
  }
}

main().catch(console.error);
