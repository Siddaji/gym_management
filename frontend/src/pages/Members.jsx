import React, { useState } from 'react';
import MemberTable from '../components/MemberTable';
import AddMemberModal from '../components/AddMemberModal';
import { useMembers } from '../hooks/useStorage';

const Members = () => {
  const { members, isLoading, addMember, deleteMember } = useMembers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMember = async (formData) => {
    await addMember(formData);
    setIsModalOpen(false);
  };

  const handleDeleteMember = async (memberId) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      await deleteMember(memberId);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Members</h1>
          <p className="text-gray-600 mt-2">Total: {members.length} members</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors self-start sm:self-auto"
        >
          Add Member
        </button>
      </div>

      <MemberTable members={members} onDelete={handleDeleteMember} />

      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddMember={handleAddMember}
      />
    </div>
  );
};

export default Members;
