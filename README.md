# CDCOpenProject
CDC WebD open project

# 🚀 Next.js E-Commerce Admin Dashboard

A comprehensive, server-side rendered (SSR) administrative dashboard built with Next.js 15, TypeScript, and MongoDB. Designed for performance, scalability, and real-world e-commerce management.

## ✨ Key Features
* **Server-Side Rendering (SSR):** Optimized performance with Next.js App Router.
* **Secure Authentication:** Role-based access control using NextAuth.js (Auth.js).
* **Product Management (CRUD):** Create, Read, Update, and Delete products seamlessly.
* **Smart Form Validation:** Robust client/server validation using Zod and React Hook Form.
* **Image Uploads:** Drag-and-drop image uploading via Cloudinary.
* **Interactive Analytics:** Real-time data visualization with Recharts.
* **Responsive Design:** Fully mobile-responsive UI with Tailwind CSS.

## 🛠️ Tech Stack
* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Database:** MongoDB (via Prisma ORM)
* **Styling:** Tailwind CSS
* **Auth:** NextAuth.js v5
* **Forms:** React Hook Form + Zod
* **Charts:** Recharts
* **Images:** Cloudinary

## 🚀 Getting Started

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/ecommerce-dashboard.git
cd ecommerce-dashboard
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
\`\`\`env
DATABASE_URL="mongodb+srv://..."
NEXTAUTH_SECRET="your-secret-key"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
\`\`\`

### 4. Run the Development Server
\`\`\`bash
npx prisma db push  # Sync database
npm run dev
\`\`\`

## 🔐 Demo Credentials
* **Email:** `admin@demo.com`
* **Password:** `admin123`
