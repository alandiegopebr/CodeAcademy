const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccountPath = path.join(__dirname, '../firebase-service-account.json');

try {
  const serviceAccount = require(serviceAccountPath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error('Could not load service account. Make sure firebase-service-account.json exists in the project root.');
  process.exit(1);
}

const db = admin.firestore();

const ADMIN_EMAIL = 'alandiegope123@gmail.com';
const ADMIN_UID = process.argv[2] || 'admin-user-id'; // Pass UID as argument or use a default

async function initializeAdmin() {
  try {
    const adminRef = db.collection('users').doc(ADMIN_UID);
    
    await adminRef.set({
      uid: ADMIN_UID,
      email: ADMIN_EMAIL,
      displayName: ADMIN_EMAIL.split('@')[0],
      role: 'admin',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      totalXP: 0,
      completedLessons: [],
    }, { merge: true });

    console.log(`✅ Admin user initialized for ${ADMIN_EMAIL} (UID: ${ADMIN_UID})`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing admin:', error.message);
    process.exit(1);
  }
}

initializeAdmin();
