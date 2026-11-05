# Kindred — Social Development Events Platform

> **A modern, community-first volunteer mobilization platform designed to bring people together for local social development initiatives.**

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5-green?style=flat-square)](https://daisyui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## 🌐 Live Application & Links

- **Live Site**: [https://kindred-events.vercel.app](https://kindred-events.vercel.app) *(or your deployed Vercel/Firebase URL)*
- **Client Repository**: [https://github.com/sakibdev-coder/client](https://github.com/sakibdev-coder/client)
- **Backend API Repository**: [https://github.com/sakibdev-coder/server](https://github.com/sakibdev-coder/server)
- **Local Dev URL**: `http://localhost:3000`

---

## 📌 Project Overview

**Kindred** is an intuitive, accessible web platform built to connect socially conscious citizens with grassroots community events. Whether it is an environmental cleanup drive, a tree plantation campaign, winter clothes distribution, blood donations, or free education sessions, Kindred empowers volunteers to discover local opportunities, RSVP with one click, and organize their own community initiatives.

---

## ✨ Key Features

1. **🔍 Real-Time Search & Category Filters**:
   - Instant search by event title and physical location (e.g., Mirpur, Dhaka, Chattogram).
   - Filter drives by category: *Cleanup, Plantation, Donation, Education, Community Care*.
2. **📅 Smart Multi-Order Sorting**:
   - Sort upcoming drives by **Nearest First (Date Ascending)**, **Latest First (Date Descending)**, or **Title (A–Z)**.
3. **👥 Attendee Badges & Community Engagement**:
   - Live joined participant count (`👥 X joined`) displayed on event cards.
   - Distinct organizer tags highlighting event hosts.
4. **📆 Google Calendar Export**:
   - One-click `.ics` and direct Google Calendar schedule generation on the Event Details page.
5. **🔗 Native Social Sharing**:
   - Mobile-first Web Share API integration with automatic fallback to one-click clipboard link copying and toast feedback.
6. **🔐 Multi-Method Authentication**:
   - Secure email and password registration with client-side password matching validation.
   - One-tap Google OAuth 2.0 Sign-In.
   - Persistent session storage and JWT token management.
7. **🛠️ Organizer Event Management (CRUD)**:
   - Create future-dated initiatives with validation (prevents past dates).
   - Dedicated management dashboard to view, edit, and delete only events created by the logged-in user.
   - Safe custom confirmation modals with keyboard escape listeners (no browser `window.confirm`).
8. **👤 User Profile & Customization**:
   - Profile view and live update page (`/profile`) allowing users to update their display name and profile picture URL.
   - Display name tooltip on hover over the navigation profile avatar.
9. **🌓 Light & Dark Theme Toggle**:
   - Full DaisyUI light and dark theme switching stored in local preferences, accessible on mobile and desktop.
10. **⚡ Skeleton Loading & Zero Alert Interruption**:
    - DaisyUI shimmer skeleton screens across all data-fetching views for perceived performance.
    - 100% toast-driven notifications powered by `react-hot-toast` with zero blocking browser alerts.

---

## 🛠️ Tech Stack & Libraries

| Technology | Purpose |
| :--- | :--- |
| **Next.js 15 (App Router)** | Full-stack React framework providing hybrid static and dynamic rendering. |
| **React 19** | Component-based UI library with modern hooks (`useState`, `useEffect`, `useContext`). |
| **TypeScript** | Type-safety, strict interface models for event items, and compile-time verification. |
| **Tailwind CSS & DaisyUI 5** | Utility-first styling with accessible, responsive components and pre-built themes. |
| **React Hot Toast** | Lightweight, animated, and accessible notification system. |
| **Google Identity Services** | Seamless OAuth sign-in flow for authenticated users. |

---

## 📦 Project Structure

```
client/
├── app/
│   ├── layout.tsx         # Root layout with AuthProvider, Navbar, Footer, and Toast container
│   ├── page.tsx           # Home page with hero, impact metrics, recent events, and gallery
│   ├── not-found.tsx      # Custom 404 error page
│   ├── globals.css        # Global styles, DaisyUI setup, and custom animations
│   ├── events/
│   │   ├── page.tsx       # Upcoming events directory with search, sort, and category filters
│   │   └── [id]/page.tsx  # Dynamic event details page with RSVP, share, and calendar export
│   ├── joined/
│   │   └── page.tsx       # Personal schedule of joined events with actionable empty state
│   ├── manage/
│   │   ├── page.tsx       # Creator dashboard to view and delete owned initiatives
│   │   └── [id]/page.tsx  # Edit event page with pre-populated form
│   ├── create/
│   │   └── page.tsx       # Form to launch a new community initiative
│   ├── profile/
│   │   └── page.tsx       # User profile details and live update screen
│   ├── login/
│   │   └── page.tsx       # Email/password and Google login page
│   └── register/
│       └── page.tsx       # Registration form with live password matching notes
├── components/
│   ├── AuthProvider.tsx   # React Context managing authentication, tokens, and profile updates
│   ├── Navbar.tsx         # Responsive header with theme switcher and avatar dropdown
│   ├── Footer.tsx         # Comprehensive footer with links and social references
│   ├── EventCard.tsx      # Standardized event card with attendee count and tags
│   └── ConfirmModal.tsx   # Accessible DaisyUI modal with escape key listeners
└── lib/
    └── api.ts             # Centralized fetch wrapper with automatic JWT token attachment
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: `v18.17.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sakibdev-coder/client.git
   cd client
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root of `client/`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5001/api
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

5. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📄 License

This project is licensed under the **MIT License**. Created by [Sakib Al Hasan](https://github.com/sakibdev-coder).
