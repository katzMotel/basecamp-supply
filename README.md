# Basecamp Supply

A full-stack e-commerce application for outdoor gear, featuring real Shopify product integration, Stripe payments, user authentication, and a modern React/Next.js frontend.

## 🎯 Project Overview

Basecamp Supply is a fictional outdoor gear store built to demonstrate full-stack e-commerce development skills. The project integrates with Shopify's Storefront API for product data, Stripe for payment processing, and includes a custom authentication system with Prisma ORM for user management and backend features.

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS v3
- Redux Toolkit (state management)
- Framer Motion (animations)

**Backend:**
- Next.js API Routes
- NextAuth.js (authentication)
- Prisma ORM
- SQLite (development database)

**External Services:**
- Shopify Storefront API (GraphQL)
- Stripe Checkout
- Vercel (deployment)

**Development:**
- ESLint
- Prettier
- Git/GitHub

## ✨ Features

### Core E-commerce
- **Product Catalog**: Browse products with real Shopify data
- **Search & Filtering**: Real-time search with sort and price range filters
- **Shopping Cart**: Add/remove items, update quantities with Redux state management
- **Stripe Checkout**: Secure payment processing with test mode
- **Order Confirmation**: Success page after checkout

### User Features
- **Authentication**: Sign up/sign in with email and password
- **User Sessions**: Persistent login with NextAuth.js
- **User Menu**: Account indicator in header with sign out

### Database Models (Ready for Features)
- **Users**: Authentication and profile management
- **Reviews**: Product reviews with ratings (to be implemented)
- **Wishlist**: Save favorite products (to be implemented)
- **Orders**: Order history tracking (to be implemented)

### Design & UX
- **Custom Theme**: Forest green/warm orange outdoor aesthetic
- **Typography**: Bebas Neue headings + Open Sans body
- **Background Effects**: Layered mountain illustrations, canvas textures
- **Smooth Animations**: Scroll-aware header, drawer transitions
- **Toast Notifications**: User feedback for cart actions
- **Loading States**: Skeleton screens during data fetching
- **Dark Mode**: Full dark mode support

### Pages
- **Homepage**: Hero section with personal photography, product grid
- **About**: Brand story and values
- **Product Details**: Individual product pages with image galleries
- **Authentication**: Sign in and sign up pages
- **Checkout Success**: Order confirmation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Shopify store (for Storefront API access)
- Stripe account (test mode)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/basecamp-supply.git
cd basecamp-supply
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
# Shopify
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key

# NextAuth
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL="file:./dev.db"
```

4. Set up database:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. (Optional) Open Prisma Studio to view database:
```bash
npx prisma studio
```

6. Run development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Your Shopify store domain | Yes |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Shopify Storefront API token | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (test) | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key (test) | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret key (generate with `openssl rand -base64 32`) | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `DATABASE_URL` | Database connection string | Yes |

## 🗄️ Database Schema

### User
- Authentication and profile data
- One-to-many relationships with reviews, wishlist items, and orders

### Review (Planned)
- Product reviews with star ratings
- Links to users and Shopify product IDs

### WishlistItem (Planned)
- Saved products for users
- Prevents duplicate favorites

### Order (Planned)
- Order history tracking
- Stores Stripe session data and cart items

## 📸 Screenshots

[Add screenshots here after deployment]

## 🎓 What I Learned

### Backend Development
- **Database Design**: Creating normalized schemas with Prisma
- **Authentication**: Implementing secure user authentication with NextAuth.js
- **ORM Usage**: Working with Prisma Client for type-safe database queries
- **API Routes**: Building RESTful endpoints in Next.js
- **Password Security**: Hashing passwords with bcrypt

### State Management
- Implementing Redux Toolkit with Next.js App Router
- Managing complex client/server state interactions

### API Integration
- Working with GraphQL (Shopify) and REST (Stripe)
- Handling external API authentication

### TypeScript
- Type-safe development with complex data structures
- Prisma-generated types for database models

### Design Systems
- Building cohesive UI with Tailwind and custom design tokens
- Creating reusable component patterns

### Performance
- Next.js Image optimization
- Lazy loading and route prefetching
- Database query optimization

## 🔮 Future Enhancements

**In Progress:**
- Product reviews and ratings system
- Wishlist functionality
- Order history tracking

**Planned:**
- Email confirmations (Resend/SendGrid)
- Product search with Algolia
- Advanced filtering (categories, tags)
- User profile management
- Admin dashboard for content management

## 👨‍💻 Author

**Dylan Giddens**
- GitHub: [@yourusername](https://github.com/yourusername)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 📄 License

This project is for portfolio demonstration purposes.

---

**Note**: This is a fictional store built for educational purposes. Product data comes from Shopify's demo API, and payments use Stripe's test mode.

## 🛠️ Development Commands
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio

# Lint code
npm run lint
```