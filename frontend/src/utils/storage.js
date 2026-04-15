
const STORAGE_KEYS = {
  MEMBERS: 'gym_members',
  ATTENDANCE: 'gym_attendance',
};

const DEFAULT_STATE = {
  members: [],
  attendance: {},
};

const API_BASE_URL = 'http://localhost:3001';

// ============= MEMBERS API CALLS =============

export const getMembers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/members`);
    if (!response.ok) throw new Error('Failed to fetch members');
    return await response.json();
  } catch (error) {
    console.error('Error fetching members:', error);
    return [];
  }
};

export const saveMembers = async (members) => {
  // Not needed with backend API
  console.log('saveMembers called (not needed)');
};

export const addMember = async (member) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(member),
    });
    if (!response.ok) throw new Error('Failed to add member');
    return await response.json();
  } catch (error) {
    console.error('Error adding member:', error);
    return null;
  }
};

export const deleteMember = async (memberId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/members/${memberId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete member');
    return true;
  } catch (error) {
    console.error('Error deleting member:', error);
    return false;
  }
};

export const updateMember = async (memberId, updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/members/${memberId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update member');
    return true;
  } catch (error) {
    console.error('Error updating member:', error);
    return false;
  }
};

// ============= ATTENDANCE (localStorage for now) =============

export const getAttendance = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    return stored ? JSON.parse(stored) : DEFAULT_STATE.attendance;
  } catch (error) {
    console.error('Error reading attendance from storage:', error);
    return DEFAULT_STATE.attendance;
  }
};

export const saveAttendance = (attendance) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance || {}));
  } catch (error) {
    console.error('Error saving attendance to storage:', error);
  }
};

export const logAttendance = (memberId, date = new Date().toISOString().split('T')[0]) => {
  try {
    const attendance = getAttendance();
    const memberRecords = attendance[memberId] || [];
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

export const getAttendanceCount = (memberId) => {
  try {
    const attendance = getAttendance();
    return (attendance[memberId] || []).length;
  } catch (error) {
    console.error('Error getting attendance count:', error);
    return 0;
  }
};

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

// ============= STATS CALCULATION =============

export const calculateStats = async (members) => {
  try {
    const membersList = members || await getMembers();
    const today = new Date();
    
    const total = membersList.length;
    const active = membersList.filter(member => {
      const expiry = new Date(member.expiryDate);
      return !Number.isNaN(expiry.getTime()) && expiry >= today;
    }).length;
    const expired = total - active;
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newThisWeek = membersList.filter(member => {
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
