# Ruvab IT - Advanced Technology Solutions Website

## Overview
This project is a full-stack web application for Ruvab IT, showcasing their AI-powered products (Trend Solver and LangScribe) and services. The website is designed to be modern, responsive, and optimized for SEO and monetization. It aims to present Ruvab IT's capabilities in AI implementation, business intelligence, and automation, targeting lead generation and market expansion.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript.
- **Styling**: Tailwind CSS with shadcn/ui components.
- **Routing**: Wouter for client-side routing.
- **State Management**: TanStack Query for server state.
- **Build Tool**: Vite.
- **UI Components**: shadcn/ui with Radix UI primitives.
- **Layout**: Responsive, mobile-first design.
- **Forms**: React Hook Form with Zod validation.
- **Icons**: Lucide React.

### Backend
- **Server**: Express.js with TypeScript.
- **Database**: PostgreSQL with Drizzle ORM.
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple.
- **API**: RESTful endpoints (`/api` prefix), using Express middleware for logging, error handling, and session-based authentication.

### Core Features
- **Product Showcase**: Dedicated pages for Trend Solver and LangScribe.
- **Service Listings**: AI implementation, business intelligence, automation services.
- **Contact Forms**: Lead generation with validation.
- **Blog Management**: Full CRUD operations for blog posts (admin system).
- **Content Management System (CMS)**:
    - Admin interface for managing page content (hero, about, services) via JSON configuration.
    - Navigation management (add, edit, delete, reorder menu items).
    - Component settings configuration.
    - Real-time updates reflected on the website.
    - Admin-only access with authentication.
    - Blog management (CRUD for posts, publishing controls).
    - Advanced search functionality across content types.

### Database Schema (Core Entities)
- `users`: Stores user credentials, supports admin roles.
- `blogPosts`: Manages blog content (title, content, categories, tags, publishing status).
- `pageContents`: Stores dynamic page content using a flexible JSON structure.
- `navigationItems`: Defines website navigation structure.
- `componentSettings`: Stores configurations for dynamic UI components.

### SEO & Analytics
- **Analytics**: Google Analytics for page view and event tracking.
- **SEO**: Meta tags, Open Graph, Twitter Cards, structured data.
- **Performance**: Lazy loading, code splitting, optimized images.

### Monetization & Compliance
- **Monetization**: Google AdSense integration with policy-compliant ad placement.
- **Compliance**: GDPR-compliant cookie consent management with granular controls.
- **Legal**: Dedicated Privacy Policy and Terms of Service pages.

## External Dependencies

### Third-Party Services
- **Google Analytics**: For user behavior tracking.
- **Google AdSense**: For display advertising and revenue generation.
- **Neon Database**: Serverless PostgreSQL hosting.

### Development Tools
- **Drizzle Kit**: For database migrations and schema management.
- **TypeScript**: For type safety.
- **ESLint**: For code linting and formatting.
- **Vite**: For development server and build optimization.

### Production Dependencies
- **connect-pg-simple**: For PostgreSQL-based session management.
- **Helmet**: For security headers.
- **Gzip compression**: For performance optimization.

## Recent Updates

### February 14, 2025 - Technology News Integration COMPLETED ✅
- **Technology News Component**: Built comprehensive TechnologyNews.tsx component with modern card-based design
  - **Responsive Layout**: Grid layout adapting from 1 to 3 columns based on screen size
  - **Professional Styling**: Gradient headlines, hover effects, and proper image handling
  - **Loading States**: Skeleton loading with proper animations while fetching data
  - **Error Handling**: Comprehensive error states with troubleshooting guidance
  - **API Integration**: Connected to NewsAPI endpoint for real-time technology news
- **Backend API Endpoint**: Created /api/technology-news endpoint with robust error handling
  - **Environment Integration**: Uses NEWS_API_KEY environment variable
  - **Error Specificity**: Detailed error messages for 401, 429, and other API issues
  - **Rate Limiting Awareness**: Built-in handling for NewsAPI rate limits
- **Navigation Integration**: Added "Tech News" to main navigation menu
- **SEO Optimization**: Dedicated TechnologyNewsPage with meta tags, Open Graph, and structured data
- **User Experience**: Clean error states with actionable troubleshooting steps
- **NewsAPI Requirements**: Free tier limited to localhost/development; production requires paid plan

### February 14, 2025 - Cloud Run Deployment Fixes COMPLETED ✅
- **Server Configuration Fixed**: Resolved deployment error with server.listen() configuration
  - **Format Change**: Updated from object configuration `{port, host, reusePort}` to standard `port, host, callback` format
  - **Cloud Run Compatibility**: Added PORT environment variable support with fallback to 5000
  - **Error Handling**: Implemented comprehensive error handling for server startup process
  - **Production Ready**: Server now properly listens on Cloud Run provided PORT with proper host binding
  - **Graceful Failure**: Added process.exit(1) on startup errors with clear error messages
  - **Environment Awareness**: Host configuration adapts to production vs development environments
```