import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NavigationProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export function Navigation({ currentPath = '/', onNavigate }: NavigationProps) {
  const insets = useSafeAreaInsets();

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <View
      className="bg-white border-b border-gray-200 py-3 px-4 flex-row justify-between items-center"
      style={{ paddingTop: insets.top + 12 }}
    >
      <View className="flex-row items-center gap-2">
        <View className="w-8 h-8 bg-blue-500 rounded-lg items-center justify-center">
          <Text className="text-white font-bold text-lg">h</Text>
        </View>
        <Text className="text-lg font-bold text-gray-900">heelix</Text>
      </View>

      <View className="flex-row gap-6">
        <TouchableOpacity onPress={() => handleNavigate('/')}>
          <Text
            className={`font-semibold text-sm ${
              isActive('/') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            Dashboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('/factor-analysis')}>
          <Text
            className={`font-semibold text-sm ${
              isActive('/factor-analysis') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            Factor analysis
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

