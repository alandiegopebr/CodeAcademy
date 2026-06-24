/**
 * Reset Firestore (deletes lessons and courses) and re-seed with fresh data.
 * Preserves all user data (users collection).
 * Usage: set SERVICE_ACCOUNT_PATH to a service account JSON file path and run:
 *   SERVICE_ACCOUNT_PATH=./service-account-key.json node scripts/resetAndSeedFirestore.js
 */
const admin = require('firebase-admin');
const sampleLessons = require('../data/sampleLessons.json');
let sampleCourses = [];
try {
  sampleCourses = require('../data/sampleCourses.json');
} catch (e) {
  console.warn('Could not load sampleCourses.json');
}

const keyPath = process.env.SERVICE_ACCOUNT_PATH;
if (!keyPath) {
  console.error('Set SERVICE_ACCOUNT_PATH to your service account JSON file');
  process.exit(1);
}

admin.initializeApp({ credential: admin.credential.cert(require(keyPath)) });
const db = admin.firestore();

async function deleteCollection(collectionPath, batchSize = 100) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve, reject);
  });
}

async function deleteQueryBatch(db, query, resolve, reject) {
  try {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
      resolve();
      return;
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    process.nextTick(() => {
      deleteQueryBatch(db, query, resolve, reject);
    });
  } catch (error) {
    reject(error);
  }
}

async function seed() {
  console.log('🔄 Starting reset and seed process...\n');

  // Delete existing lessons
  console.log('🗑️  Deleting existing lessons...');
  await deleteCollection('lessons');
  console.log('✓ Lessons deleted\n');

  // Delete existing courses
  console.log('🗑️  Deleting existing courses...');
  await deleteCollection('courses');
  console.log('✓ Courses deleted\n');

  // NOTE: users collection is preserved!
  console.log('✓ Users collection preserved\n');

  // Seed lessons
  console.log('📚 Seeding lessons...');
  for (const l of sampleLessons) {
    const ref = db.collection('lessons').doc(l.id);
    await ref.set({
      title: l.title,
      description: l.description,
      points: l.points,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`  ✓ Seeded lesson: ${l.id}`);
  }
  console.log();

  // Seed courses
  console.log('📖 Seeding courses...');
  for (const c of sampleCourses) {
    const ref = db.collection('courses').doc(c.id);
    await ref.set({
      title: c.title,
      description: c.description,
      progress: c.progress,
      duration: c.duration,
      lessons: c.lessons,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`  ✓ Seeded course: ${c.id}`);
  }
  console.log();

  console.log('✅ Reset and seed complete!');
  console.log('📊 All users preserved in the "users" collection');
}

seed().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
