# Ruvab IT - Advanced Technology Solutions Website

## Overview
This project is a full-stack web application for Ruvab IT, showcasing their AI-powered products (Trend Solver and LangScribe) and promoting collaboration opportunities with innovative founders. The website has been transformed to focus on partnerships and collaboration in five key technology domains: AI Implementation, Process Automation, Business Intelligence, Cloud Solutions, and Cybersecurity. The site targets founders building innovative solutions, offering consultation, promotional support, and partnership opportunities to accelerate growth and innovation.

## User Preferences
Preferred communication style: Simple, everyday language.

## Recent Changes (August 30, 2025)
- **Partnership Transformation**: Completely transformed the services section from direct service provision to partnership and collaboration focus
- **Target Audience Shift**: Now targeting founders building innovative solutions in AI, automation, BI, cloud, and cybersecurity domains
- **Content Updates**: Updated hero section, services descriptions, and meta tags to reflect partnership opportunities
- **Five Core Domains**: Established focus on AI Implementation, Process Automation, Business Intelligence, Cloud Solutions, and Cybersecurity partnerships
- **Call-to-Action Enhancement**: Added comprehensive partnership call-to-action sections with solution submission and consultation scheduling
- **Analytics Standardization**: Completed Google Analytics standardization to G-487BHE09VJ across all pages and configurations

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
- **Partnership Platform**: Transformed services section to focus on collaboration opportunities with founders in AI Implementation, Process Automation, Business Intelligence, Cloud Solutions, and Cybersecurity.
- **Founder Collaboration**: Partnership call-to-action sections, solution submission forms, and consultation scheduling.
- **Contact Forms**: Lead generation with validation, now focused on partnership inquiries.
- **Blog Management**: Full CRUD operations for blog posts (admin system).
- **Content Management System (CMS)**: Admin interface for managing page content (hero, about, services) via JSON configuration, navigation management, component settings configuration, real-time updates, admin-only access with authentication, blog management, and advanced search.
- **SEO & Analytics**: Google Analytics for tracking (G-487BHE09VJ), meta tags optimized for partnership keywords, Open Graph, Twitter Cards, structured data, lazy loading, code splitting, and optimized images.
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