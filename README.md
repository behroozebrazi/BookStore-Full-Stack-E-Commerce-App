# 📚 BookStore — Full-Stack E-Commerce App

A full-stack e-commerce web application built with **Next.js**, featuring product browsing, a persistent shopping cart, multi-step checkout, user authentication, and an admin dashboard for managing orders and monitoring store metrics.

## Features

- **Product catalog** — Server-rendered product listing and detail pages backed by MongoDB
- **Shopping cart** — Add/remove items with quantity tracking, persisted across sessions via cookies
- **Multi-step checkout** — Shipping info → payment method → order review/placement (`CheckoutWizard` component)
- **Authentication** — Credentials-based login with hashed passwords (bcrypt) and JWT sessions via NextAuth.js
- **Order management** — Order history for customers; order creation and tracking via REST API routes
- **Admin dashboard** — Protected admin routes with live summary stats (total users, products, orders) and an orders management view
- **Notifications** — Toast notifications for cart actions (e.g. item added, out of stock)
- **Responsive UI** — Styled with Tailwind CSS and Headless UI components (dropdown menus, etc.)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (Pages Router) |
| UI | React, Tailwind CSS, Headless UI |
| Auth | NextAuth.js (Credentials Provider, JWT sessions) |
| Database | MongoDB with Mongoose ODM |
| Forms | React Hook Form |
| State | React Context + `useReducer` (cart state) |
| Notifications | React Toastify |
| Password Hashing | bcryptjs |

## Project Structure

```
├── components/       # Reusable UI components (Layout, ProductItem, CheckoutWizard, Dropdown)
├── context/           # React Context providers (Cart state management)
├── data/               # Seed data (products, users)
├── models/            # Mongoose schemas (User, Product, Order)
├── pages/
│   ├── admin/          # Admin dashboard & order management (protected)
│   ├── api/            # REST API routes (auth, orders, products, users, admin)
│   ├── product/[slug]  # Dynamic product detail page
│   ├── cart.js          # Shopping cart page
│   ├── shipping.js      # Checkout: shipping info
│   ├── payment.js       # Checkout: payment method
│   └── placeorder.js    # Checkout: order review & placement
├── styles/             # Global Tailwind CSS
└── utils/db.js         # MongoDB connection helper
```

## Getting Started

### Prerequisites

- Node.js 18+
- A running MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/shopping
NEXTAUTH_SECRET=<a-random-secret-string>
NEXTAUTH_URL=http://localhost:3000
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## License

This project is open source and available under the MIT License.
