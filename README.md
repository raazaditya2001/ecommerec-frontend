# NexCart — React E-Commerce Frontend

A modern e-commerce frontend built with React, Vite, Tailwind CSS, and Redux Toolkit. This project provides a polished shopping experience featuring product browsing, cart management, user authentication, checkout, order history, and an admin dashboard.

> Note: This repository contains the frontend application only. It is designed to work with a backend API exposed via `VITE_API_URL`.

## Features

- Responsive product catalog and product detail pages
- User registration and login with validation
- Protected user routes for checkout and profile
- Shopping cart with add, update, remove, and clear functionality
- Checkout flow with Razorpay integration and fallback mode
- Order history view for authenticated users
- Admin dashboard with product, order, and user management
- Client-side validation using React Hook Form and Zod
- Toast notifications for user feedback

## Built With

- React 19
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router DOM 7
- React Hook Form
- Zod
- Axios
- Swiper

## Project Structure

- `src/App.jsx` — application routes and protected route wrappers
- `src/main.jsx` — root renderer and provider setup
- `src/Context/AuthContext.jsx` — authentication state and localStorage persistence
- `src/Redux/store.js` — Redux store configuration
- `src/Redux/slices/cartSlice.js` — cart state management
- `src/Components/api.js` — Axios instance with base URL from env
- `src/Pages/` — page views for home, product, cart, checkout, profile, admin, and informational pages
- `src/validations/` — Zod schemas for auth and product forms
- `src/Styles/global.css` — global CSS definitions

## Available Pages

- `/` — Home page with featured products
- `/product/:id` — Product details
- `/cart` — Shopping cart
- `/register` — User signup
- `/login` — User login
- `/cart/checkout` — Checkout page (protected)
- `/ordersuccess` — Order confirmation
- `/profile` — User profile and order history (protected)
- `/admin/dashboard` — Admin dashboard (admin protected)
- `/admin/products` — Admin product management
- `/admin/product-add` — Add product
- `/admin/product/:id` — Edit product
- `/admin/orders` — Manage orders
- `/admin/users` — Manage users
- `/about`, `/contact`, `/return`, `/disclaimer` — informational pages

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- A running backend API to support authentication, products, orders, and payments

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root of the project and configure:

```env
VITE_API_URL=https://your-backend.example.com
VITE_RAZORPAY_KEY=your_razorpay_key
```

- `VITE_API_URL` is required for backend API requests.
- `VITE_RAZORPAY_KEY` is required for Razorpay payment flow.

### Run Locally

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Notes

- Authentication state is stored in `localStorage` under `userInfo`.
- Cart data is persisted in `localStorage` under `cartItems`.
- Protected routes are implemented using `UserProtectedRoutes` and `AdminProtectedRoutes`.
- The frontend expects backend endpoints such as `/api/auth/login`, `/api/auth/register`, `/api/auth/users`, `/api/product`, `/api/orders`, `/api/payment`, `/api/payment/verify`, and `/api/analytics`.

## License

No license is provided with this repository. Add a license file if you plan to publish this project.
