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
 * Hook for managing members with backend API persistence
 */
export const useMembers = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load members on mount
  useEffect(() => {
    const loadMembers = async () => {
      try {
        const stored = await getMembers();
        setMembers(stored);
      } catch (error) {
        console.error('Failed to load members:', error);
        setMembers([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadMembers();
  }, []);

  const addMember = useCallback(async (memberData) => {
    try {
      const newMember = await addMemberToStorage(memberData);
      if (newMember) {
        setMembers(prev => [...prev, newMember]);
        return newMember;
      }
      return null;
    } catch (error) {
      console.error('Failed to add member:', error);
      return null;
    }
  }, []);

  const deleteMember = useCallback(async (memberId) => {
    try {
      const success = await deleteMemberFromStorage(memberId);
      if (success) {
        setMembers(prev => prev.filter(m => m._id !== memberId));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to delete member:', error);
      return false;
    }
  }, []);

  const updateMember = useCallback(async (memberId, updates) => {
    try {
      const success = await updateMemberInStorage(memberId, updates);
      if (success) {
        setMembers(prev =>
          prev.map(m => m._id === memberId ? { ...m, ...updates } : m)
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to update member:', error);
      return false;
    }
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
    const loadStats = async () => {
      try {
        const calculated = await calculateStats();
        setStats(calculated);
      } catch (error) {
        console.error('Failed to calculate stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, []);

  const refresh = useCallback(async () => {
    try {
      const calculated = await calculateStats();
      setStats(calculated);
    } catch (error) {
      console.error('Failed to refresh stats:', error);
    }
  }, []);

  return {
    stats,
    isLoading,
    refresh,
  };
};
