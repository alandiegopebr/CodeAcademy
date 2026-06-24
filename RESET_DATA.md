# 🔄 Reset Database & Seed Data

This guide explains how to reset your CodeAcademy database while preserving user data.

## Quick Start

```bash
SERVICE_ACCOUNT_PATH=./service-account-key.json node scripts/resetAndSeedFirestore.js
```

## What This Does

✅ **Deletes**:
- All lessons
- All courses

✅ **Preserves**:
- All users
- All XP points
- User preferences
- Authentication data

✅ **Re-seeds**:
- 30 complete lessons (lesson-1 to lesson-30)
- 8 full courses with varying difficulty
- Fresh sample data

## Step-by-Step Setup

### 1. Get Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click ⚙️ **Settings** (gear icon) in top-left
4. Go to **Service Accounts**
5. Click **Generate New Private Key**
6. Save file as `service-account-key.json` in project root

### 2. Verify File Location

```bash
# Check if service account key exists
ls -la service-account-key.json
```

Should output: `-rw-r--r-- 1 user staff 2345 Jun 24 10:30 service-account-key.json`

### 3. Run Reset Script

```bash
SERVICE_ACCOUNT_PATH=./service-account-key.json node scripts/resetAndSeedFirestore.js
```

### 4. Expected Output

```
🔄 Starting reset and seed process...

🗑️  Deleting existing lessons...
✓ Lessons deleted

🗑️  Deleting existing courses...
✓ Courses deleted

✓ Users collection preserved

📚 Seeding lessons...
  ✓ Seeded lesson: lesson-1
  ✓ Seeded lesson: lesson-2
  ...
  ✓ Seeded lesson: lesson-30

📖 Seeding courses...
  ✓ Seeded course: javascript-fundamentals
  ✓ Seeded course: react-basics
  ...
  ✓ Seeded course: clean-code

✅ Reset and seed complete!
📊 All users preserved in the "users" collection
```

## Available Lessons

After seeding, you'll have these 30 lessons:

| ID | Title | Points |
|---|---|---|
| lesson-1 | Introdução ao JavaScript | 10 |
| lesson-2 | Funções e Escopo | 15 |
| lesson-3 | DOM e Eventos | 20 |
| lesson-4 | Arrays e Métodos | 25 |
| lesson-5 | Objetos e Destructuring | 20 |
| lesson-6 | Promises e Async/Await | 30 |
| lesson-7 | Componentes React Básicos | 25 |
| lesson-8 | Hooks do React | 35 |
| lesson-9 | Gerenciamento de Estado | 30 |
| lesson-10 | Roteamento com Next.js | 40 |
| lesson-11 | Tipos em TypeScript | 35 |
| lesson-12 | CSS-in-JS com Tailwind | 20 |
| lesson-13 | Firebase Authentication | 30 |
| lesson-14 | Firestore Database | 35 |
| lesson-15 | APIs RESTful | 40 |
| lesson-16 | GraphQL Basics | 35 |
| lesson-17 | Testes com Jest | 30 |
| lesson-18 | Performance Web | 40 |
| lesson-19 | SEO para Web Apps | 25 |
| lesson-20 | Acessibilidade Web | 30 |
| lesson-21 | Git e Versionamento | 20 |
| lesson-22 | CI/CD Pipelines | 40 |
| lesson-23 | Docker e Containerização | 45 |
| lesson-24 | Deployment na Vercel | 30 |
| lesson-25 | Debugging e DevTools | 15 |
| lesson-26 | Design Patterns | 35 |
| lesson-27 | SOLID Principles | 40 |
| lesson-28 | Segurança Web | 40 |
| lesson-29 | Projeto Final: App Completa | 100 |
| lesson-30 | Code Review e Best Practices | 25 |

**Total XP Available**: 945 points

## Available Courses

| ID | Title | Duration | Lessons |
|---|---|---|---|
| javascript-fundamentals | JavaScript Fundamentals | 3 weeks | 6 |
| react-basics | React Basics | 4 weeks | 9 |
| typescript-pro | TypeScript Pro | 5 weeks | 11 |
| nextjs-fullstack | Next.js Full Stack | 6 weeks | 10 |
| firebase-mastery | Firebase Mastery | 4 weeks | 8 |
| web-performance | Web Performance | 3 weeks | 8 |
| devops-essentials | DevOps Essentials | 4 weeks | 7 |
| clean-code | Clean Code & Design Patterns | 4 weeks | 6 |

## Troubleshooting

### Error: Cannot find module 'firebase-admin'

```bash
npm install firebase-admin
```

### Error: SERVICE_ACCOUNT_PATH not set

Make sure to prefix the command:
```bash
SERVICE_ACCOUNT_PATH=./service-account-key.json node scripts/resetAndSeedFirestore.js
```

### Error: PERMISSION_DENIED in Firestore

1. Check your Firestore rules allow operations
2. Verify service account email has Firestore permissions
3. Go to Firebase Console → Firestore → Rules → Verify rules are published

### File not found: service-account-key.json

Make sure the file is in the project root:
```bash
# Should show the key file
cat service-account-key.json | head -1
```

## Security Notes

⚠️ **Never commit `service-account-key.json` to git!**

Add to `.gitignore`:
```gitignore
service-account-key.json
.env.local
.env
```

This file contains sensitive credentials that grant full database access.

## Data Structure

After seeding, your Firestore will have:

```
Firestore Root
├── lessons/
│   ├── lesson-1/
│   │   ├── title: "Introdução ao JavaScript"
│   │   ├── description: "..."
│   │   └── points: 10
│   ├── lesson-2/
│   └── ...
├── courses/
│   ├── javascript-fundamentals/
│   │   ├── title: "JavaScript Fundamentals"
│   │   ├── duration: "3 weeks"
│   │   └── lessons: 6
│   └── ...
└── users/
    └── (auto-created when users earn XP)
        ├── totalXP: 250
        ├── completedLessons: [...]
        └── email: "user@example.com"
```

## Advanced Usage

### Seed Only (Keep Existing Data)

Use the original seed script without deleting:
```bash
SERVICE_ACCOUNT_PATH=./service-account-key.json node scripts/seedFirestore.js
```

### Custom Reset

Edit `scripts/resetAndSeedFirestore.js` to:
- Add/remove lessons
- Customize XP values
- Modify course structure

Then run:
```bash
SERVICE_ACCOUNT_PATH=./service-account-key.json node scripts/resetAndSeedFirestore.js
```

## Need Help?

- Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for initial setup
- Review [README.md](./README.md) for project overview
- Check Firebase docs: https://firebase.google.com/docs/firestore

---

Made with ❤️ for CodeAcademy
