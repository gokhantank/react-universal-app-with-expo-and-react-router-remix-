import React, { useState } from 'react';
import { TEAMS, teamDataConfig, type Team } from '@heelix/shared/utils';
import { TakeActionModal } from '../../components/TakeActionModal';

// Move below to shared/components/Card.tsx
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl p-6 shadow-sm ${className}`}>
    {children}
  </div>
);

// Move below to shared/components/Gauge.tsx
const Gauge = ({ score }: { score: number }) => {
  // Calculate rotation angle based on score (-100 to 100 maps to -180deg to 0deg)
  const rotation = ((score + 100) / 200) * 180 - 90;
  const normalizedRotation = Math.max(-90, Math.min(90, rotation));

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="relative w-[180px] h-[90px] rounded-t-[90px] border-[25px] border-gray-200 border-b-0 overflow-hidden">
        <div
          className="absolute bottom-0 left-1/2 w-1 h-[60px] bg-gray-700 origin-bottom"
          style={{
            transform: `translateX(-50%) rotate(${normalizedRotation}deg)`,
          }}
        />
      </div>
      <div className="flex flex-col items-center -mt-8">
        <div className="text-5xl font-bold text-gray-700">{score}</div>
        <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
          VIBE SCORE
        </div>
      </div>
      <div className="flex justify-between w-[200px] mt-2.5">
        <span className="text-xl">☹️</span>
        <span className="text-xl">😃</span>
      </div>
    </div>
  );
};

// Move below to shared/components/ProgressBar.tsx
const ProgressBar = ({ label, value, color }: { label: string; value: number; color: string }) => {
  // Normalize value from -100 to 100 range to 0-100% for display
  const normalizedValue = ((value + 100) / 200) * 100;

  return (
    <div className="mb-2.5">
      <div className="flex justify-between mb-1.5">
        <span className="font-semibold text-gray-700">{label} (?)</span>
      </div>
      <div className="relative h-2 bg-gray-100 rounded">
        <div
          className="h-full rounded"
          style={{ width: `${normalizedValue}%`, backgroundColor: color }}
        />
        <div
          className="absolute -top-1 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-600"
          style={{ left: `${normalizedValue}%`, marginLeft: '-5px' }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-gray-400">-100</span>
        <span className="text-[10px] text-gray-400">100</span>
      </div>
    </div>
  );
};

export function Dashboard() {
  const [selectedTeam, setSelectedTeam] = useState<Team>('Engineering Product');
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [showTakeActionModal, setShowTakeActionModal] = useState(false);

  const teamData = teamDataConfig[selectedTeam];
  const isLargeScreen = typeof window !== 'undefined' && window.innerWidth > 800;

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.team-dropdown-container')) {
        setShowTeamDropdown(false);
      }
    };

    if (showTeamDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
    return undefined;
  }, [showTeamDropdown]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-6 pb-12">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800 mr-2.5">Insights dashboard</h1>
          </div>
          <button
            className="bg-blue-600 py-2 px-4 rounded-md text-white font-semibold hover:bg-blue-700 transition-colors"
            onClick={() => setShowTakeActionModal(true)}
          >
            Take action
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex mb-6 gap-3 relative z-[100]">
          <div className="relative team-dropdown-container">
            <button
              className="bg-white p-2.5 rounded-md border border-gray-200 relative z-[101] hover:bg-gray-50 transition-colors"
              onClick={() => setShowTeamDropdown(!showTeamDropdown)}
            >
              <span className="font-semibold text-gray-700">{selectedTeam} ▼</span>
            </button>
            {showTeamDropdown && (
              <div className="absolute top-10 left-0 bg-white rounded-md border border-gray-200 z-[9999] min-w-[150px] shadow-lg">
                {TEAMS.map((team) => (
                  <button
                    key={team}
                    className="w-full p-2.5 border-b border-gray-200 text-left hover:bg-gray-50 transition-colors last:border-b-0"
                    onClick={() => {
                      setSelectedTeam(team);
                      setShowTeamDropdown(false);
                    }}
                  >
                    <span className="text-gray-700 text-sm">{team}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="p-2.5">
            <span className="text-gray-500">Last 30 days ▼</span>
          </div>
        </div>

        {/* TOP SECTION: GAUGE & CHART */}
        <div className={`gap-5 mb-6 ${isLargeScreen ? 'flex flex-row' : 'flex flex-col'}`}>
          {/* Left: Vibe Score */}
          <Card className="flex-1 flex items-center min-h-[250px]">
            <Gauge score={teamData.vibeScore} />
          </Card>

          {/* Right: Score History */}
          <Card className={`min-h-[250px] ${isLargeScreen ? 'flex-[2]' : 'flex-1'}`}>
            <div className="flex justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-700">Score history</h2>
              <span className="text-xs text-gray-400">Last 9 months</span>
            </div>
            <div className="relative h-[150px] border-l border-b border-gray-300">
              <div className="absolute w-full top-1/2 h-0.5 bg-gray-200" />
              <div className="absolute w-2 h-2 rounded-full bg-blue-500 left-[10%] top-[60%] -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute w-2 h-2 rounded-full bg-blue-500 left-[30%] top-[40%] -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute w-2 h-2 rounded-full bg-blue-500 left-[50%] top-[70%] -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute w-2 h-2 rounded-full bg-blue-500 left-[70%] top-[30%] -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute w-2 h-2 rounded-full bg-blue-500 left-[90%] top-[50%] -translate-x-1/2 -translate-y-1/2" />
            </div>
          </Card>
        </div>

        {/* MIDDLE SECTION: KPIS */}
        <div className="flex flex-wrap justify-around bg-white p-6 rounded-xl mb-8">
          <div className="flex flex-col items-center p-2.5 w-[140px]">
            <span className="text-3xl mb-1.5">☹️</span>
            <p className="text-center text-gray-600">Your overall team Vibe is</p>
            <p className="text-center font-bold text-gray-800">{teamData.overallVibe}</p>
          </div>

          <div className="flex flex-col items-center p-2.5 w-[140px]">
            <div className="w-[60px] h-[60px] rounded-full border-[6px] border-yellow-400 flex items-center justify-center mb-2">
              <span className="font-bold">{teamData.participation}%</span>
            </div>
            <span className="text-xs text-gray-500 text-center">Participation</span>
          </div>

          <div className="flex flex-col items-center p-2.5 w-[140px]">
            <div className="w-[60px] h-[60px] rounded-full border-[6px] border-blue-500 flex items-center justify-center mb-2">
              <span className="font-bold">{teamData.monthlyActiveUsers}%</span>
            </div>
            <span className="text-xs text-gray-500 text-center">Monthly active users</span>
          </div>

          <div className="flex flex-col items-center p-2.5 w-[140px]">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-2">
              <span className="text-white">👥</span>
            </div>
            <span className="text-blue-600 text-xs font-medium">View team details</span>
          </div>
        </div>

        {/* BOTTOM SECTION: METRICS */}
        <h2 className="text-lg font-bold text-gray-700 mb-4">Key performance metrics</h2>
        <div className="flex flex-wrap justify-between">
          {teamData.kpiData.map((kpi) => (
            <div key={kpi.label} className={isLargeScreen ? 'w-[48%] mb-4' : 'w-full mb-4'}>
              <ProgressBar {...kpi} />
            </div>
          ))}
        </div>
      </div>

      <TakeActionModal
        visible={showTakeActionModal}
        onClose={() => setShowTakeActionModal(false)}
      />
    </div>
  );
}
