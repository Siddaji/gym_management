import React from 'react';
import PropTypes from 'prop-types';

const MemberTable = ({ members, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return Number.isNaN(date.getTime())
      ? 'N/A'
      : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatus = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    if (Number.isNaN(expiry.getTime())) {
      return 'Unknown';
    }
    return expiry < today ? 'Expired' : 'Active';
  };

  if (!members || members.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-500">No members added yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Plan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Joined</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Expires</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {members.map((member) => (
            <tr key={member.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{member.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{member.phone}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{member.plan}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{formatDate(member.joinDate)}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{formatDate(member.expiryDate)}</td>
              <td className="px-6 py-4">
                <span className={`inline-block px-3 py-1 text-xs font-medium rounded ${getStatus(member.expiryDate) === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {getStatus(member.expiryDate)}
                </span>
              </td>
              <td className="px-6 py-4">
                {onDelete && (
                  <button
                    onClick={() => onDelete(member.id)}
                    className="text-red-600 hover:text-red-800 font-medium text-sm"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

MemberTable.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func,
};

export default MemberTable;
