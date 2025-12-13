import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { TEAMS, teamDataConfig, type Team } from '@heelix/shared/utils';
import { TakeActionModal } from '../components/TakeActionModal';

// Reusable Components
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <View className={`bg-white rounded-xl p-6 shadow-sm ${className}`}>
    {children}
  </View>
);

const Gauge = ({ score }: { score: number }) => {
  // Calculate rotation angle based on score (-100 to 100 maps to -180deg to 0deg)
  const rotation = ((score + 100) / 200) * 180 - 90;
  const normalizedRotation = Math.max(-90, Math.min(90, rotation));

  return (
    <View className="flex-col items-center mt-5">
      <View className="w-[180px] h-[90px] rounded-t-[90px] border-[25px] border-gray-200 border-b-0 overflow-hidden relative">
        <View
          className="w-1 h-[60px] bg-gray-700 absolute bottom-0 left-1/2"
          style={{
            transform: [{ rotate: `${normalizedRotation}deg` }],
            transformOrigin: 'bottom',
          }}
        />
      </View>
      <View className="flex-col items-center -mt-8">
        <Text className="text-5xl font-bold text-gray-700">{score}</Text>
        <Text className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
          VIBE SCORE
        </Text>
      </View>
      <View className="flex-row justify-between w-[200px] mt-2.5">
        <Text className="text-xl">☹️</Text>
        <Text className="text-xl">😃</Text>
      </View>
    </View>
  );
};

const ProgressBar = ({ label, value, color }: { label: string; value: number; color: string }) => {
  // Normalize value from -100 to 100 range to 0-100% for display
  const normalizedValue = ((value + 100) / 200) * 100;

  return (
    <View className="mb-2.5">
      <View className="flex-row justify-between mb-1.5">
        <Text className="font-semibold text-gray-700">{label} (?)</Text>
      </View>
      <View className="h-2 bg-gray-100 rounded relative">
        <View
          className="h-full rounded"
          style={{ width: `${normalizedValue}%`, backgroundColor: color }}
        />
        <View
          className="absolute -top-1 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-600"
          style={{ left: `${normalizedValue}%`, marginLeft: -5 }}
        />
      </View>
      <View className="flex-row justify-between mt-1">
        <Text className="text-[10px] text-gray-400">-100</Text>
        <Text className="text-[10px] text-gray-400">100</Text>
      </View>
    </View>
  );
};

export function Dashboard() {
  const [selectedTeam, setSelectedTeam] = useState<Team>('Engineering Product');
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [showTakeActionModal, setShowTakeActionModal] = useState(false);

  const teamData = teamDataConfig[selectedTeam];
  const { width } = Dimensions.get('window');
  const isLargeScreen = width > 800;

  return (
    <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ padding: 24, paddingBottom: 50 }}>
      {/* HEADER */}
      <View className="flex-row justify-between items-center mb-6">
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold text-gray-800 mr-2.5">Insights dashboard</Text>
        </View>
        <TouchableOpacity
          className="bg-blue-600 py-2 px-4 rounded-md"
          onPress={() => setShowTakeActionModal(true)}
        >
          <Text className="text-white font-semibold">Take action</Text>
        </TouchableOpacity>
      </View>

      {/* FILTERS */}
      <View className="flex-row mb-6 gap-3 relative z-[100]">
        <View className="relative">
          <TouchableOpacity
            className="bg-white p-2.5 rounded-md border border-gray-200 relative z-[101]"
            onPress={() => setShowTeamDropdown(!showTeamDropdown)}
          >
            <Text className="font-semibold text-gray-700">{selectedTeam} ▼</Text>
          </TouchableOpacity>
          {showTeamDropdown && (
            <View className="absolute top-10 left-0 bg-white rounded-md border border-gray-200 z-[9999] min-w-[150px]">
              {TEAMS.map((team) => (
                <TouchableOpacity
                  key={team}
                  className="p-2.5 border-b border-gray-200"
                  onPress={() => {
                    setSelectedTeam(team);
                    setShowTeamDropdown(false);
                  }}
                >
                  <Text className="text-gray-700 text-sm">{team}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View className="p-2.5">
          <Text className="text-gray-500">Last 30 days ▼</Text>
        </View>
      </View>

      {/* TOP SECTION: GAUGE & CHART */}
      <View className={`gap-5 mb-6 ${isLargeScreen ? 'flex-row' : 'flex-col'}`}>
        {/* Left: Vibe Score */}
        <Card className="flex-1 items-center min-h-[250px]">
          <Gauge score={teamData.vibeScore} />
        </Card>

        {/* Right: Score History */}
        <Card className={`min-h-[250px] ${isLargeScreen ? 'flex-[2]' : 'flex-1'}`}>
          <View className="flex-row justify-between mb-5">
            <Text className="text-base font-semibold text-gray-700">Score history</Text>
            <Text className="text-xs text-gray-400">Last 9 months</Text>
          </View>
          <View className="h-[150px] border-l border-b border-gray-300 relative">
            <View className="absolute w-full top-1/2 h-0.5 bg-gray-200" />
            <View className="absolute w-2 h-2 rounded-full bg-blue-500 left-[10%] top-[60%] -ml-1 -mt-1" />
            <View className="absolute w-2 h-2 rounded-full bg-blue-500 left-[30%] top-[40%] -ml-1 -mt-1" />
            <View className="absolute w-2 h-2 rounded-full bg-blue-500 left-[50%] top-[70%] -ml-1 -mt-1" />
            <View className="absolute w-2 h-2 rounded-full bg-blue-500 left-[70%] top-[30%] -ml-1 -mt-1" />
            <View className="absolute w-2 h-2 rounded-full bg-blue-500 left-[90%] top-[50%] -ml-1 -mt-1" />
          </View>
        </Card>
      </View>

      {/* MIDDLE SECTION: KPIS */}
      <View className="flex-row flex-wrap justify-around bg-white p-6 rounded-xl mb-8">
        <View className="items-center p-2.5 w-[140px]">
          <Text className="text-3xl mb-1.5">☹️</Text>
          <Text className="text-center text-gray-600">Your overall team Vibe is</Text>
          <Text className="text-center font-bold text-gray-800">{teamData.overallVibe}</Text>
        </View>

        <View className="items-center p-2.5 w-[140px]">
          <View className="w-[60px] h-[60px] rounded-full border-[6px] border-yellow-400 items-center justify-center mb-2">
            <Text className="font-bold">{teamData.participation}%</Text>
          </View>
          <Text className="text-xs text-gray-500 text-center">Participation</Text>
        </View>

        <View className="items-center p-2.5 w-[140px]">
          <View className="w-[60px] h-[60px] rounded-full border-[6px] border-blue-500 items-center justify-center mb-2">
            <Text className="font-bold">{teamData.monthlyActiveUsers}%</Text>
          </View>
          <Text className="text-xs text-gray-500 text-center">Monthly active users</Text>
        </View>

        <View className="items-center p-2.5 w-[140px]">
          <View className="w-10 h-10 rounded-full bg-blue-500 items-center justify-center mb-2">
            <Text className="text-white">👥</Text>
          </View>
          <Text className="text-blue-600 text-xs font-medium">View team details</Text>
        </View>
      </View>

      {/* BOTTOM SECTION: METRICS */}
      <Text className="text-lg font-bold text-gray-700 mb-4">Key performance metrics</Text>
      <View className="flex-row flex-wrap justify-between">
        {teamData.kpiData.map((kpi) => (
          <View key={kpi.label} className={isLargeScreen ? 'w-[48%] mb-4' : 'w-full mb-4'}>
            <ProgressBar {...kpi} />
          </View>
        ))}
      </View>

      <TakeActionModal
        visible={showTakeActionModal}
        onClose={() => setShowTakeActionModal(false)}
      />
    </ScrollView>
  );
}

