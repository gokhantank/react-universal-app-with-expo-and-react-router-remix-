import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TakeActionModalProps {
  visible: boolean;
  onClose: () => void;
}

const MEDIA_ICONS = [
  { id: 'photo', icon: '📷', label: 'Photo' },
  { id: 'shoutout', icon: '⭐', label: 'Shoutout' },
  { id: 'poll', icon: '📋', label: 'Poll' },
  { id: 'suggest', icon: '🎤', label: 'Suggest' },
  { id: 'files', icon: '📝', label: 'Files' },
];

const TABS = ['Vibe', 'Connect', 'Perform'];

export function TakeActionModal({ visible, onClose }: TakeActionModalProps) {
  const [activeTab, setActiveTab] = useState('Vibe');
  const [activeMedia, setActiveMedia] = useState('shoutout');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [companyValues, setCompanyValues] = useState<string>('');
  const [impact, setImpact] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<string>('');

  const isWeb = Platform.OS === 'web';
  const insets = useSafeAreaInsets();

  const handleSubmit = () => {
    console.log({
      tab: activeTab,
      media: activeMedia,
      user: selectedUser,
      companyValues,
      impact,
      team: selectedTeam,
    });
    onClose();
  };

  const content = (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="border-b border-gray-200 pb-3 px-5 pt-4 flex-row justify-between items-center" style={{ paddingTop: insets.top + 16 }}>
        <View className="flex-row gap-6">
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`pb-2 border-b-2 ${
                activeTab === tab
                  ? 'border-blue-500'
                  : 'border-transparent'
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  activeTab === tab ? 'text-blue-500' : 'text-gray-400'
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={onClose} className="p-1">
          <Text className="text-xl text-gray-400">✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
        {/* Sub-tabs for media */}
        <View className="mb-6">
          <Text className="text-xs font-semibold text-gray-400 uppercase mb-3">
            Media
          </Text>
          <View className="flex-row gap-3 flex-wrap">
            {MEDIA_ICONS.map((media) => (
              <TouchableOpacity
                key={media.id}
                onPress={() => setActiveMedia(media.id)}
                className={`w-[18%] aspect-square bg-gray-100 rounded-lg justify-center items-center border ${
                  activeMedia === media.id
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-200'
                }`}
              >
                <Text className="text-2xl">{media.icon}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sub-tabs for shoutout type */}
        <View className="mb-5">
          <View className="flex-row gap-2">
            {['Media', 'Shoutout', 'Poll', 'Suggest', 'Files'].map((tab) => (
              <TouchableOpacity key={tab} className="px-3 py-1.5 bg-gray-100 rounded-md">
                <Text className="text-xs text-gray-600">{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search users */}
        <TextInput
          className="border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-800 mb-4 bg-white"
          placeholder="Search for users here"
          placeholderTextColor="#9CA3AF"
          value={selectedUser}
          onChangeText={setSelectedUser}
        />

        {/* Company values dropdown */}
        <TouchableOpacity className="border border-gray-200 rounded-md px-3 py-2.5 mb-4 justify-center">
          <Text className="text-sm text-gray-400">Select related company values</Text>
        </TouchableOpacity>

        {/* Impact text area */}
        <TextInput
          className="border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-800 mb-4 bg-white min-h-[100px]"
          placeholder="What was the impact (in a few sentences)?"
          placeholderTextColor="#D1D5DB"
          multiline
          numberOfLines={4}
          value={impact}
          onChangeText={setImpact}
          textAlignVertical="top"
        />

        {/* User/Team selector */}
        <TouchableOpacity className="border border-gray-200 rounded-md px-3 py-2.5 mb-4 justify-center">
          <Text className="text-sm text-gray-400">Select a user/team first</Text>
        </TouchableOpacity>

        {/* Submit button */}
        <TouchableOpacity
          className="bg-blue-500 py-3 rounded-md items-center mt-3"
          onPress={handleSubmit}
        >
          <Text className="text-white font-semibold text-sm">Give shoutout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  if (isWeb) {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-[90%] max-w-[600px] max-h-[80vh] bg-white rounded-xl overflow-hidden flex-col">
            {content}
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {content}
    </Modal>
  );
}

