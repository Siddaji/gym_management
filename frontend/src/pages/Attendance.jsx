import React, { useState, useEffect } from 'react';
import MemberTable from '../components/MemberTable';

const Attendance = () => {
  const [members, setMembers] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/members');
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error loading attendance members:', error);
    } finally {
      setLoading(false);
    }
  };

  const logAttendance = (memberId) => {
    const today = new Date().toISOString().split('T')[0];
    setAttendanceRecords((prev) => ({
      ...prev,
      [memberId]: [...(prev[memberId] || []), today]
    }));
  };

  const getAttendanceCount = (memberId) => {
    return attendanceRecords[memberId]?.length || 0;
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Attendance Tracker</h2>
          <p className="text-gray-600 mt-2">Log daily check-ins and review member activity.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-5">Today's Check-ins</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {members.slice(0, 6).map((member) => (
            <div key={member.id} className="rounded-3xl border border-gray-100 p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.phone}</p>
                </div>
                <button
                  onClick={() => logAttendance(member.id)}
                  className="px-4 py-2 rounded-2xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
                >
                  Check-in
                </button>
              </div>
              <p className="mt-3 text-sm text-gray-500">Total check-ins: {getAttendanceCount(member.id)}</p>
            </div>
          ))}
        </div>
      </div>

      <MemberTable members={members} />
    </div>
  );
};

export default Attendance;

