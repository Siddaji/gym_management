import React from 'react';

const MemberTable = ({ members }) => {
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
      <div className="rounded-3xl bg-white p-8 shadow-xl border border-gray-200 text-center">
        <p className="text-gray-500">No member records available yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl bg-white shadow-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Contact</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Plan</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Joined</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Expires</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {members.map((member) => (
            <tr key={member.id} className="hover:bg-slate-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{member.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{member.plan}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(member.joinDate)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(member.expiryDate)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatus(member.expiryDate) === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {getStatus(member.expiryDate)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
