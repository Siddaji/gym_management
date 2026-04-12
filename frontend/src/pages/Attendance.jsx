import React from 'react';
import { useMembers } from '../hooks/useStorage';
import { useAttendance } from '../hooks/useStorage';

const Attendance = () => {
  const { members, isLoading: membersLoading } = useMembers();
  const { logAttendance, getCount, getTodayCount } = useAttendance();

  const todayAttendance = getTodayCount();
  const isLoading = membersLoading;

  const handleCheckIn = (memberId) => {
    logAttendance(memberId);
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-600 mt-2">Track daily check-ins</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Check-ins: {todayAttendance}</h2>
        
        {members.length === 0 ? (
          <p className="text-gray-500">No members added yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.phone}</p>
                  </div>
                  <button
                    onClick={() => handleCheckIn(member.id)}
                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors"
                  >
                    Check-in
                  </button>
                </div>
                <p className="text-sm text-gray-600">Total check-ins: {getCount(member.id)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;

