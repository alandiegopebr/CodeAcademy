import type { User } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

export const ADMIN_EMAIL = 'alandiegope123@gmail.com';

export function isAdmin(user: User | null | undefined) {
  return user?.email === ADMIN_EMAIL;
}

export async function getUserRole(userId: string): Promise<'student' | 'teacher' | 'admin' | null> {
  try {
    const db = getFirestore();
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const role = userSnap.data().role;
      if (role === 'student' || role === 'teacher' || role === 'admin') {
        return role;
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
}

export async function isTeacher(userId: string): Promise<boolean> {
  const role = await getUserRole(userId);
  return role === 'teacher' || role === 'admin';
}

export async function isApprovedTeacher(userId: string): Promise<boolean> {
  try {
    const db = getFirestore();
    const teacherRef = doc(db, 'teachers', userId);
    const teacherSnap = await getDoc(teacherRef);
    
    if (teacherSnap.exists()) {
      return teacherSnap.data().status === 'approved';
    }
    return false;
  } catch (error) {
    console.error('Error checking teacher approval:', error);
    return false;
  }
}
