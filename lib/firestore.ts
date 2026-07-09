import type { Course } from '@/types/course';
import type { Activity, ActivityCompletion, Class, Teacher, UserRole } from '@/types/user';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    runTransaction,
    serverTimestamp,
    setDoc,
    Timestamp,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from './firebase';

export type LeaderboardEntry = {
  rank: number;
  name: string;
  xp: number;
};

export type Lesson = {
  id: string;
  title: string;
  description?: string;
  points: number;
};

type UserProgress = {
  createdAt?: unknown;
  email?: string;
  totalXP?: number;
  completedLessons?: string[];
};

export type LessonCompletionResult = {
  alreadyCompleted: boolean;
  completedLessons: string[];
  totalXP: number;
};

function toCourse(id: string, data: Record<string, unknown>): Course | null {
  if (
    typeof data.title !== 'string' ||
    typeof data.description !== 'string' ||
    typeof data.progress !== 'string' ||
    typeof data.duration !== 'string' ||
    typeof data.lessons !== 'number'
  ) {
    return null;
  }

  return {
    id,
    title: data.title,
    description: data.description,
    progress: data.progress,
    duration: data.duration,
    lessons: data.lessons,
  };
}

function toLesson(id: string, data: Record<string, unknown>): Lesson | null {
  if (typeof data.title !== 'string' || typeof data.points !== 'number') {
    return null;
  }

  return {
    id,
    title: data.title,
    description: typeof data.description === 'string' ? data.description : undefined,
    points: data.points,
  };
}

function getDisplayName(email: string) {
  return email.split('@')[0] || 'Learner';
}

export async function getCourses(): Promise<Course[]> {
  if (!db) {
    return [];
  }

  try {
    const querySnapshot = await getDocs(collection(db, 'courses'));
    const courses: Course[] = [];
    querySnapshot.forEach((courseDoc) => {
      const course = toCourse(courseDoc.id, courseDoc.data());
      if (course) {
        courses.push(course);
      }
    });
    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export async function getCourseById(id: string): Promise<Course | null> {
  if (!db) {
    return null;
  }

  try {
    const docRef = doc(db, 'courses', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return toCourse(docSnap.id, docSnap.data());
    }
    return null;
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
}

export async function getLessons(): Promise<Lesson[]> {
  if (!db) {
    return [];
  }

  try {
    const querySnapshot = await getDocs(collection(db, 'lessons'));
    const lessons: Lesson[] = [];
    querySnapshot.forEach((lessonDoc) => {
      const lesson = toLesson(lessonDoc.id, lessonDoc.data());
      if (lesson) {
        lessons.push(lesson);
      }
    });
    return lessons;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return [];
  }
}

export async function getUserXP(userId: string): Promise<number> {
  if (!db) {
    return 0;
  }

  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const totalXP = userSnap.data().totalXP;
      return typeof totalXP === 'number' ? totalXP : 0;
    }
    return 0;
  } catch (error) {
    console.error('Error fetching user XP, checking localStorage:', error);
    
    // Fallback to localStorage
    if (typeof window !== 'undefined') {
      const storageKey = `codeacademy_user_${userId}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const userData = JSON.parse(stored);
        return typeof userData.totalXP === 'number' ? userData.totalXP : 0;
      }
    }
    return 0;
  }
}

export async function getUserCompletedLessons(userId: string): Promise<string[]> {
  if (!db) {
    return [];
  }

  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const completedLessons = userSnap.data().completedLessons;
      return Array.isArray(completedLessons)
        ? completedLessons.filter((lessonId): lessonId is string => typeof lessonId === 'string')
        : [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching completed lessons, checking localStorage:', error);
    
    // Fallback to localStorage
    if (typeof window !== 'undefined') {
      const storageKey = `codeacademy_user_${userId}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const userData = JSON.parse(stored);
        return Array.isArray(userData.completedLessons)
          ? userData.completedLessons.filter((lessonId: unknown): lessonId is string => typeof lessonId === 'string')
          : [];
      }
    }
    return [];
  }
}

export async function addUserXP(userId: string, xpAmount: number, email: string): Promise<void> {
  if (!db) {
    return;
  }

  try {
    const userRef = doc(db, 'users', userId);
    const leaderboardRef = doc(db, 'leaderboard', userId);
    const userSnap = await getDoc(userRef);
    const displayName = getDisplayName(email);
    
    if (userSnap.exists()) {
      await updateDoc(userRef, {
        totalXP: (userSnap.data().totalXP || 0) + xpAmount,
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(userRef, {
        email,
        totalXP: xpAmount,
        completedLessons: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    await setDoc(
      leaderboardRef,
      {
        name: displayName,
        xp: (userSnap.exists() ? userSnap.data().totalXP || 0 : 0) + xpAmount,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error adding user XP:', error);
  }
}

export async function markLessonComplete(userId: string, lessonId: string): Promise<void> {
  if (!db) {
    return;
  }

  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const completedLessons = userSnap.data().completedLessons || [];
      if (!completedLessons.includes(lessonId)) {
        await updateDoc(userRef, {
          completedLessons: [...completedLessons, lessonId],
          updatedAt: serverTimestamp(),
        });
      }
    }
  } catch (error) {
    console.error('Error marking lesson complete:', error);
  }
}

export async function completeUserLesson(
  userId: string,
  lessonId: string,
  xpAmount: number,
  email: string,
): Promise<LessonCompletionResult> {
  if (!db) {
    return {
      alreadyCompleted: false,
      completedLessons: [],
      totalXP: 0,
    };
  }

  const userRef = doc(db, 'users', userId);
  const leaderboardRef = doc(db, 'leaderboard', userId);
  const displayName = getDisplayName(email);

  try {
    return await runTransaction(db, async (transaction) => {
      const userSnap = await transaction.get(userRef);
      const userData = userSnap.exists() ? (userSnap.data() as UserProgress) : {};
      const currentCompletedLessons = Array.isArray(userData.completedLessons)
        ? userData.completedLessons.filter((completedLessonId) => typeof completedLessonId === 'string')
        : [];
      const currentXP = typeof userData.totalXP === 'number' ? userData.totalXP : 0;

      if (currentCompletedLessons.includes(lessonId)) {
        return {
          alreadyCompleted: true,
          completedLessons: currentCompletedLessons,
          totalXP: currentXP,
        };
      }

      const completedLessons = [...currentCompletedLessons, lessonId];
      const totalXP = currentXP + xpAmount;

      if (userSnap.exists()) {
        transaction.set(
          userRef,
          {
            email: userData.email || email,
            totalXP,
            completedLessons,
            updatedAt: serverTimestamp(),
          },
          { merge: true },
        );
      } else {
        transaction.set(userRef, {
          email,
          totalXP,
          completedLessons,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      transaction.set(
        leaderboardRef,
        {
          name: displayName,
          xp: totalXP,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );

      return {
        alreadyCompleted: false,
        completedLessons,
        totalXP,
      };
    });
  } catch (error) {
    console.error('Firebase write error, falling back to localStorage:', error);
    
    // Fallback: Use localStorage for offline/permission-denied scenarios
    if (typeof window !== 'undefined') {
      const storageKey = `codeacademy_user_${userId}`;
      const stored = localStorage.getItem(storageKey);
      const userData = stored ? JSON.parse(stored) : { completedLessons: [], totalXP: 0 };
      
      if (userData.completedLessons.includes(lessonId)) {
        return {
          alreadyCompleted: true,
          completedLessons: userData.completedLessons,
          totalXP: userData.totalXP,
        };
      }
      
      userData.completedLessons.push(lessonId);
      userData.totalXP += xpAmount;
      localStorage.setItem(storageKey, JSON.stringify(userData));
      
      return {
        alreadyCompleted: false,
        completedLessons: userData.completedLessons,
        totalXP: userData.totalXP,
      };
    }
    
    throw error;
  }
}

export async function getLeaderboard(limitAmount: number = 10): Promise<LeaderboardEntry[]> {
  if (!db) {
    return [];
  }

  try {
    const q = query(
      collection(db, 'leaderboard'),
      orderBy('xp', 'desc'),
      limit(limitAmount)
    );
    const querySnapshot = await getDocs(q);
    const leaderboard: LeaderboardEntry[] = [];
    let rank = 1;
    querySnapshot.forEach((leaderboardDoc) => {
      const data = leaderboardDoc.data();
      leaderboard.push({
        rank: rank++,
        name: typeof data.name === 'string' ? data.name : 'Learner',
        xp: typeof data.xp === 'number' ? data.xp : 0,
      });
    });
    return leaderboard;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

// ============================================================================
// TEACHER & CLASS MANAGEMENT
// ============================================================================

export async function initializeUserRole(userId: string, email: string, role: UserRole = 'student'): Promise<void> {
  if (!db) return;

  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: userId,
        email,
        role,
        createdAt: serverTimestamp(),
        totalXP: 0,
        completedLessons: [],
      });
    }
  } catch (error) {
    console.error('Error initializing user role:', error);
  }
}

export async function requestTeacherApproval(userId: string, email: string, displayName: string): Promise<boolean> {
  if (!db) return false;

  try {
    const teacherRef = doc(db, 'teachers', userId);
    await setDoc(teacherRef, {
      uid: userId,
      email,
      displayName,
      classIds: [],
      status: 'pending',
      requestedAt: serverTimestamp(),
    });

    // Also update user role
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      role: 'teacher',
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error('Error requesting teacher approval:', error);
    return false;
  }
}

export async function getPendingTeachers(): Promise<(Teacher & { id: string })[]> {
  if (!db) return [];

  try {
    const q = query(collection(db, 'teachers'), where('status', '==', 'pending'));
    const querySnapshot = await getDocs(q);
    const teachers: (Teacher & { id: string })[] = [];
    
    querySnapshot.forEach((doc) => {
      teachers.push({
        id: doc.id,
        ...doc.data(),
      } as Teacher & { id: string });
    });

    return teachers;
  } catch (error) {
    console.error('Error fetching pending teachers:', error);
    return [];
  }
}

export async function approveTeacher(teacherId: string, adminEmail: string): Promise<boolean> {
  if (!db) return false;

  try {
    const teacherRef = doc(db, 'teachers', teacherId);
    await updateDoc(teacherRef, {
      status: 'approved',
      approvedBy: adminEmail,
      approvedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error approving teacher:', error);
    return false;
  }
}

export async function rejectTeacher(teacherId: string, adminEmail: string): Promise<boolean> {
  if (!db) return false;

  try {
    const teacherRef = doc(db, 'teachers', teacherId);
    await updateDoc(teacherRef, {
      status: 'rejected',
      approvedBy: adminEmail,
      approvedAt: serverTimestamp(),
    });

    // Also update user role back to student
    const userRef = doc(db, 'users', teacherId);
    await updateDoc(userRef, {
      role: 'student',
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error('Error rejecting teacher:', error);
    return false;
  }
}

export async function getTeacherStatus(userId: string): Promise<Teacher | null> {
  if (!db) return null;

  try {
    const teacherRef = doc(db, 'teachers', userId);
    const teacherSnap = await getDoc(teacherRef);
    return teacherSnap.exists() ? (teacherSnap.data() as Teacher) : null;
  } catch (error) {
    console.error('Error fetching teacher status:', error);
    return null;
  }
}

export async function createClass(teacherId: string, className: string, description?: string): Promise<string> {
  if (!db) return '';

  try {
    const classRef = doc(collection(db, 'classes'));
    await setDoc(classRef, {
      id: classRef.id,
      teacherId,
      name: className,
      description,
      studentIds: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return classRef.id;
  } catch (error) {
    console.error('Error creating class:', error);
    return '';
  }
}

export async function getTeacherClasses(teacherId: string): Promise<(Class & { id: string })[]> {
  if (!db) return [];

  try {
    const q = query(collection(db, 'classes'), where('teacherId', '==', teacherId));
    const querySnapshot = await getDocs(q);
    const classes: (Class & { id: string })[] = [];
    
    querySnapshot.forEach((doc) => {
      classes.push({
        id: doc.id,
        ...doc.data(),
      } as Class & { id: string });
    });

    return classes;
  } catch (error) {
    console.error('Error fetching teacher classes:', error);
    return [];
  }
}

export async function addStudentToClass(classId: string, studentId: string): Promise<boolean> {
  if (!db) return false;

  try {
    const classRef = doc(db, 'classes', classId);
    const classSnap = await getDoc(classRef);
    
    if (!classSnap.exists()) return false;

    const studentIds = classSnap.data().studentIds || [];
    if (!studentIds.includes(studentId)) {
      await updateDoc(classRef, {
        studentIds: [...studentIds, studentId],
        updatedAt: serverTimestamp(),
      });

      // Also update student's classId
      const userRef = doc(db, 'users', studentId);
      await updateDoc(userRef, {
        classId,
        updatedAt: serverTimestamp(),
      });
    }

    return true;
  } catch (error) {
    console.error('Error adding student to class:', error);
    return false;
  }
}

export async function getStudentsInClass(classId: string): Promise<any[]> {
  if (!db) return [];

  try {
    const classRef = doc(db, 'classes', classId);
    const classSnap = await getDoc(classRef);
    
    if (!classSnap.exists()) return [];

    const studentIds = classSnap.data().studentIds || [];
    const students = [];

    for (const studentId of studentIds) {
      const userRef = doc(db, 'users', studentId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        students.push({
          uid: studentId,
          ...userSnap.data(),
        });
      }
    }

    return students;
  } catch (error) {
    console.error('Error fetching students in class:', error);
    return [];
  }
}

export async function createActivity(classId: string, title: string, description: string, points: number, teacherId: string, deadline?: Date): Promise<string> {
  if (!db) return '';

  try {
    const activityRef = doc(collection(db, 'activities'));
    await setDoc(activityRef, {
      id: activityRef.id,
      classId,
      title,
      description,
      points,
      createdBy: teacherId,
      deadline: deadline ? Timestamp.fromDate(deadline) : null,
      createdAt: serverTimestamp(),
    });
    return activityRef.id;
  } catch (error) {
    console.error('Error creating activity:', error);
    return '';
  }
}

export async function getClassActivities(classId: string): Promise<(Activity & { id: string })[]> {
  if (!db) return [];

  try {
    const q = query(collection(db, 'activities'), where('classId', '==', classId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const activities: (Activity & { id: string })[] = [];
    
    querySnapshot.forEach((doc) => {
      activities.push({
        id: doc.id,
        ...doc.data(),
      } as Activity & { id: string });
    });

    return activities;
  } catch (error) {
    console.error('Error fetching class activities:', error);
    return [];
  }
}

export async function submitActivityCompletion(activityId: string, studentId: string, classId: string): Promise<boolean> {
  if (!db) return false;

  try {
    const completionRef = doc(collection(db, 'activityCompletions'));
    await setDoc(completionRef, {
      id: completionRef.id,
      activityId,
      studentId,
      classId,
      completedAt: serverTimestamp(),
      approvalStatus: 'pending',
    });
    return true;
  } catch (error) {
    console.error('Error submitting activity completion:', error);
    return false;
  }
}

export async function getActivitySubmissions(activityId: string): Promise<(ActivityCompletion & { id: string })[]> {
  if (!db) return [];

  try {
    const q = query(collection(db, 'activityCompletions'), where('activityId', '==', activityId));
    const querySnapshot = await getDocs(q);
    const submissions: (ActivityCompletion & { id: string })[] = [];
    
    querySnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data(),
      } as ActivityCompletion & { id: string });
    });

    return submissions;
  } catch (error) {
    console.error('Error fetching activity submissions:', error);
    return [];
  }
}

export async function approveActivityCompletion(completionId: string, teacherId: string, feedback?: string): Promise<boolean> {
  if (!db) return false;

  try {
    const completionRef = doc(db, 'activityCompletions', completionId);
    await updateDoc(completionRef, {
      approvalStatus: 'approved',
      approvedBy: teacherId,
      approvedAt: serverTimestamp(),
      feedback,
    });
    return true;
  } catch (error) {
    console.error('Error approving activity completion:', error);
    return false;
  }
}

export async function getClassLeaderboard(classId: string): Promise<LeaderboardEntry[]> {
  if (!db) return [];

  try {
    const students = await getStudentsInClass(classId);
    const leaderboard: LeaderboardEntry[] = [];
    let rank = 1;

    // Sort students by XP descending
    const sortedStudents = students.sort((a, b) => (b.totalXP || 0) - (a.totalXP || 0));

    for (const student of sortedStudents) {
      leaderboard.push({
        rank: rank++,
        name: student.displayName || student.email || 'Student',
        xp: student.totalXP || 0,
      });
    }

    return leaderboard;
  } catch (error) {
    console.error('Error fetching class leaderboard:', error);
    return [];
  }
}

export function getUserData() {
  return null;
}

export async function ensureAdminUser(userId: string, email: string): Promise<void> {
  if (!db) return;

  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: userId,
        email,
        displayName: email.split('@')[0],
        role: 'admin',
        createdAt: serverTimestamp(),
        totalXP: 0,
        completedLessons: [],
      });
    } else if (userSnap.data().role !== 'admin') {
      // Update role to admin if not already
      await updateDoc(userRef, {
        role: 'admin',
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('Error ensuring admin user exists:', error);
  }
}
