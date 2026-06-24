# CodeAcademy - Setup Guide

## Prerequisites
- Node.js 18+ 
- Firebase project configured
- Environment variables set up

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase

Create a `.env.local` file in the project root with your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Seed Firebase Database (Optional)

To populate Firebase with sample data:

1. Download your Firebase service account key from Firebase Console → Project Settings → Service Accounts
2. Save it locally (e.g., `./service-account-key.json`)
3. Run the seed script:

```bash
SERVICE_ACCOUNT_PATH=./service-account-key.json node scripts/seedFirestore.js
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Courses**: Browse and enroll in courses (loads from Firebase with local fallback)
- **Lessons**: Interactive lessons with progress tracking
- **Dashboard**: User dashboard showing active course, XP, and certificates
- **Admin Panel**: Manage courses and lessons (admin email: `alandiegope123@gmail.com`)
- **Authentication**: Firebase Auth integration
- **Leaderboard**: View top learners by XP

## Project Structure

```
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── contexts/         # Auth context
├── data/             # Sample data (courses, lessons)
├── hooks/            # Custom React hooks
├── lib/              # Firebase utilities and helpers
├── scripts/          # Seed script for Firebase
├── types/            # TypeScript type definitions
└── public/           # Static assets
```

## Database Schema

### Firestore Collections

**courses**
- `id` (doc ID): course identifier
- `title`: Course name
- `description`: Course description
- `progress`: Current progress percentage
- `duration`: Estimated duration (e.g., "4 weeks")
- `lessons`: Number of lessons

**lessons**
- `id` (doc ID): lesson identifier
- `title`: Lesson name
- `description`: Lesson description
- `points`: XP awarded for completion

**users** (optional)
- `email`: User email
- `totalXP`: Total XP earned
- `completedCourses`: Array of completed course IDs

## Next Steps

1. Configure Firebase credentials in `.env.local`
2. Run seed script to populate data
3. Start the dev server
4. Test authentication and course loading

---

Built with Next.js 14 + TypeScript + Tailwind CSS + Firebase
