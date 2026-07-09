export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: UserRole;
  createdAt?: Date;
  classId?: string; // For students in a teacher's class
  totalXP?: number;
  completedLessons?: string[];
}

export interface Teacher {
  uid: string;
  email: string;
  displayName?: string;
  classIds: string[]; // Classes managed by this teacher
  approvedBy?: string; // Admin email who approved
  approvedAt?: Date;
  status: 'pending' | 'approved' | 'rejected'; // Approval status
  requestedAt: Date;
}

export interface Class {
  id: string;
  teacherId: string;
  name: string;
  description?: string;
  studentIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  classId: string;
  title: string;
  description?: string;
  points: number;
  deadline?: Date;
  createdAt: Date;
  createdBy: string; // Teacher ID
}

export interface ActivityCompletion {
  id: string;
  activityId: string;
  studentId: string;
  classId: string;
  completedAt: Date;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  approvedBy?: string; // Teacher ID
  approvedAt?: Date;
  feedback?: string;
}
