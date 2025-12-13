import { Outlet } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@heelix/shared/query';
import { Navigation } from '../components/Navigation';

export function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

