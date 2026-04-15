import React, { useEffect } from 'react';
import StatsCard from '../components/StatsCard';
import { useStats, useMembers } from '../hooks/useStorage';

const Dashboard = () => {
  const { stats, isLoading, refresh } = useStats();
  const { members } = useMembers();

  // Refresh stats when members change
  useEffect(() => {
    refresh();
  }, [members, refresh]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your gym operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Members" value={stats.total} color="blue" isLoading={isLoading} />
        <StatsCard title="Active Members" value={stats.active} color="green" isLoading={isLoading} />
        <StatsCard title="Expired Members" value={stats.expired} color="red" isLoading={isLoading} />
        <StatsCard title="Today's Attendance" value={stats.todayAttendance} color="yellow" isLoading={isLoading} />
      </div>
      {/* Recent Members */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Members</h2>
        {members.length === 0 ? (
          <p className="text-gray-500">No members added yet.</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {members.slice(0, 5).map((member) => (
              <div key={member._id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.phone}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600">Plan: {member.plan}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
