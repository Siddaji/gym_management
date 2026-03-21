import React, { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    newThisWeek: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('https://gym-management-1-ja9o.onrender.com/members');
      const members = await response.json();
      
      const total = members.length;
      const active = members.filter(member => {
        const expiry = new Date(member.expiryDate);
        return expiry >= new Date();
      }).length;
      const expired = total - active;
      
const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const newThisWeek = members.filter(member => new Date(member.joinDate) >= oneWeekAgo).length;
      
      setStats({ total, active, expired, newThisWeek });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your gym.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Members" value={stats.total} color="blue" />
        <StatsCard title="Active Members" value={stats.active} color="green" />
        <StatsCard title="Expired Members" value={stats.expired} color="red" />
        <StatsCard title="New This Week" value={stats.newThisWeek} color="yellow" />
      </div>

      {/* Mock Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Trends</h3>
        <div className="h-64 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="w-32 h-32 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="font-medium text-gray-900">Growth Chart</p>
            <p className="text-sm">12% increase last month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
