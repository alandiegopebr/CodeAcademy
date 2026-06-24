/**
 * Seed Firestore with sample lessons and courses using firebase-admin.
 * Usage: set SERVICE_ACCOUNT_PATH to a service account JSON file path and run:
 *   node scripts/seedFirestore.js
 */
const admin = require('firebase-admin')
const sampleLessons = require('../data/sampleLessons.json')
let sampleCourses = []
try {
  sampleCourses = require('../data/sampleCourses.json')
} catch (e) {
  console.warn('Could not load sampleCourses.json')
}

const keyPath = process.env.SERVICE_ACCOUNT_PATH
if(!keyPath){
  console.error('Set SERVICE_ACCOUNT_PATH to your service account JSON file')
  process.exit(1)
}

admin.initializeApp({ credential: admin.credential.cert(require(keyPath)) })
const db = admin.firestore()

async function seed(){
  console.log('Seeding lessons...')
  for(const l of sampleLessons){
    const ref = db.collection('lessons').doc(l.id)
    await ref.set({ title: l.title, description: l.description, points: l.points })
    console.log('  ✓ Seeded lesson:', l.id)
  }

  console.log('Seeding courses...')
  for(const c of sampleCourses){
    const ref = db.collection('courses').doc(c.id)
    await ref.set({ 
      title: c.title, 
      description: c.description, 
      progress: c.progress, 
      duration: c.duration, 
      lessons: c.lessons 
    })
    console.log('  ✓ Seeded course:', c.id)
  }

  console.log('✓ Seed complete')
}

seed().catch((err)=>{ console.error(err); process.exit(1) })
