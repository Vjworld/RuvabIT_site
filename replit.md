# Ruvab IT - Advanced Technology Solutions Website

## Overview

This is a full-stack web application built with React and Express for Ruvab IT, a technology solutions company. The application showcases the company's AI-powered products (Trend Solver and LangScribe) and services through a modern, responsive website with comprehensive SEO optimization and monetization features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple
- **Development**: Hot reload with Vite middleware integration

### Component Structure
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Layout**: Responsive design with mobile-first approach
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React icon library

## Key Components

### Core Pages
- **Home Page**: Hero section, featured products, services, about, blog, and contact
- **Privacy Policy**: GDPR-compliant privacy policy page
- **Terms of Service**: Legal terms and conditions
- **404 Page**: Custom not found page

### Business Features
- **Product Showcase**: Trend Solver and LangScribe product presentations
- **Service Listings**: AI implementation, business intelligence, automation services
- **Contact Forms**: Lead generation with form validation
- **Blog Management**: Full admin system for creating, editing, and publishing blog posts
- **Content Management**: Dynamic blog system with categorization and tagging

### Administrator CMS Features
- **Page Content Management**: Edit hero sections, about content, and other page elements through JSON-based configuration
- **Navigation Management**: Add, edit, delete, and reorder navigation menu items with visibility controls
- **Component Settings**: Configure dynamic components like buttons, forms, and layout elements
- **Real-time Updates**: Changes are immediately reflected on the live website
- **User Authentication**: Admin-only access with username/password: admin/admin123
- **Security Settings**: Password change functionality with current password verification
- **Blog Management**: Full CRUD operations for blog posts with publishing controls
- **Search Management**: Advanced search functionality across all content types

### SEO & Analytics
- **Google Analytics**: Page view tracking and event analytics
- **SEO Optimization**: Meta tags, Open Graph, Twitter Cards, structured data
- **Performance**: Lazy loading, code splitting, optimized images

### Monetization & Compliance
- **Google AdSense**: GDPR-compliant ad system with proper consent management
- **Cookie Consent**: Comprehensive consent management with granular controls
- **Privacy Policy**: Enhanced AdSense-specific privacy disclosures
- **Ad Placement**: Policy-compliant placement with clear content separation
- **Newsletter**: Email capture for lead generation

## Data Flow

### Database Schema
```typescript
// Users table with admin support
users: {
  id: serial (primary key)
  username: text (unique)
  password: text
  isAdmin: boolean (default: false)
}

// Blog posts table
blogPosts: {
  id: serial (primary key)
  title: text
  slug: text (unique)
  excerpt: text
  content: text
  category: text
  tags: text[] (array)
  publishedAt: timestamp
  updatedAt: timestamp
  isPublished: boolean (default: false)
  authorId: integer (foreign key to users.id)
}

// CMS page content management
pageContents: {
  id: serial (primary key)
  pageKey: text (unique) // e.g., 'hero', 'about', 'services'
  title: text
  content: json // flexible JSON structure for content
  isActive: boolean (default: true)
  updatedAt: timestamp
  updatedBy: integer (foreign key to users.id)
}

// Navigation and link management
navigationItems: {
  id: serial (primary key)
  label: text
  href: text
  type: text // 'link', 'dropdown', 'button'
  parentId: integer (nullable, self-reference)
  position: integer (default: 0)
  isVisible: boolean (default: true)
  updatedAt: timestamp
}

// Component configuration
componentSettings: {
  id: serial (primary key)
  componentKey: text (unique) // e.g., 'hero-buttons', 'contact-form'
  settings: json // JSON for component configuration
  isActive: boolean (default: true)
  updatedAt: timestamp
  updatedBy: integer (foreign key to users.id)
}
```

### API Architecture
- RESTful API endpoints prefixed with `/api`
- Express middleware for logging and error handling
- Session-based authentication (setup ready)
- CRUD operations through storage interface

### State Management
- TanStack Query for server state caching
- React Context for global UI state
- Local storage for user preferences and consent

## External Dependencies

### Third-Party Services
- **Google Analytics**: User behavior tracking and conversion monitoring
- **Google AdSense**: Revenue generation through display advertising
- **Neon Database**: Serverless PostgreSQL hosting

### Development Tools
- **Drizzle Kit**: Database migrations and schema management
- **TypeScript**: Type safety across frontend and backend
- **ESLint**: Code linting and formatting
- **Vite**: Development server and build optimization

### Production Dependencies
- **Session Management**: PostgreSQL sessions with connect-pg-simple
- **Security**: CORS, helmet-style security headers
- **Performance**: Gzip compression, static file serving

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: Local development with hot reload
- **Production**: Node.js server serving static files and API
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database (Neon Database recommended)
- Static file serving capability
- HTTPS support for analytics and ads

### Key Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (example: postgresql://username:password@hostname:port/database)
- `VITE_GA_MEASUREMENT_ID`: Google Analytics tracking ID (example: G-XXXXXXXXXX)
- `VITE_ADSENSE_CLIENT_ID`: Google AdSense client ID (example: ca-pub-XXXXXXXXXXXXXXXXX)
- `NODE_ENV`: Environment mode (development/production)

### Performance Optimizations
- Code splitting with manual chunks (vendor, router, icons)
- Tree shaking and dead code elimination
- Optimized images and lazy loading
- Service worker ready for PWA features

## Recent Changes

### February 14, 2025 - Complete Pricing Information Removal COMPLETED ✅
- **Critical Issue Resolved**: Removed ALL pricing information from public website after discovery of exposed pricing in multiple locations
- **Product Pages Cleaned**: Completely removed pricing sections from TrendSolver and LangScribe pages, replaced with "Get Started" sections
- **Chat Systems Updated**: All chat systems (LiveChat, ChatWidget, WebSocket) now redirect pricing inquiries to support@ruvabit.com
- **Comprehensive Coverage**: Eliminated specific pricing (₹50,000-₹2,00,000 ranges, $29/$79 plans) from all public-facing content
- **Professional Redirection**: Consistent messaging across all systems directing customers to sales team for personalized quotes
- **Quality Assurance**: Verified no pricing information remains exposed to public users anywhere on the site

### February 14, 2025 - Advanced Security Implementation COMPLETED ✅
- **Complete Security Audit**: Comprehensive security measures implemented across all 9 advanced features
- **Environment Variables**: All API keys and secrets moved to environment variables with no hardcoded fallbacks
- **PII Data Protection**: Multi-layer data protection with input sanitization, output encoding, and secure session management
- **Security Headers**: CSP, XSS protection, clickjacking prevention, and CORS configuration implemented
- **Rate Limiting**: Protection against brute force and DDoS attacks on sensitive endpoints
- **GDPR Compliance**: Enhanced privacy controls with granular cookie consent and data minimization
- **Authentication Security**: Bcrypt password hashing, session-based auth, and admin role verification
- **Database Security**: SQL injection prevention, encrypted sessions, and secure connection validation
- **Payment Security**: PCI-compliant Razorpay integration with webhook signature verification
- **Email Security**: SendGrid integration with input validation and secure API key management

### February 14, 2025 - Blog Content Expansion COMPLETED ✅
- **20 New Blog Posts Added**: Comprehensive tech blog series covering 10 key domains
  - **Technology** (2 posts): Everyday magic of tech, future-proofing skills
  - **AI & Machine Learning** (2 posts): AI basics for everyone, ML demystified
  - **Business Intelligence** (2 posts): BI as secret weapon, small business BI wins
  - **Automation** (2 posts): More than robots, maintaining human touch
  - **Data Analytics** (2 posts): Numbers to narratives, personal data decisions
  - **Digital Transformation** (2 posts): Beyond buzzwords, small business growth
  - **Cybersecurity** (2 posts): Common myths debunked, staying safe without paranoia
  - **Cloud Computing** (2 posts): Why files love cloud, startup advantages
  - **Software Development** (2 posts): New literacy, building from scratch
  - **Industry News** (2 posts): Keeping up without burnout, strategic importance
- **SEO Optimized**: Each post includes targeted keywords and hashtags
- **Professional Tone**: Coffee-chat style writing that's accessible yet informative
- **Strategic Categories**: Aligned with Ruvab IT's service offerings and expertise
- **Database Integration**: All posts properly categorized and published with clean URLs

### February 13, 2025 - QR Gen Tool Custom Domain COMPLETED ✅
- **QR Gen Tool Custom Domain**: Updated all references to use custom domain URL
  - **Custom Domain**: `https://qr-gen.ruvab.it.com` (production custom domain)
  - **Updated**: All navigation links, buttons, and CTA elements to use custom domain URL
  - **Header Navigation**: Enhanced dropdown menu with external link support for custom domain
  - **Footer Links**: Updated product links to open QR Gen Tool custom domain in new tab
  - **Product Pages**: All "Launch QR Gen Tool" buttons now open custom domain in new tab
  - **SEO Optimization**: Updated canonical URLs to point to custom domain
  - **Clean Architecture**: Direct external linking to custom domain approach

### February 8, 2025 - AdSense Policy Compliance COMPLETED ✅
- **Privacy Policy Enhancement**: Added comprehensive AdSense and cookie disclosure sections
- **GDPR Consent Management**: Implemented granular cookie consent with advertising opt-in
- **Ad Placement Optimization**: Reduced ad density, removed above-fold ads, improved visual separation
- **Content Quality Assurance**: Verified all content is original, valuable, and policy-compliant
- **Consent-Based Loading**: Ads only load with explicit advertising consent from users
- **Clear Ad Labeling**: "SPONSORED CONTENT" labels with visual borders and explanatory text
- **Compliance Documentation**: Created comprehensive AdSense compliance report

### January 30, 2025 - Codebase Optimization & Cleanup
- **Removed Unused Components & Routes**: Optimized codebase by removing unused files
  - **Deleted Pages**: `CareersPage.tsx`, `APIDocumentation.tsx`, `BlogPost.tsx`
  - **Deleted Admin Components**: `Admin.tsx`, `AdminCMS.tsx`, `AdminPostEditor.tsx`, `Login.tsx`, `Logout.tsx`
  - **Deleted Unused Components**: `CTAButton.tsx` (contained outdated URLs)
  - **Cleaned App.tsx**: Removed commented routes and unused imports
  - **Asset Cleanup**: Removed old attached assets and backup files
- **React Component Routes**: Implemented proper React routing for product pages
  - `/trend-solver` → Shows TrendSolver React component page
  - `/langscribe` → Shows LangScribe React component page
  - **Removed**: Static HTML redirect subdirectories to prevent routing conflicts
  - **Updated**: Sitemap.xml with correct React route paths
- **Button Link Updates**: Updated all product buttons throughout the website to link directly to Replit applications
  - **Home Page Hero**: Launch buttons now open applications directly in new tabs
  - **Products Page**: "Launch" buttons replace "Learn More" with direct application links
  - **Individual Product Pages**: All CTA buttons now link to actual applications
  - **Trend Solver**: All buttons → `https://trendsolver.ruvab.it.com`
  - **LangScribe**: All buttons → `https://langscribe.ruvab.it.com`
- **Optimized Codebase**: Reduced bundle size by removing unused code and files
- **User Experience**: Seamless access to applications with proper React page content
- **Consistent Branding**: All buttons now use "Launch [Product]" instead of generic "Learn More" text
- **Analytics**: Product launch tracking maintains comprehensive event monitoring