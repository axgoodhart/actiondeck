const admin = require('firebase-admin');
const path = require('path');

// Initialize with service account
const serviceAccount = require(path.join(__dirname, '..', 'serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function findInboxDaily() {
  try {
    // Try collectionGroup query - finds inboxDaily anywhere in the DB
    console.log('=== Searching for inboxDaily via collectionGroup ===\n');

    const snapshot = await db.collectionGroup('inboxDaily').limit(10).get();

    if (snapshot.empty) {
      console.log('No docs found in any inboxDaily collection.');

      // Try lowercase version
      console.log('\n=== Trying inboxdaily (lowercase) ===\n');
      const snapshot2 = await db.collectionGroup('inboxdaily').limit(10).get();

      if (snapshot2.empty) {
        console.log('No docs found in inboxdaily either.');
      } else {
        console.log(`Found ${snapshot2.size} docs:`);
        snapshot2.forEach(doc => {
          console.log(`Path: ${doc.ref.path}`);
          console.log(JSON.stringify(doc.data(), null, 2));
        });
      }
    } else {
      console.log(`Found ${snapshot.size} docs:`);
      snapshot.forEach(doc => {
        console.log(`Path: ${doc.ref.path}`);
        console.log(JSON.stringify(doc.data(), null, 2));
      });
    }

  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nNote: collectionGroup queries require a Firestore index.');
  }

  process.exit(0);
}

findInboxDaily();
