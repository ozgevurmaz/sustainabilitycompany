# Sustainable Company Website 🌱

A fully responsive web application developed for a sustainable company.  
The project includes a client-side website and an admin dashboard, currently in development.

## 🚀 Tech Stack

### 💻 Client Side
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Zod](https://zod.dev/)
- [Lucide React](https://lucide.dev/)

### 🛠️ Admin Panel (WIP)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [Recharts](https://recharts.org/)

## ✨ Features

- Fully responsive design
- Smooth animations and transitions
- Static and dynamic pages: Contact, About, Services, Blog
- Authentication with NextAuth
- Admin panel (under construction) to manage content
- Dynamic integration of blog and services (coming soon)

## 🔧 Upcoming Improvements

- Connect MongoDB data to client-side content
- Finish admin panel features (create/update/delete content)
- Add SEO and accessibility enhancements

## 📹 Preview

A short walkthrough video is available [here]().

## 📁 Project Structure (Simplified)
├── app/  
│   ├── (client)/                # Client-side pages and layouts
│   │   ├── about/               # About page
│   │   ├── blog/                # Blog list
│   │   │   └── [id]/            # Blog details
│   │   ├── services/            # Services list
│   │   │   └── [id]/            # Service details
│   │   ├── contact/             # Contact page
│   │   └── layout.tsx           # Main layout for client
│
│   ├── (admin)/                 # Admin panel pages and layout
│   │   ├── login/               # Admin login
│   │   ├── blog/                # Add/Edit/Delete blog
│   │   ├── services/            # Add/Edit/Delete services
│   │   ├── testimonials/        # Add/Edit/Delete testimonials
│   │   ├── settings/            # Site settings
│   │   └── layout.tsx           # Main layout for admin
│
├── api/                         # API routes
│   ├── auth/                    # Authentication handlers
│   ├── blog/                    # Blog API
│   ├── services/                # Services API
│   └── testimonial/             # Testimonials API
│
├── components/                  # Reusable UI components
│   ├── ui/                      # Shadcn/UI components
│   ├── client/                  # Client-specific components
│   └── admin/                   # Admin-specific components
│
├── lib/                         # Server-side logic, models, constants
│   ├── constants/               # App-wide constants
│   ├── types/                   # TypeScript types/interfaces
│   └── models/                  # MongoDB models
│
├── hooks/                       # Custom React hooks
│
├── public/                      # Static assets (images, icons, etc.)


## 🤝 Contact

If you're interested in collaboration, hiring, or just want to connect:  
📩 Email: ozgevurmaz@gmail.com
🔗 LinkedIn: linkedin.com/in/elifozgevurmaz

