# CDC OpenProject
CDC WebD open project

# Aethel Nova Dashboard

[![Deploy with Vercel](https://vercel.com/button)](https://aethel-nova-pi.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Live Production Link:** [https://aethel-nova-pi.vercel.app](https://aethel-nova-pi.vercel.app)

## 📖 Project Overview

Aethel Nova is a robust web application designed with a comprehensive Role-Based Access Control (RBAC) system. The platform serves as a centralized dashboard allowing for distinct user interactions based on permissions. It is designed to demonstrate secure authentication, efficient data management via Prisma, and a hierarchical user structure ranging from general users to super administrators.

## ✨ Features

### General Features
* **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices.
* **Data Integrity:** Type-safe database interactions using Prisma ORM.

### 🔐 Authentication & Security
* **NextAuth v5 Integration:** Robust authentication handling login sessions and protected routes.
* **Role-Based Access Control (RBAC):** Middleware checks ensuring users only access pages authorized for their specific role.
* **Secure API Endpoints:** Backend protection preventing unauthorized data manipulation.

### Role-Based Functionality

#### 🛡️ Super Admin
* **Exclusive Admin Management:** The only role with authority to **create, and manage Admin accounts**.
* **Full System Control:** Unrestricted access to all system settings, user logs, and global configurations.
* **User Oversight:** Ability to promote/demote users and oversee all platform activity.

#### 🛠️ Admin
* **Operational Management:** Focuses on day-to-day operations like content moderation and order processing.
* **Restricted Hierarchy:** Can manage General Users but **cannot create or modify other Admin accounts**.
* **Analytics:** Access to sales reports and platform metrics.

#### 👤 General User
* **Storefront Access:** Full capability to browse items, add to cart, and complete purchases.
* **No Dashboard Access:** Restricted from entering the administrative dashboard area.
* **Order History:** View personal purchase history and manage own profile settings.

## 🏗️ Tech Stack

**Frontend Framework:**
* Next.js
* React
* Tailwind CSS

**Backend & Database:**
* Node.js
* Prisma ORM (MongoDB)

**Authentication:**
* NextAuth.js (v5)

**Forms**
* Zod

**Image Storage**
* Cloudinary

**DevOps & Deployment:**
* Vercel (Production Deployment)
* Git/GitHub

## 🔐 Role Hierarchy & Permissions

The application follows a strict hierarchy to ensure security and data integrity:

1.  **Super Admin (Level 1):** The highest authority. Can override actions of Admins.
2.  **Admin (Level 2):** Managerial role bridging the gap between system owners and end-users. Restricted from altering Super Admin settings.
3.  **General User (Level 3):** The standard end-user role with access limited to public features and personal data.

## 🚀 Setup Instructions

Follow these steps to set up the project locally.

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn
* MongoDB Atlas account
* Cloudinary account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/CDCOpenProject.git](https://github.com/your-username/CDCOpenProject.git)
    cd my-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory and add your variables:
    ```env
    DATABASE_URL="your_database_connection_string"
    AUTH_SECRET="your_nextauth_secret"
    AUTH_URL="http://localhost:3000"
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
    ```

4.  **Database Setup:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the application:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

6.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧪 Demo Credentials

You can test the Role-Based Access Control (RBAC) using the following pre-configured accounts on the [Production Link](https://aethel-nova-pi.vercel.app).

| Role | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@demo.com` | `admin123` | Full System Control |
| **Admin** | `admin2@demo.com` | `admin123` | Products % Statistics Oversight |
| **General User** | `user@demo.com` | `user123` | Personal Dashboard Only |

---
