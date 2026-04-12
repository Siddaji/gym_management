
const STORAGE_KEYS = {
  MEMBERS: 'gym_members',
  ATTENDANCE: 'gym_attendance',
};

const DEFAULT_STATE = {
  members: [],
  attendance: {},
};

/**
 * Get all members from localStorage
 * Returns empty array if no data exists
 */
export const getMembers = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.MEMBERS);
    return stored ? JSON.parse(stored) : DEFAULT_STATE.members;
  } catch (error) {
    console.error('Error reading members from storage:', error);
    return DEFAULT_STATE.members;
  }
};

/**
 * Save members to localStorage
 */
export const saveMembers = (members) => {
  try {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members || []));
  } catch (error) {
    console.error('Error saving members to storage:', error);
  }
};

/**
 * Add a new member to localStorage
 */
export const addMember = (member) => {
  try {
    const members = getMembers();
    const newMember = {
      ...member,
      id: member.id || Date.now(),
    };
    const updated = [...members, newMember];
    saveMembers(updated);
    return newMember;
  } catch (error) {
    console.error('Error adding member:', error);
    return null;
  }
};

/**
 * Delete a member from localStorage
 */
export const deleteMember = (memberId) => {
  try {
    const members = getMembers();
    const updated = members.filter(m => m.id !== memberId);
    saveMembers(updated);
    return true;
  } catch (error) {
    console.error('Error deleting member:', error);
    return false;
  }
};

/**
 * Update a member in localStorage
 */
export const updateMember = (memberId, updates) => {
  try {
    const members = getMembers();
    const updated = members.map(m =>
      m.id === memberId ? { ...m, ...updates } : m
    );
    saveMembers(updated);
    return true;
  } catch (error) {
    console.error('Error updating member:', error);
    return false;
  }
};

/**
 * Get all attendance records from localStorage
 * Returns empty object if no data exists
 */
export const getAttendance = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    return stored ? JSON.parse(stored) : DEFAULT_STATE.attendance;
  } catch (error) {
    console.error('Error reading attendance from storage:', error);
    return DEFAULT_STATE.attendance;
  }
};

/**
 * Save attendance records to localStorage
 */
export const saveAttendance = (attendance) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance || {}));
  } catch (error) {
    console.error('Error saving attendance to storage:', error);
  }
};

/**
 * Log attendance for a member on a specific date
 */
export const logAttendance = (memberId, date = new Date().toISOString().split('T')[0]) => {
  try {
    const attendance = getAttendance();
    const memberRecords = attendance[memberId] || [];
    
    // Avoid duplicate entries for the same date
    if (!memberRecords.includes(date)) {
      memberRecords.push(date);
      attendance[memberId] = memberRecords;
      saveAttendance(attendance);
    }
    return true;
  } catch (error) {
    console.error('Error logging attendance:', error);
    return false;
  }
};

/**
 * Get attendance count for a member
 */
export const getAttendanceCount = (memberId) => {
  try {
    const attendance = getAttendance();
    return (attendance[memberId] || []).length;
  } catch (error) {
    console.error('Error getting attendance count:', error);
    return 0;
  }
};

/**
 * Get today's attendance count
 */
export const getTodayAttendance = () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const attendance = getAttendance();
    let count = 0;
    Object.values(attendance).forEach(dates => {
      if (dates.includes(today)) count++;
    });
    return count;
  } catch (error) {
    console.error('Error getting today\'s attendance:', error);
    return 0;
  }
};

/**
 * Calculate dashboard stats from stored data
 */
export const calculateStats = () => {
  try {
    const members = getMembers();
    const today = new Date();
    
    const total = members.length;
    const active = members.filter(member => {
      const expiry = new Date(member.expiryDate);
      return !Number.isNaN(expiry.getTime()) && expiry >= today;
    }).length;
    const expired = total - active;
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newThisWeek = members.filter(member => {
      const joinDate = new Date(member.joinDate);
      return !Number.isNaN(joinDate.getTime()) && joinDate >= oneWeekAgo;
    }).length;
    
    const todayAttendance = getTodayAttendance();
    
    return {
      total: total || 0,
      active: active || 0,
      expired: expired || 0,
      newThisWeek: newThisWeek || 0,
      todayAttendance: todayAttendance || 0,
    };
  } catch (error) {
    console.error('Error calculating stats:', error);
    return {
      total: 0,
      active: 0,
      expired: 0,
      newThisWeek: 0,
      todayAttendance: 0,
    };
  }
};

/**
 * Clear all stored data (for testing/reset)
 */
export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.MEMBERS);
    localStorage.removeItem(STORAGE_KEYS.ATTENDANCE);
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};
