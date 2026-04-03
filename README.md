# Next.js Starter Kit

A modern, production-ready Next.js starter kit with authentication, CMS-ready architecture, and comprehensive UI components.

## ✨ Features

### 🔐 Authentication

- **Better Auth** integration with Google OAuth
- Session management with cookie-based authentication
- Protected and public route layouts
- Server-side session validation

### 🎨 UI & Styling

- **Tailwind CSS v4** with custom configuration
- **shadcn/ui** components library
- **Radix UI** primitives
- **Lucide React** icons
- Dark/Light theme support with `next-themes`
- Responsive sidebar navigation with collapsible menus
- Custom typography plugin

### 📝 Content Management

- Role-based sidebar menus (Editor, Admin, Viewer)
- Pre-configured CMS navigation structure:
  - Dashboard
  - Content (Posts, Pages, Categories, Tags)
  - Media Library
  - User Management
  - Comments & Moderation
  - Analytics
  - Settings

### 🛠️ Developer Experience

- **TypeScript** for type safety
- **TanStack Query** for data fetching
- **TanStack Form** with form devtools
- **TanStack Table** for data grids
- **Zod** for schema validation
- **Axios** for HTTP requests
- Environment validation with `@t3-oss/env-nextjs`
- ESLint + Prettier for code quality
- Husky + Commitlint for git hooks
- Release automation with `release-it`

### 🎯 Advanced Features

- Drag & Drop with `@dnd-kit`
- Rich text editor with Lexical
- Date handling with `date-fns`
- Map integration with MapLibre GL
- URL state management with `nuqs`
- State management with Zustand
- Command palette with `cmdk`

## 📁 Project Structure

```
nextjs-starterkit/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Authentication routes
│   │   │   └── sign-in/
│   │   ├── (protected)/         # Protected routes (requires auth)
│   │   │   ├── dashboard/
│   │   │   └── layout.tsx
│   │   ├── (public)/            # Public routes
│   │   │   ├── (home)/
│   │   │   └── layout.tsx
│   │   ├── api/                 # API routes
│   │   └── layout.tsx           # Root layout
│   ├── components/
│   │   ├── block/               # Complex components
│   │   │   ├── auth/           # Auth components
│   │   │   ├── common/         # Shared components
│   │   │   ├── editor/         # Rich text editor
│   │   │   └── form/           # Form fields
│   │   ├── layout/             # Layout components
│   │   │   ├── public/         # Public layout
│   │   │   └── sidebar/        # Sidebar navigation
│   │   └── ui/                 # shadcn/ui components
│   ├── config/
│   │   └── env.ts              # Environment config
│   ├── data/
│   │   └── sidebar-menu.ts     # Sidebar configuration
│   ├── hooks/                  # Custom React hooks
│   ├── lib/
│   │   ├── api/                # API utilities
│   │   │   ├── queries/        # TanStack Query queries
│   │   │   ├── services/       # API services
│   │   │   └── servers/        # Server actions
│   │   ├── auth/               # Authentication
│   │   │   ├── auth-server.ts  # Server-side auth
│   │   │   ├── auth-client.ts  # Client-side auth
│   │   │   └── handler.ts      # Auth handlers
│   │   ├── constants/          # App constants
│   │   ├── providers/          # React providers
│   │   └── utils.ts            # Utility functions
│   ├── styles/
│   │   └── globals.css         # Global styles
│   └── types/                  # TypeScript types
├── Dockerfile                  # Docker configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10.33.0 (recommended)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nextjs-starterkit
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
# Create .env file and configure the following:
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
API_URL=your-api-url
OSM_API_URL=https://nominatim.openstreetmap.org
```

4. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📜 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm check        # Format with Prettier and fix ESLint issues
pnpm release      # Create a new release
pnpm release:patch # Patch version release
pnpm release:minor # Minor version release
pnpm release:major # Major version release
```

## 🔑 Authentication

This starter uses **Better Auth** with Google OAuth:

- Sign in page: `/sign-in`
- Protected routes require authentication
- Session stored in HTTP-only cookies
- 30-day session expiration
- Automatic session refresh

### Usage Example

```typescript
// Server Component
import { requireSession } from '@/lib/auth/handler'

export default async function ProtectedPage() {
  const session = await requireSession()
  return <div>Welcome {session.user.name}</div>
}

// Client Component
import { signInWithGoogle, signOut } from '@/lib/auth/auth-client'

function LoginButton() {
  return <button onClick={signInWithGoogle}>Sign in with Google</button>
}
```

## 🎨 UI Components

Built with **shadcn/ui** and **Radix UI**:

- Accordion, Alert, Avatar, Badge
- Breadcrumb, Button, Calendar, Card
- Checkbox, Collapsible, Command, Dialog
- Dropdown Menu, Input, Label, Popover
- Progress, Radio Group, Rating, Select
- Separator, Sheet, Sidebar, Slider
- Switch, Tabs, Textarea, Tooltip
- Data Grid with sorting, filtering, pagination
- Drag & Drop tables

## 🗂️ Data Fetching

Using **TanStack Query** for server state management:

```typescript
import { queries } from '@/lib/api/queries'
import { useQuery } from '@tanstack/react-query'

function Categories() {
  const { data } = useQuery(queries.categories.list())
  return <div>{/* render categories */}</div>
}
```

## 📋 Forms

Using **TanStack Form** with custom field components:

```typescript
import { useAppForm } from '@/hooks/form'

function MyForm() {
  const form = useAppForm({
    defaultValues: { name: '' }
  })

  return (
    <form.TextField name="name" label="Name" />
  )
}
```

## 🐳 Docker Support

Build and run with Docker:

```bash
docker build -t nextjs-starterkit .
docker run -p 3000:3000 nextjs-starterkit
```

## 🎯 Role-Based Access

Three predefined roles with different sidebar access:

- **Editor**: Dashboard, Content, Media, Comments, Taxonomy
- **Admin**: Full access including Users, Analytics, Administration, Settings
- **Viewer**: Dashboard, Content (limited), Analytics

Configure roles in `src/data/sidebar-menu.ts`

## 🔧 Configuration

### Environment Variables

Configure in `.env`:

- `BETTER_AUTH_URL` - Auth base URL
- `BETTER_AUTH_SECRET` - Auth secret key
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth secret
- `API_URL` - Backend API URL
- `OSM_API_URL` - OpenStreetMap API URL

### Metadata

Update site metadata in `src/lib/constants/meta.ts`

## 📦 Tech Stack

- **Framework**: Next.js 16.2.2
- **React**: 19.2.4
- **TypeScript**: 5.9.3
- **Styling**: Tailwind CSS 4.2.2
- **UI Components**: shadcn/ui, Radix UI
- **Authentication**: Better Auth 1.5.6
- **Data Fetching**: TanStack Query 5.96.1
- **Forms**: TanStack Form 1.28.6
- **State Management**: Zustand 5.0.12
- **Validation**: Zod 4.3.6
- **HTTP Client**: Axios 1.13.6

## 📄 License

MIT License - see [LICENSE.md](LICENSE.md)

## 🤝 Contributing

Contributions are welcome! Please follow the conventional commits specification for commit messages.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Documentation](https://better-auth.com)
- [TanStack Query](https://tanstack.com/query)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
