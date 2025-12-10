# Basecamp Supply

Premium outdoor gear e-commerce platform built with Next.js, Redux Toolkit, and Shopify.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Tailwind CSS v3** - Styling
- **Shopify Storefront API** - Product data
- **Sonner** - Toast notifications
- **Lucide React** - Icons

## Features

- Product catalog with Shopify integration
- Product detail pages with image galleries
- Shopping cart with Redux state management
- Light/Dark theme switching
- Toast notifications
- Skeleton loading states
- Responsive design

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env.local` with Shopify credentials
4. Run dev server: `npm run dev`

## Environment Variables
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token
```