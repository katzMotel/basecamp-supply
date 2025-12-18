# Basecamp Supply

A full-stack e-commerce application for outdoor gear featuring real-time inventory management, secure payments, user authentication, and a complete backend system for reviews, wishlists, and order tracking.

**Live Demo:** [https://basecamp-supply.vercel.app](https://basecamp-supply.vercel.app)

## 🎯 Project Overview

Basecamp Supply demonstrates production-ready e-commerce development with a focus on user experience, data persistence, and seamless integration of third-party services. Built as a portfolio project to showcase full-stack development capabilities with modern web technologies.

### Key Highlights

- **Real Product Data**: Integrated with Shopify Storefront API for live product inventory
- **Secure Payments**: Stripe Checkout implementation with test mode
- **Complete Auth System**: User registration, login, and session management with NextAuth.js
- **Database-Backed Features**: Reviews, wishlists, and order history persisted in PostgreSQL
- **Professional UI/UX**: Custom design system with dark mode, responsive layouts, and smooth animations
- **Production Deployment**: Fully deployed on Vercel with environment configuration

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **State Management**: Redux Toolkit
- **UI Components**: Custom component library with Lucide icons
- **Animations**: Framer Motion

### Backend
- **API Routes**: Next.js serverless functions
- **Database**: PostgreSQL (Vercel Postgres)
- **ORM**: Prisma
- **Authentication**: NextAuth.js with credential provider
- **Password Hashing**: bcrypt

### External Services
- **E-commerce**: Shopify Storefront API (GraphQL)
- **Payments**: Stripe Checkout
- **Hosting**: Vercel
- **Database**: Vercel Postgres

### Development Tools
- ESLint
- Git/GitHub
- VS Code

## ✨ Features

### E-Commerce Core

**Product Browsing**
- Dynamic product catalog fetched from Shopify
- Category/collection filtering
- Real-time search functionality
- Multi-criteria sorting (name, price, newest)
- Price range filtering
- Detailed product pages with image galleries
- Inventory management through Shopify

**Shopping Experience**
- Persistent shopping cart with Redux
- Add/remove items with quantity controls
- Cart total calculations
- Smooth cart drawer animation
- Stripe Checkout integration
- Order confirmation page
- Toast notifications for user feedback

**Product Categories**
- Collection-based navigation
- Category dropdown in header
- Dedicated collection pages
- Breadcrumb navigation
- Product count per category

### User Features

**Authentication & Authorization**
- User registration with email and password
- Secure login system
- Session management with JWT
- Password hashing with bcrypt
- Protected routes
- User profile indicator in header
- Sign out functionality

**Product Reviews**
- 5-star rating system
- Write and submit reviews
- View all reviews per product
- Average rating calculation
- User attribution for reviews
- Review timestamps
- Must be signed in to review

**Wishlist**
- Save favorite products
- Heart icon toggle on product cards
- Dedicated wishlist page
- Persistent across sessions
- Remove items from wishlist
- Quick add to cart from wishlist

**Order History**
- View past purchases
- Order details including:
  - Order date
  - Items purchased
  - Quantities and prices
  - Order totals
  - Order status
- Chronological order listing
- Access from user menu

### Design & UX

**Visual Design**
- Custom forest green and warm orange color palette
- Bebas Neue headings + Open Sans body typography
- Mountain landscape backgrounds
- Canvas texture overlays
- Professional product photography
- Consistent spacing and hierarchy

**User Experience**
- Fully responsive design (mobile, tablet, desktop)
- Dark mode with theme toggle
- Smooth page transitions
- Loading states with skeleton screens
- Scroll-aware header (hides on scroll down)
- Mobile-friendly navigation menu
- Empty states for cart, wishlist, orders
- Error handling with user-friendly messages

**Accessibility**
- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Color contrast compliance

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Shopify store with Storefront API access
- Stripe account (test mode)
- PostgreSQL database (or Vercel Postgres)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/basecamp-supply.git
cd basecamp-supply
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```env
# Shopify
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_token

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key

# NextAuth
NEXTAUTH_SECRET=your_secret_here_use_openssl_rand_base64_32
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=your_postgresql_connection_string
```

4. **Set up the database**
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Testing Payments

Use Stripe test card numbers:
- **Success**: 4242 4242 4242 4242
- Any future expiration date
- Any 3-digit CVC

## 📸 Screenshots

[Add screenshots here]

### Homepage
[Screenshot of hero and product grid]

### Product Detail
[Screenshot of product page with reviews]

### Shopping Cart
[Screenshot of cart drawer]

### User Dashboard
[Screenshot of order history or wishlist]

### Mobile Experience
[Screenshot of mobile view]

## 🗄️ Database Schema

### User
- Authentication credentials (email, hashed password)
- Profile information (name)
- Timestamps (created date)
- Relations: reviews, wishlist items, orders

### Review
- Product rating (1-5 stars)
- Review comment (text)
- Product ID (Shopify reference)
- User ID (foreign key)
- Timestamp

### WishlistItem
- Product ID (Shopify reference)
- User ID (foreign key)
- Date added
- Unique constraint (user + product)

### Order
- Stripe session ID
- Order total
- Order status
- Cart items (JSON)
- User ID (foreign key)
- Timestamp

## 🎓 What I Learned

### Full-Stack Development

**Backend Architecture**
- Designed and implemented a relational database schema with Prisma
- Built RESTful API routes with Next.js serverless functions
- Implemented secure authentication with session management
- Handled user data privacy and security best practices
- Integrated multiple third-party APIs (Shopify GraphQL, Stripe REST)

**Frontend Development**
- Managed complex application state with Redux Toolkit
- Implemented server and client components effectively in Next.js 14
- Created reusable component patterns and custom hooks
- Built responsive layouts with Tailwind CSS
- Optimized performance with code splitting and lazy loading

**Database & ORM**
- Modeled relationships (one-to-many, many-to-one)
- Wrote efficient database queries with Prisma
- Implemented data validation and constraints
- Handled migrations and schema evolution
- Managed database connections and connection pooling

**Authentication & Security**
- Implemented credential-based authentication
- Used bcrypt for secure password hashing
- Managed JWT sessions with NextAuth.js
- Protected API routes and pages
- Handled authorization and access control

### Integration & APIs

**GraphQL**
- Wrote complex GraphQL queries for Shopify Storefront API
- Handled nested data structures
- Implemented pagination and filtering
- Managed query variables and fragments

**Payment Processing**
- Integrated Stripe Checkout sessions
- Handled webhooks and callbacks
- Managed success and error flows
- Implemented order confirmation

### DevOps & Deployment

**Production Deployment**
- Deployed to Vercel with environment variables
- Configured production database (PostgreSQL)
- Set up CI/CD pipeline with automatic deployments
- Managed multiple environments (development, production)
- Handled database migrations in production

### Problem Solving

**Technical Challenges Overcome**
- Resolved Prisma Client initialization issues in serverless environment
- Debugged Next.js 15 async params breaking changes
- Fixed CORS and API authentication issues
- Implemented proper error handling and loading states
- Optimized component re-renders and state updates

## 🔮 Future Enhancements

**Planned Features**
- Email notifications for orders (Resend/SendGrid)
- Advanced product search with Algolia

- Product image zoom and gallery improvements
- Recently viewed products
- Product recommendations
- Inventory alerts
- Admin dashboard for analytics

**Technical Improvements**
- Add comprehensive test suite (Jest, React Testing Library)
- Implement real-time inventory updates
- Add Stripe webhooks for order status updates
- Optimize images with Next.js Image component
- Add performance monitoring (Vercel Analytics)
- Implement rate limiting for API routes

## 🏗️ Project Structure
```
basecamp-supply/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── orders/               # Order management
│   │   ├── reviews/              # Review CRUD
│   │   └── wishlist/             # Wishlist management
│   ├── auth/                     # Auth pages (signin, signup)
│   ├── checkout/                 # Checkout flow
│   ├── collections/              # Category pages
│   ├── orders/                   # Order history
│   ├── products/                 # Product pages
│   └── wishlist/                 # Wishlist page
├── components/                   # React components
│   ├── cart/                     # Cart-related components
│   ├── navigation/               # Header, menus
│   ├── products/                 # Product cards, filters
│   ├── reviews/                  # Review components
│   ├── ui/                       # Reusable UI components
│   └── wishlist/                 # Wishlist components
├── lib/                          # Utility libraries
│   ├── redux/                    # Redux store and slices
│   ├── shopify/                  # Shopify API client
│   ├── auth.ts                   # NextAuth configuration
│   └── prisma.ts                 # Prisma client singleton
├── prisma/                       # Database schema and migrations
│   ├── schema.prisma             # Prisma schema
│   └── migrations/               # Database migrations
├── public/                       # Static assets
├── types/                        # TypeScript type definitions
└── hooks/                        # Custom React hooks
```

## 👨‍💻 Author

**Dylan Giddens**

- LinkedIn: [linkedin.com/in/dylan-p-giddens](https://linkedin.com/in/dylan-p-giddens)
- GitHub: [@katzMotel](https://github.com/katzMotel)
- Email: giddensdp@gmail.com

## 📄 License

This project is for portfolio demonstration purposes. Product data is from Shopify's demo API, and payments use Stripe's test mode.

## 🙏 Acknowledgments

- Photography: Personal outdoor photography from hiking trips
- Icons: Lucide React
- Design Inspiration: Modern outdoor retail brands
- Mentorship: FrontEndNow Program with Harry Ashton

## 🛠️ Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# View database in Prisma Studio
npx prisma studio

# Lint code
npm run lint

# Type check
npm run type-check
```

**Built with ❤️ by Dylan Giddens**