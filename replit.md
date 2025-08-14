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
```