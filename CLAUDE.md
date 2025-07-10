# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"The Woodshed" is a guitar practice companion app built with Next.js 15. It helps musicians organize and track their practice routines through a three-panel interface for selecting categories, previewing routines, and managing daily practice sessions.

## Development Commands

- `npm run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS v4 with custom color scheme
- **State Management**: React useState hooks (client-side only)
- **API Integration**: Fetch calls to external Flask API at http://127.0.0.1:5050

### Key Components

**Main Application** (`src/app/page.tsx`):
- Three-panel layout: Category Selection, Preview, Today's Practice
- Client-side state management for form inputs and routine data
- API integration for fetching random routines from external Flask service

**UI Components** (`src/components/ui/`):
- shadcn/ui components: Button, Card, Textarea, Select, RadioGroup, Label
- Consistent styling with custom color scheme (grays, blues, pinks)
- Responsive design with custom button styles

### API Structure

**Next.js API Route** (`src/app/api/getRandomRoutine/route.ts`):
- Currently a placeholder endpoint
- Main functionality calls external Flask API directly from frontend

### External Dependencies

The app integrates with an external Flask API running on `http://127.0.0.1:5050/api/random-routine` for fetching practice routines based on category and completion state.

## Development Notes

- Uses `@/` path aliases for clean imports (configured in tsconfig.json)
- Custom color scheme with gray backgrounds and blue/pink accents
- All components are client-side rendered ("use client")
- State is managed locally in the main component without external state management
- External API integration expects Flask server running locally on port 5050

## Configuration Files

- `components.json` - shadcn/ui configuration with "new-york" style
- `tsconfig.json` - TypeScript configuration with path aliases
- `next.config.ts` - Next.js configuration
- `eslint.config.mjs` - ESLint configuration
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS v4