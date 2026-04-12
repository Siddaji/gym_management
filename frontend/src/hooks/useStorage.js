import { useState, useCallback, useEffect } from 'react';
import {
  getMembers,
  saveMembers,
  addMember as addMemberToStorage,
  deleteMember as deleteMemberFromStorage,
  updateMember as updateMemberInStorage,
  getAttendance,
  saveAttendance,
  logAttendance as logAttendanceToStorage,
  getAttendanceCount,
  getTodayAttendance,
  calculateStats,
} from '../utils/storage';

/**
 * Hook for managing members with localStorage persistence
 */
export const useMembers = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load members on mount
  useEffect(() => {
    const loadMembers = () => {
      const stored = getMembers();
      setMembers(stored);
      setIsLoading(false);
    };
    loadMembers();
  }, []);

  const addMember = useCallback((memberData) => {
    const newMember = addMemberToStorage(memberData);
    if (newMember) {
      setMembers(prev => [...prev, newMember]);
      return newMember;
    }
    return null;
  }, []);

  const deleteMember = useCallback((memberId) => {
    if (deleteMemberFromStorage(memberId)) {
      setMembers(prev => prev.filter(m => m.id !== memberId));
      return true;
    }
    return false;
  }, []);

  const updateMember = useCallback((memberId, updates) => {
    if (updateMemberInStorage(memberId, updates)) {
      setMembers(prev =>
        prev.map(m => m.id === memberId ? { ...m, ...updates } : m)
      );
      return true;
    }
    return false;
  }, []);

  return {
    members,
    isLoading,
    addMember,
    deleteMember,
    updateMember,
  };
};

/**
 * Hook for managing attendance with localStorage persistence
 */
export const useAttendance = () => {
  const [attendance, setAttendance] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load attendance on mount
  useEffect(() => {
    const loadAttendance = () => {
      const stored = getAttendance();
      setAttendance(stored);
      setIsLoading(false);
    };
    loadAttendance();
  }, []);

  const logAttendance = useCallback((memberId) => {
    if (logAttendanceToStorage(memberId)) {
      const updated = getAttendance();
      setAttendance(updated);
      return true;
    }
    return false;
  }, []);

  const getCount = useCallback((memberId) => {
    return getAttendanceCount(memberId);
  }, []);

  const getTodayCount = useCallback(() => {
    return getTodayAttendance();
  }, []);

  return {
    attendance,
    isLoading,
    logAttendance,
    getCount,
    getTodayCount,
  };
};

/**
 * Hook for getting dashboard statistics
 */
export const useStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    newThisWeek: 0,
    todayAttendance: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = () => {
      const calculated = calculateStats();
      setStats(calculated);
      setIsLoading(false);
    };
    loadStats();
  }, []);

  const refresh = useCallback(() => {
    const calculated = calculateStats();
    setStats(calculated);
  }, []);

  return {
    stats,
    isLoading,
    refresh,
  };
};
