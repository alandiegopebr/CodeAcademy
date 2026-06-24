import type { Course } from '@/types/course';
import { collection, doc, getDoc, getDocs, increment, limit, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function getCourses(): Promise<Course[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'courses'));
    const courses: Course[] = [];
    querySnapshot.forEach((doc) => {
      courses.push({ id: doc.id, ...doc.data() } as Course);
    });
    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export async function getCourseById(id: string): Promise<Course | null> {
  try {
    const docRef = doc(db, 'courses', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Course;
    }
    return null;
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
}

export async function getLessons() {
  try {
    const querySnapshot = await getDocs(collection(db, 'lessons'));
    const lessons: any[] = [];
    querySnapshot.forEach((doc) => {
      lessons.push({ id: doc.id, ...doc.data() });
    });
    return lessons;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return [];
  }
}

export async function getUserXP(userId: string): Promise<number> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data().totalXP || 0;
    }
    return 0;
  } catch (error) {
    console.error('Error fetching user XP:', error);
    return 0;
  }
}

export async function getUserCompletedLessons(userId: string): Promise<string[]> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data().completedLessons || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching completed lessons:', error);
    return [];
  }
}

export async function addUserXP(userId: string, xpAmount: number, email: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      await updateDoc(userRef, {
        totalXP: increment(xpAmount),
        updatedAt: new Date(),
      });
    } else {
      await setDoc(userRef, {
        email,
        totalXP: xpAmount,
        completedLessons: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  } catch (error) {
    console.error('Error adding user XP:', error);
  }
}

export async function markLessonComplete(userId: string, lessonId: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const completedLessons = userSnap.data().completedLessons || [];
      if (!completedLessons.includes(lessonId)) {
        await updateDoc(userRef, {
          completedLessons: [...completedLessons, lessonId],
          updatedAt: new Date(),
        });
      }
    }
  } catch (error) {
    console.error('Error marking lesson complete:', error);
  }
}

export async function getLeaderboard(limitAmount: number = 10): Promise<any[]> {
  try {
    const q = query(
      collection(db, 'users'),
      orderBy('totalXP', 'desc'),
      limit(limitAmount)
    );
    const querySnapshot = await getDocs(q);
    const leaderboard: any[] = [];
    let rank = 1;
    querySnapshot.forEach((doc) => {
      leaderboard.push({
        rank: rank++,
        name: doc.data().email?.split('@')[0] || 'Anonymous',
        xp: doc.data().totalXP || 0,
        email: doc.data().email,
      });
    });
    return leaderboard;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

export function getUserData() {
  return null;
}
