# CodeAcademy

Professional Next.js + Tailwind + Firebase learning platform scaffold.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with your Firebase values:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

3. Run the app:
```bash
npm run dev
```

## Structure

- `app/` - Next.js App Router pages
- `components/` - shared UI components
- `contexts/` - auth context
- `hooks/` - reusable hooks
- `lib/` - Firebase and service helpers
- `types/` - TypeScript models
- `middleware.ts` - protected route guard
