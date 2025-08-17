# Ruvab IT - Advanced Technology Solutions Website

## Overview
This project is a full-stack web application for Ruvab IT, showcasing their AI-powered products (Trend Solver and LangScribe) and services. The website is designed to be modern, responsive, and optimized for SEO and monetization. It aims to present Ruvab IT's capabilities in AI implementation, business intelligence, and automation, targeting lead generation and market expansion. This is the Ruvab IT business website with technology news integration, including comprehensive news fetching, partner referral systems, business service pages, and comprehensive security implementation.

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
- **UI/UX Decisions**: Vibrant minimalist redesign with gradient backgrounds, enhanced hero sections, backdrop blur effects, smooth animations, borderless cards with gradient shadows, rounded badges with gradient backgrounds, and interactive elements with gradient colors. Cohesive blue-purple-cyan color scheme.

### Backend
- **Server**: Express.js with TypeScript.
- **Database**: PostgreSQL with Drizzle ORM.
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple.
- **API**: RESTful endpoints (`/api` prefix), using Express middleware for logging, error handling, and session-based authentication.
- **Security**: Enterprise-level security implementation including API key security, bcrypt password hashing, comprehensive security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, HSTS), enhanced session configuration with CSRF protection, secure cookies, and httpOnly flags. PII data protection with data masking, multi-layer access controls, and audit logging. Production security configuration includes HTTPS enforcement, rate limiting, and secure error responses.

### Core Features
- **Product Showcase**: Dedicated pages for Trend Solver and LangScribe.
- **Service Listings**: AI implementation, business intelligence, automation services.
- **Contact Forms**: Lead generation with validation.
- **Blog Management**: Full CRUD operations for blog posts (admin system).
- **Content Management System (CMS)**: Admin interface for managing page content (hero, about, services) via JSON configuration, navigation management, component settings configuration, real-time updates, admin-only access with authentication, blog management, and advanced search.
- **SEO & Analytics**: Google Analytics for tracking, meta tags, Open Graph, Twitter Cards, structured data, lazy loading, code splitting, and optimized images.
- **Monetization & Compliance**: Google AdSense integration, GDPR-compliant cookie consent management, Privacy Policy and Terms of Service pages.
- **Technology News System**: Comprehensive news fetching from multiple sources (NewsNow, NewsAPI.ai), 24/7 availability with archive fallback, monthly database cleanup, technology-only filtering, user-friendly error messages, and intelligent 12-hour caching to optimize API usage. Includes detailed article summaries, professional images, and comprehensive logging.
- **Referral Partner System**: Comprehensive affiliate marketing system with `referral_partners` table, admin interface for CRUD operations, and public display.

### Database Schema (Core Entities)
- `users`: Stores user credentials, supports admin roles.
- `blogPosts`: Manages blog content (title, content, categories, tags, publishing status).
- `pageContents`: Stores dynamic page content using a flexible JSON structure.
- `navigationItems`: Defines website navigation structure.
- `componentSettings`: Stores configurations for dynamic UI components.
- `news_archive`: Stores historical news articles with metadata, quality scoring, sentiment analysis, and keyword extraction.
- `news_source_stats`: Tracks API provider performance.
- `news_cache`: Stores cached news articles for persistent cache management.
- `referral_partners`: Stores referral partner data with commission tracking.

## External Dependencies

### Third-Party Services
- **Google Analytics**: For user behavior tracking.
- **Google AdSense**: For display advertising and revenue generation.
- **Neon Database**: Serverless PostgreSQL hosting.
- **RapidAPI NewsNow**: News API service.
- **NewsAPI.ai (EventRegistry.org)**: Second news API provider.

### Production Dependencies
- **connect-pg-simple**: For PostgreSQL-based session management.
- **Helmet**: For security headers.
- **Gzip compression**: For performance optimization.