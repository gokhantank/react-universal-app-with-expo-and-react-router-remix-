import React, { useState } from 'react';

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

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-[90%] max-w-[600px] max-h-[80vh] bg-white rounded-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 pb-3 px-5 pt-4 flex justify-between items-center">
          <div className="flex gap-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-gray-400'
                }`}
              >
                <span className="text-sm font-medium">{tab}</span>
              </button>
            ))}
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {/* Sub-tabs for media */}
          <div className="mb-6">
            <div className="text-xs font-semibold text-gray-400 uppercase mb-3">
              Media
            </div>
            <div className="flex gap-3 flex-wrap">
              {MEDIA_ICONS.map((media) => (
                <button
                  key={media.id}
                  onClick={() => setActiveMedia(media.id)}
                  className={`w-[18%] aspect-square rounded-lg flex items-center justify-center border transition-colors ${
                    activeMedia === media.id
                      ? 'bg-blue-500 border-blue-500'
                      : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-2xl">{media.icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sub-tabs for shoutout type */}
          <div className="mb-5">
            <div className="flex gap-2">
              {['Media', 'Shoutout', 'Poll', 'Suggest', 'Files'].map((tab) => (
                <button
                  key={tab}
                  className="px-3 py-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <span className="text-xs text-gray-600">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search users */}
          <input
            type="text"
            className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-800 mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for users here"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          />

          {/* Company values dropdown */}
          <button className="w-full border border-gray-200 rounded-md px-3 py-2.5 mb-4 text-left hover:bg-gray-50 transition-colors">
            <span className="text-sm text-gray-400">Select related company values</span>
          </button>

          {/* Impact text area */}
          <textarea
            className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-800 mb-4 bg-white min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What was the impact (in a few sentences)?"
            rows={4}
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
          />

          {/* User/Team selector */}
          <button className="w-full border border-gray-200 rounded-md px-3 py-2.5 mb-4 text-left hover:bg-gray-50 transition-colors">
            <span className="text-sm text-gray-400">Select a user/team first</span>
          </button>

          {/* Submit button */}
          <button
            className="w-full bg-blue-500 py-3 rounded-md text-white font-semibold text-sm hover:bg-blue-600 transition-colors mt-3"
            onClick={handleSubmit}
          >
            Give shoutout
          </button>
        </div>
      </div>
    </div>
  );
}


