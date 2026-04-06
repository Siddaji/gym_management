import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Attendance from './pages/Attendance';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pageKey, setPageKey] = useState(0); // for smooth transitions

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const changePage = (page) => {
    setPageKey(prev => prev + 1);
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 md:flex">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-xl border hover:shadow-2xl transition-all duration-300"
        onClick={toggleMobileMenu}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={changePage}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-500 ${isMobileMenuOpen ? 'ml-0' : ''}`}>
        <div className="p-4 md:p-8 relative min-h-screen">
          <div className="animate-page-transition" key={pageKey}>
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'members' && <Members />}
            {currentPage === 'attendance' && <Attendance />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

