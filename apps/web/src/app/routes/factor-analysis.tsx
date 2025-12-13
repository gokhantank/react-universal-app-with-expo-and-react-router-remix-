import { useState, useEffect } from 'react';
import { TEAMS, teamDataConfig, type Team } from '@heelix/shared/utils';

export function FactorAnalysis() {
  const [selectedTeam, setSelectedTeam] = useState<Team>('Engineering Product');
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);

  const teamData = teamDataConfig[selectedTeam];
  const factors = teamData.factorData;

  // Close dropdown when clicking outside
  useEffect(() => {
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
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-5">Factor analysis</h1>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <div className="relative team-dropdown-container">
            <button
              className="bg-white py-2.5 px-4 rounded-md border border-gray-200 relative z-[101] hover:bg-gray-50 transition-colors"
              onClick={() => setShowTeamDropdown(!showTeamDropdown)}
            >
              <span className="font-semibold text-gray-700 text-sm">{selectedTeam} ▼</span>
            </button>
            {showTeamDropdown && (
              <div className="absolute top-10 left-0 bg-white rounded-md border border-gray-200 z-[9999] min-w-[180px] shadow-lg">
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
          <button className="bg-white py-2.5 px-4 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
            <span className="font-semibold text-gray-700 text-sm">Last 30 days ▼</span>
          </button>
        </div>

        {/* Factor Grid */}
        <div className="flex flex-wrap gap-3">
          {factors.map((factor, index) => (
            <div key={index} className="w-[48%] bg-white rounded-lg p-3 mb-3">
              <div
                className="h-1 rounded-sm mb-2"
                style={{ backgroundColor: factor.color }}
              />
              <div className="text-xs font-semibold text-gray-700 mb-1">{factor.name}</div>
              <div className="text-lg font-bold text-gray-800 mb-2">{factor.value}%</div>
              <div className="h-1.5 bg-gray-200 rounded-sm overflow-hidden">
                <div
                  className="h-full rounded-sm"
                  style={{
                    width: `${factor.value}%`,
                    backgroundColor: factor.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
