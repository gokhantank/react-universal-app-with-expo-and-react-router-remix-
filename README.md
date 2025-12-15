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

## Architecture Decision: Why This Tech Stack?

This project represents a strategic choice to modernize the Heelix platform with a cutting-edge, developer-friendly tech stack. Here's why we chose React Router v7 for web and Expo for mobile:

### Why React Router v7 for Web?

**Pros:**
- **Modern and Future-Proof**: React Router v7 is the latest version, built with modern React patterns and designed for long-term maintainability
- **Excellent Developer Experience**: Intuitive API, excellent TypeScript support, and great developer tools
- **Performance**: Built-in code splitting, lazy loading, and optimized rendering
- **Flexible Routing**: Supports nested routes, dynamic segments, and complex routing patterns
- **Active Development**: Regular updates and strong community support
- **Web Standards**: Leverages modern web APIs and follows React best practices
- **No Framework Lock-in**: Pure React solution without additional framework overhead

**Cons:**
- **Learning Curve**: Team members familiar with Angular will need to learn React patterns
- **Newer Version**: Less community resources compared to React Router v6 (though growing rapidly)

### Why Expo for Mobile?

**Pros:**
- **Rapid Development**: Fast iteration cycle with hot reloading and over-the-air updates
- **Cross-Platform**: Write once, deploy to both iOS and Android
- **Rich Ecosystem**: Access to a vast library of pre-built native modules
- **No Native Code Required**: For most features, you can build entirely in JavaScript/TypeScript
- **Easy Deployment**: Simplified build and submission process with EAS (Expo Application Services)
- **Modern Tooling**: Excellent developer tools, debugging, and testing support
- **Active Community**: Large, active community with regular updates and improvements
- **Future-Proof**: Well-maintained and aligned with React Native's roadmap

**Cons:**
- **Bundle Size**: Slightly larger app size compared to pure React Native (though minimal with modern tooling)
- **Native Module Limitations**: Some very specific native modules may require custom native code
- **Platform-Specific Features**: Advanced platform-specific features might need custom development

### Why This Architecture?

#### 1. **Modern, Unified Development Experience**
   - Both web and mobile share the same core technologies (React, TypeScript, TanStack Query, Zustand, Zod)
   - Developers can work across platforms with minimal context switching
   - Shared business logic, types, and utilities reduce duplication

#### 2. **Code Sharing Strategy**
   - **Shared Non-UI Code**: Types, schemas, stores, queries, and utilities are shared between platforms
   - **Platform-Optimized UI**: Each platform gets UI components optimized for its environment
   - **Consistent Styling**: NativeWind/Tailwind provides consistent design language across platforms

#### 3. **Developer Growth Opportunity**
   - **Learning React**: For a team of Angular developers, learning React opens up new opportunities and expands skill sets
   - **Modern Patterns**: Exposure to modern React patterns, hooks, and ecosystem
   - **Transferable Skills**: React knowledge is highly valuable and transferable across many projects
   - **Exciting Challenge**: Working with another cutting-edge technology keeps the team engaged and motivated

#### 4. **Performance & User Experience**
   - **Web**: React Router v7 provides excellent performance with code splitting and optimized rendering
   - **Mobile**: Expo enables native performance with the convenience of JavaScript development
   - **Consistent UX**: Shared business logic ensures consistent behavior across platforms

#### 5. **Maintainability & Scalability**
   - **Type Safety**: Full TypeScript support across the entire stack
   - **Monorepo Benefits**: Nx provides excellent tooling for managing a multi-platform codebase
   - **Clear Separation**: Clear boundaries between shared and platform-specific code
   - **Easy Onboarding**: Well-structured codebase makes it easy for new team members to contribute

#### 6. **Future Flexibility**
   - **Technology Evolution**: Both React Router and Expo are actively maintained and evolving
   - **Easy Migration**: If needed, components can be migrated or replaced incrementally
   - **Platform Expansion**: Easy to add new platforms (e.g., desktop apps with Electron) using the same shared code

### For Angular Developers: Why This Is Exciting

As Angular developers, learning React will:
- **Expand Your Skill Set**: React is one of the most popular frontend frameworks, opening up more career opportunities
- **Modern Patterns**: Experience modern React patterns like hooks, context, and component composition
- **Ecosystem Access**: Gain access to React's vast ecosystem of libraries and tools
- **Different Perspectives**: Learning different approaches to similar problems makes you a better developer
- **Industry Standard**: React knowledge is highly sought after in the job market
- **Fun & Engaging**: Working with new technology keeps development exciting and challenging

### Comparison with Alternatives

**vs. Angular Universal:**
- React Router v7 offers more flexibility and modern patterns
- Better suited for component-based architecture
- More active ecosystem for modern web development

**vs. React Native Web:**
- Separate web implementation allows for platform-optimized experiences
- Better performance on web (no React Native Web overhead)
- More flexibility in choosing web-specific libraries

**vs. Ionic/Capacitor:**
- Expo provides better native performance and access to native APIs
- More aligned with React ecosystem
- Better developer experience with modern tooling

### Conclusion

This architecture choice represents a strategic investment in:
- **Modern Technology**: Using the latest, well-maintained tools
- **Developer Experience**: Tools that make development enjoyable and efficient
- **Code Quality**: Type safety, shared logic, and clear architecture
- **Team Growth**: Opportunity for Angular developers to learn React
- **Long-term Maintainability**: Well-structured, scalable codebase

The combination of React Router v7 and Expo provides a powerful, modern foundation for building the next generation of the Heelix platform, while offering an exciting learning opportunity for the team.

## License

MIT
