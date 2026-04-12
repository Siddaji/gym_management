import React from 'react';

const Sidebar = ({ currentPage, setCurrentPage, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <div className={`
      fixed md:relative inset-y-0 left-0 z-50 w-64 bg-white shadow border-r border-gray-200 
      transform transition-transform duration-300
      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0
    `}>
      <div className="p-6 border-b border-gray-200 h-full flex flex-col">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">GymPro</h1>
            <p className="text-xs text-gray-500">Management</p>
          </div>
        </div>
        
        {/* Mobile Close Button */}
        <button
          className="md:hidden self-end p-1 -m-1 rounded-lg hover:bg-gray-100 mb-6"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => {
              setCurrentPage('dashboard');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center py-2 px-4 rounded-lg font-medium transition-colors ${
              currentPage === 'dashboard'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </button>
          <button
            onClick={() => {
              setCurrentPage('members');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center py-2 px-4 rounded-lg font-medium transition-colors ${
              currentPage === 'members'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Members
          </button>
          <button
            onClick={() => {
              setCurrentPage('attendance');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center py-2 px-4 rounded-lg font-medium transition-colors ${
              currentPage === 'attendance'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0H5a2 2 0 00-2 2v1a2 2 0 002 2h14a2 2 0 002-2v-1a2 2 0 00-2-2h-4" />
            </svg>
            Attendance
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

