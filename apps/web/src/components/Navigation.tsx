import React from 'react';
import { Link, useLocation } from 'react-router';

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">h</span>
          </div>
          <span className="text-xl font-bold text-gray-900">heelix</span>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-8">
          <Link
            to="/"
            className={`font-medium transition-colors ${
              isActive('/')
                ? 'text-blue-600'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/factor-analysis"
            className={`font-medium transition-colors ${
              isActive('/factor-analysis')
                ? 'text-blue-600'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Factor analysis
          </Link>
        </div>
      </div>
    </nav>
  );
}

