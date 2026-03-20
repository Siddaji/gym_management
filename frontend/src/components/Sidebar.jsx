import React from 'react';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">GymPro</h1>
        <p className="text-sm text-gray-500 mt-1">Management Dashboard</p>
      </div>
      <nav className="mt-8 px-4">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className={`w-full flex items-center py-3 px-4 rounded-lg mb-3 font-medium transition-all ${
            currentPage === 'dashboard'
              ? 'bg-primary-600 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </button>
        <button
          onClick={() => setCurrentPage('members')}
          className={`w-full flex items-center py-3 px-4 rounded-lg mb-3 font-medium transition-all ${
            currentPage === 'members'
              ? 'bg-primary-600 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Members
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
