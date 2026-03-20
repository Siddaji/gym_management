import React from 'react';

const MemberTable = ({ members }) => {
  const getStatusColor = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const isActive = expiry >= new Date();
    return isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Desktop Table */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {member.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {member.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {member.plan}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {new Date(member.joinDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {new Date(member.expiryDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.expiryDate)}`}>
                    {new Date(member.expiryDate) >= new Date() ? 'Active' : 'Expired'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden divide-y divide-gray-200">
        {members.map((member) => {
          const expiryDate = new Date(member.expiryDate);
          const isActive = expiryDate >= new Date();
          const statusColor = isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';

          return (
            <div key={member.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 text-lg">{member.name}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                  {isActive ? 'Active' : 'Expired'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-3">
                <div>
                  <span className="text-gray-500 text-xs">Phone</span>
                  <p>{member.phone}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Plan</span>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-1">
                    {member.plan}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Join</span>
                  <p className="mt-1">{new Date(member.joinDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Expires</span>
                  <p className="mt-1 font-medium">{new Date(member.expiryDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemberTable;

