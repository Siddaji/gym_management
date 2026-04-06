import React, { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    newThisWeek: 0
  });
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/members');
      const data = await response.json();
      setMembers(data);
      
      const total = data.length;
      const active = data.filter(member => {
        const expiry = new Date(member.expiryDate);
        return expiry >= new Date();
      }).length;
      const expired = total - active;
      
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const newThisWeek = data.filter(member => new Date(member.joinDate) >= oneWeekAgo).length;
      
      setStats({ total, active, expired, newThisWeek });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate trend data for chart
  const getTrendData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(() => Math.floor(Math.random() * 100) + 50);
  };

  return (
    <div className="p-4 lg:p-8 space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent drop-shadow-lg">
            Dashboard
          </h2>
          <p className="text-xl text-gray-600 mt-2 font-medium">Welcome back! Here's what's happening with your gym today.</p>
        </div>
        <div className="text-right">
          <p className="text-lg text-gray-500 font-mono">Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Members" value={stats.total} trend="+12%" color="blue" isLoading={loading} />
        <StatsCard title="Active Members" value={stats.active} trend="+8%" color="green" isLoading={loading} />
        <StatsCard title="Expired Members" value={stats.expired} trend="-3%" color="red" isLoading={loading} />
        <StatsCard title="New This Week" value={stats.newThisWeek} trend="+25%" color="yellow" isLoading={loading} />
      </div>

      {/* Enhanced Trends Chart */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Membership Trends</h3>
            <p className="text-gray-600 font-medium">Monthly active members growth</p>
          </div>
          <div className="flex gap-2 text-sm">
            <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-xl font-medium hover:bg-blue-200 transition-all">This Month</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all">YTD</button>
          </div>
        </div>
        <div className="h-80 lg:h-96 bg-gradient-to-r from-gradient-start to-blue-500/5 rounded-2xl p-8 border border-blue-100 overflow-hidden relative">
          <div className="relative h-full flex items-center justify-center">
            {/* CSS Bar Chart */}
            <div className="flex items-end justify-around w-full h-48 space-x-2">
              {getTrendData().map((value, index) => (
                <div key={index} className="flex-1 bg-gradient-to-t from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-[1.05] mx-1" style={{ height: `${(value / 150) * 100}%` }}>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white drop-shadow-md whitespace-nowrap">{value}</div>
                </div>
              ))}
            </div>
            <div className="absolute top-4 right-4 text-right">
              <p className="font-bold text-3xl text-blue-600 drop-shadow-lg">↑ 18%</p>
              <p className="text-sm text-blue-600 font-medium">vs last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Quick View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Today's Attendance</h3>
          <div className="space-y-3">
            {loading ? (
              <div className="h-32 shimmer rounded-2xl animate-pulse" />
            ) : (
              members.slice(0, 5).map(member => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.phone}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Present</span>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl shadow-2xl border border-orange-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 text-left group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Add Member</p>
                    <p className="text-gray-600">New registration</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            <button className="w-full p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 text-left group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Export Report</p>
                    <p className="text-gray-600">Download data</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
