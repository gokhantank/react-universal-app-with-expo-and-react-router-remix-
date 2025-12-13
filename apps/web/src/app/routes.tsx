import { createBrowserRouter } from 'react-router';
import { Root } from './root';
import { Dashboard } from './routes/dashboard';
import { FactorAnalysis } from './routes/factor-analysis';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'factor-analysis',
        element: <FactorAnalysis />,
      },
    ],
  },
]);

