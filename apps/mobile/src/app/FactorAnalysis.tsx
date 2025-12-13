import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { TEAMS, teamDataConfig, type Team } from '@heelix/shared/utils';

export function FactorAnalysis() {
  const [selectedTeam, setSelectedTeam] = useState<Team>('Engineering Product');
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);

  const teamData = teamDataConfig[selectedTeam];
  const factors = teamData.factorData;

  return (
    <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ padding: 16 }}>
      {/* Header */}
      <Text className="text-2xl font-bold text-gray-800 mb-5">Factor analysis</Text>

      {/* Filters */}
      <View className="flex-row gap-3 mb-6">
        <View className="relative">
          <TouchableOpacity
            className="bg-white py-2.5 px-4 rounded-md border border-gray-200 relative z-[101]"
            onPress={() => setShowTeamDropdown(!showTeamDropdown)}
          >
            <Text className="font-semibold text-gray-700 text-sm">{selectedTeam} ▼</Text>
          </TouchableOpacity>
          {showTeamDropdown && (
            <View className="absolute top-10 left-0 bg-white rounded-md border border-gray-200 z-[9999] min-w-[180px]">
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
        <TouchableOpacity className="bg-white py-2.5 px-4 rounded-md border border-gray-200">
          <Text className="font-semibold text-gray-700 text-sm">Last 30 days ▼</Text>
        </TouchableOpacity>
      </View>

      {/* Factor Grid */}
      <View className="flex-row flex-wrap gap-3">
        {factors.map((factor, index) => (
          <View key={index} className="w-[48%] bg-white rounded-lg p-3 mb-3">
            <View
              className="h-1 rounded-sm mb-2"
              style={{ backgroundColor: factor.color }}
            />
            <Text className="text-xs font-semibold text-gray-700 mb-1">{factor.name}</Text>
            <Text className="text-lg font-bold text-gray-800 mb-2">{factor.value}%</Text>
            <View className="h-1.5 bg-gray-200 rounded-sm overflow-hidden">
              <View
                className="h-full rounded-sm"
                style={{
                  width: `${factor.value}%`,
                  backgroundColor: factor.color,
                }}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
