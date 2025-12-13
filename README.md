# Heelix - React Router v7 & Expo Monorepo

A monorepo setup for the Heelix using React Router v7 for web, and Expo for mobile.

## Project Structure

```
heelix-react-router-and-expo/
├── apps/
│   ├── web/              # React Router v7 web application
│   └── mobile/          # Expo mobile application
├── libs/
│   └── shared/
│       ├── types/        # Shared TypeScript types
│       ├── schemas/      # Shared Zod validation schemas
│       ├── stores/       # Shared Zustand stores
│       ├── query/        # Shared TanStack Query configuration
│       └── utils/        # Shared utility functions
└── tools/               # Build tools and scripts
```

## Key Features

- **Nx Monorepo**: Efficient monorepo management with Nx
- **React Router v7**: Latest version for web routing
- **Expo**: Mobile app development (without Expo Web)
- **Shared Code**: Non-UI code shared between web and mobile:
  - TypeScript types
  - Zod schemas for validation
  - Zustand stores for state management
  - TanStack Query configuration and hooks
  - Utility functions
- **Styling**:
  - **Web**: Tailwind CSS
  - **Mobile**: NativeWind (Tailwind for React Native)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- For mobile development: Expo CLI and iOS/Android development environment

### Installation

```bash
npm install
```

### Development

#### Web App (React Router v7)

```bash
npm run dev:web
# or
nx serve web
```

The web app will be available at `http://localhost:4200`

#### Mobile App (Expo)

```bash
npm run dev:mobile
# or
nx start mobile
```

### Building

#### Web App

```bash
npm run build:web
# or
nx build web
```

#### Mobile App

```bash
npm run build:mobile
# or
nx build mobile
```

## Shared Libraries

### Using Shared Code

All shared libraries are available via TypeScript path aliases:

```typescript
// Types
import { User, Team } from '@heelix/shared/types';

// Schemas
import { userSchema, teamSchema } from '@heelix/shared/schemas';

// Stores
import { useAppStore } from '@heelix/shared/stores';

// Query
import { queryClient } from '@heelix/shared/query';

// Utils
import { formatDate, formatCurrency } from '@heelix/shared/utils';
```

### Adding to Shared Libraries

1. **Types**: Add TypeScript interfaces/types to `libs/shared/types/src/types.ts`
2. **Schemas**: Add Zod schemas to `libs/shared/schemas/src/schemas.ts`
3. **Stores**: Add Zustand stores to `libs/shared/stores/src/stores.ts`
4. **Query**: Add query hooks to `libs/shared/query/src/hooks.ts`
5. **Utils**: Add utility functions to `libs/shared/utils/src/utils.ts`

## Styling

### Web (Tailwind CSS)

The web app uses Tailwind CSS. Configuration is in `apps/web/tailwind.config.js`.

```tsx
<div className="container mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold">Hello World</h1>
</div>
```

### Mobile (NativeWind)

The mobile app uses NativeWind (Tailwind for React Native). Configuration is in `apps/mobile/tailwind.config.js`.

```tsx
<View className="flex-1 items-center justify-center bg-white">
  <Text className="text-2xl font-bold text-gray-900">Hello World</Text>
</View>
```

## Important Notes

- **No UI Component Sharing**: UI components are NOT shared between web and mobile. Each platform has its own UI components.
- **React Native Web**: This project does NOT use React Native Web. Web uses standard React with React Router v7, and mobile uses Expo with React Native.
- **Shared Non-UI Code**: Only non-UI code (types, schemas, stores, queries, utils) is shared between platforms.

## Testing

```bash
# Run all tests
npm test
# or
nx test

# Run tests for a specific project
nx test web
nx test mobile
```

## Linting

```bash
# Lint all projects
npm run lint
# or
nx lint

# Lint a specific project
nx lint web
nx lint mobile
```

## Project Commands

- `nx serve web` - Start web development server
- `nx start mobile` - Start Expo development server
- `nx build web` - Build web app for production
- `nx build mobile` - Build mobile app
- `nx test` - Run tests
- `nx lint` - Run linter
- `nx graph` - Visualize project dependencies

## Tech Stack

- **Monorepo**: Nx
- **Web Framework**: React Router v7
- **Mobile Framework**: Expo
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Validation**: Zod
- **Styling**: Tailwind CSS (web), NativeWind (mobile)
- **TypeScript**: Full TypeScript support
- **Build Tool**: Vite (web), Metro (mobile)

## License

MIT
