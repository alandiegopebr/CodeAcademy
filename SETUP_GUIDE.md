# CodeAcademy - Developer Learning Platform

A modern, full-featured learning platform built with Next.js 14, Firebase, and Tailwind CSS.

## Features

✅ **User Authentication** - Sign up, login, password recovery with Firebase Auth
✅ **30+ Lessons** - Comprehensive course content covering JavaScript, React, TypeScript, and more
✅ **8 Complete Courses** - Structured learning paths with multiple lessons per course
✅ **XP System** - Earn XP points for completing lessons, tracked in Firestore
✅ **Real-time Leaderboard** - See top learners ranked by XP (pulls real data from Firestore)
✅ **Dashboard** - Personalized dashboard showing user XP and progress
✅ **Admin Panel** - Admin-only access to create and manage content
✅ **Dark Theme** - Modern dark UI with Tailwind CSS
✅ **Responsive Design** - Works seamlessly on desktop and mobile

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS 3.4
- **Backend**: Firebase Auth, Firestore, Hosting
- **Database**: Firebase Firestore (NoSQL)
- **Deployment**: Vercel ready

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project with credentials

### Installation

1. **Clone and install dependencies**
   ```bash
   cd projetinho
   npm install
   ```

2. **Set up environment variables**
   
   Create `.env.local` with your Firebase config:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. **Update Firestore Rules**
   
   Go to Firebase Console → Firestore Database → Rules and paste:
   ```firestore
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow anyone to read lessons (but only admin can edit)
       match /lessons/{lessonId} {
         allow read: if true;
         allow create, update, delete: if request.auth != null && request.auth.token.email == 'alandiegope123@gmail.com';
       }

       // Allow anyone to read courses
       match /courses/{courseId} {
         allow read: if true;
         allow create, update, delete: if request.auth != null && request.auth.token.email == 'alandiegope123@gmail.com';
       }

       // Allow each user to read/write their own user document (for XP tracking)
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }

       // Deny everything else by default
       match /{document=**} {
         allow read, write: if false;
       }
     }
   }
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   Open http://localhost:3000 in your browser.

## Database Seeding

### Reset Data (Keep Users)

To reset lessons and courses while preserving all user data:

```bash
SERVICE_ACCOUNT_PATH=./service-account-key.json node scripts/resetAndSeedFirestore.js
```

**What happens:**
- ✅ Deletes all lessons
- ✅ Deletes all courses
- ✅ Preserves all users and their XP
- ✅ Re-seeds with fresh sample data (30 lessons, 8 courses)

### First-time Setup

If you don't have data yet:

```bash
SERVICE_ACCOUNT_PATH=./service-account-key.json node scripts/seedFirestore.js
```

### Get Service Account Key

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Save as `service-account-key.json` in project root
4. **⚠️ Never commit this file to git! Add to `.gitignore`**

## Project Structure

```
app/                          # Next.js pages
├── login/                     # Login page
├── register/                  # Registration page
├── dashboard/                 # User dashboard with XP stats
├── courses/                   # Browse all courses
│   └── [courseId]/           # Individual course details
├── lessons/                   # Lessons page with XP system
├── leaderboard/              # Real-time leaderboard from Firestore
├── profile/                  # User profile settings
├── admin/                    # Admin dashboard
│   └── lessons/              # Admin lesson creation
└── layout.tsx                # Root layout with auth provider

components/                   # React components
├── LessonsClient.tsx         # Interactive lesson system with Firestore integration
├── DashboardStats.tsx        # User XP display component
├── Navbar.tsx                # Navigation bar
├── Sidebar.tsx               # Side navigation
└── ...

lib/                          # Utility functions
├── firebase.ts               # Firebase initialization
├── firestore.ts              # Firestore database operations (30+ functions)
├── auth.ts                   # Authentication helpers
└── ...

data/                         # Sample data
├── sampleLessons.json        # 30 lessons
├── sampleCourses.json        # 8 courses
└── courses.ts                # Exported courses for fallback

types/                        # TypeScript interfaces
├── course.ts
├── user.ts
└── certificate.ts
```

## Core Firestore Functions

**lib/firestore.ts** provides these functions:

### Courses & Lessons
- `getCourses()` - Get all courses
- `getCourseById(id)` - Get single course
- `getLessons()` - Get all lessons

### User XP Management
- `getUserXP(userId)` - Get user's total XP
- `getUserCompletedLessons(userId)` - Get array of completed lesson IDs
- `addUserXP(userId, xpAmount, email)` - Add XP and create/update user document
- `markLessonComplete(userId, lessonId)` - Mark lesson as completed

### Leaderboard
- `getLeaderboard(limitAmount)` - Get top N users by XP

## User Flow

1. **Register/Login** → Creates authenticated user in Firebase Auth
2. **Browse Courses** → Fetches from Firestore (fallback to local data)
3. **View Lessons** → 30 lessons with different XP values
4. **Complete Lesson** → 
   - XP added to user's Firestore document
   - Lesson marked as complete
   - Points displayed immediately
5. **View Leaderboard** → Shows real users sorted by total XP
6. **Check Dashboard** → Personal stats with real XP from Firestore

## XP System

- **Total XP**: Sum of all completed lessons
- **Per Lesson**: 10-100 points depending on difficulty
- **Persistence**: Saved to `users/{userId}` in Firestore
- **Leaderboard**: Automatically ranked by descending XP

## Admin Features

**Admin Email**: `alandiegope123@gmail.com`

Access admin panel at `/admin` with this email to:
- View platform metrics
- Create new lessons
- Manage course content

## Build & Deployment

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm run start
```

### Deploy to Vercel
```bash
vercel deploy
```

## Environment Checklist

- [ ] Firebase project created
- [ ] Service account key downloaded
- [ ] `.env.local` configured
- [ ] Firestore rules updated
- [ ] Database seeded
- [ ] Dev server running
- [ ] Can register and login
- [ ] Can complete lessons and see XP
- [ ] Can view real leaderboard

## Troubleshooting

### XP not saving?
- Check Firestore rules allow `users/{userId}` write access
- Verify user is authenticated (check browser console)
- Ensure Firebase config is correct in `.env.local`

### Leaderboard empty?
- Complete a lesson to create user document
- Check that `users` collection exists in Firestore
- Verify rules allow reading from `users` collection

### Lessons not loading?
- Check `sampleLessons.json` exists
- Verify Firestore connection or fallback to local data
- Check browser console for errors

### Admin features not working?
- Confirm you're using the admin email: `alandiegope123@gmail.com`
- Check `isAdmin()` function in `lib/admin.ts`

## License

MIT

## Support

For issues or questions, check the Firebase documentation or create an issue in the repository.

---

**Made with ❤️ using Next.js + Firebase**
