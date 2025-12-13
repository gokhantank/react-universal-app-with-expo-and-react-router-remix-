import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@heelix/shared/query';
import { Navigation } from '../components/Navigation';
import { Dashboard } from './Dashboard';
import { FactorAnalysis } from './FactorAnalysis';

export default function App() {
  const [currentPath, setCurrentPath] = useState('/');

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const renderScreen = () => {
    switch (currentPath) {
      case '/factor-analysis':
        return <FactorAnalysis />;
      case '/':
      default:
        return <Dashboard />;
    }
  };

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Navigation currentPath={currentPath} onNavigate={handleNavigate} />
        {renderScreen()}
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
