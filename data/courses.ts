import type { Course } from '@/types/course';

export const courses: Course[] = [
  {
    id: 'javascript-fundamentals',
    title: 'JavaScript Fundamentals',
    description: 'Master the core concepts of JavaScript: variables, functions, DOM manipulation, and asynchronous programming.',
    progress: '0%',
    duration: '3 weeks',
    lessons: 6,
  },
  {
    id: 'react-basics',
    title: 'React Basics',
    description: 'Learn the fundamentals of React, hooks, and component-driven UI. Build interactive applications.',
    progress: '0%',
    duration: '4 weeks',
    lessons: 9,
  },
  {
    id: 'typescript-pro',
    title: 'TypeScript Pro',
    description: 'Master type-safe development and advanced TypeScript patterns. Write production-ready code.',
    progress: '0%',
    duration: '5 weeks',
    lessons: 11,
  },
  {
    id: 'nextjs-fullstack',
    title: 'Next.js Full Stack',
    description: 'Build full-stack applications with Next.js. Learn routing, API routes, and deployment.',
    progress: '0%',
    duration: '6 weeks',
    lessons: 10,
  },
  {
    id: 'firebase-mastery',
    title: 'Firebase Mastery',
    description: 'Master Firebase: authentication, Firestore, hosting, and real-time features.',
    progress: '0%',
    duration: '4 weeks',
    lessons: 8,
  },
  {
    id: 'web-performance',
    title: 'Web Performance',
    description: 'Optimize performance, SEO, and accessibility. Learn advanced optimization techniques.',
    progress: '0%',
    duration: '3 weeks',
    lessons: 8,
  },
  {
    id: 'devops-essentials',
    title: 'DevOps Essentials',
    description: 'Learn Git, CI/CD, Docker, and deployment. Deploy applications like a pro.',
    progress: '0%',
    duration: '4 weeks',
    lessons: 7,
  },
  {
    id: 'clean-code',
    title: 'Clean Code & Design Patterns',
    description: 'Write maintainable code using SOLID principles and design patterns.',
    progress: '0%',
    duration: '4 weeks',
    lessons: 6,
  },
];

export const courseDetails = Object.fromEntries(
  courses.map((course) => [course.id, course]),
) as Record<string, Course>;
