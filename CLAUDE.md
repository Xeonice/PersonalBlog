# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev          # Start dev server with Node debugging enabled
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint with Next.js config
npm run format       # Format code with Prettier (src/**/*.{js,jsx})
npm test            # Run Jest tests
```

## Architecture Overview

This is a **Next.js Pages Router** blog application (not App Router). Key architectural decisions:

### Routing Structure
- **Pages Router**: All pages in `/src/pages/` directory
- Main pages: `index.tsx` (home), `about.tsx`, `work.tsx`, `writings.tsx` (blog list)
- Dynamic content routing through `/src/pages/content/` for blog posts
- Custom 404 page implemented

### Styling System
- **Dual styling approach**: Both Tailwind CSS and CSS Modules are used
- **Dark mode**: Implemented via Tailwind's class-based dark mode (`darkMode: 'class'`)
- **Theme UI**: Provides theme context and consistent design tokens
- **CSS Modules**: Component-scoped styles with special handling for `dark` class in Next.js config

### Content Management
- **MDX Support**: Blog posts use `.mdx` format with `next-mdx-remote`
- **Front matter**: Parsed with `gray-matter` for post metadata
- Posts stored in `/posts/` directory
- Dynamic rendering of MDX content with syntax highlighting via Prism.js

### Component Architecture
- Components organized in `/src/components/` with dedicated folders per component
- Key components:
  - `Layout/`: Page wrapper with consistent structure
  - `Navigation/`: Site navigation
  - `ThemeButton/`: Dark/light mode toggle
  - `Typography/`: Consistent text styling
- Each component uses TypeScript and CSS Modules

### Special Configurations
- **next.config.js**: Custom CSS loader configuration for dark mode class preservation
- **PWA Support**: Configured with `next-pwa` for offline functionality
- **TypeScript**: Full type coverage with strict mode
- **Testing**: Jest configured with Babel for JSX/ES6+ support

## Key Development Patterns

1. **Component Creation**: Follow existing pattern - create folder with `index.tsx` and `styles.module.css`
2. **Page Creation**: Add new pages directly in `/src/pages/`
3. **Blog Posts**: Create `.mdx` files in `/posts/` with proper front matter
4. **Styling**: Use Tailwind utilities for rapid development, CSS Modules for component-specific styles
5. **Dark Mode**: Use Tailwind's dark: prefix for theme-aware styling