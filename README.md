# 🚀 AI-Powered Career Navigator (SDG 8 Project)

A modern full-stack web application that helps students and young job seekers discover career-aligned jobs and learning resources. The platform connects user skills → jobs → learning materials using smart matching logic and (future) AI-powered recommendations.

---

## 🛠 Tech Stack

| Category  | Technology                         |
| --------- | ---------------------------------- |
| Framework | Next.js 16 (App Router, Fullstack) |
| Language  | TypeScript                         |
| Styling   | TailwindCSS + shadcn/ui            |
| Auth      | Better Auth                        |
| Database  | MongoDB + Mongoose                 |
| Icons     | lucide-react                       |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/iamabraryeasir/AI-Base-Youth-Employment-and-Career-Roadmap-Platform.git
cd AI-Base-Youth-Employment-and-Career-Roadmap-Platform
```

### 2️⃣ Install Dependencies

```bash
bun install
# or
npm install
# or
pnpm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the root folder and add:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
```

> **Note:**
>
> - `BETTER_AUTH_SECRET` must be a long, random string.
> - If deployed on Vercel, update `BETTER_AUTH_URL` accordingly.

---

## ▶️ Run the Application

### Start the dev server

```bash
bun run dev
# or
npm run dev
# or
pnpm dev
```

The app will be available at:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🌱 Seed Data Usage

This project includes **jobSeeder.ts** and **resourceSeeder.ts** for quick database seeding.

### Run Job Seeder

```bash
bun run seed-data
```

> Ensure **MONGODB_URI** is defined in your `.env` before running seeders.

---

## 📁 Project Structure (Quick Overview)

```
src/
 ├─ app/                 → Next.js routes (API + Pages)
 ├─ database/            → Mongoose models
 ├─ lib/                 → DB connection, auth, helpers
 ├─ seeders/             → job/resource seed scripts
 └─ components/          → UI components
```

---

## ✔ Additional Notes

- API routes such as `/api/jobs`, `/api/resources`, and `/api/recommendations/*` are fully protected using Better Auth.
- Matching logic is implemented in separate recommendation endpoints.
- The system is designed to support LLM-based recommendations in the next phase of the hackathon.
