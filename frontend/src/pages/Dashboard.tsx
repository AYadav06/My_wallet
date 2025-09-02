import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
}

export default function Dashboard() {
  const [balance] = useState(5000);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate=useNavigate();
  const [users] = useState<User[]>([
    { id: 'U1', name: 'User 1' },
    { id: 'U2', name: 'User 2' },
    { id: 'U3', name: 'User 3' },
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Payments App</h1>
          <div className="flex items-center gap-3">
            <span className="text-gray-600">Hello, User</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">U</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Balance Section */}
          <div className="mb-8">
            <div className="flex items-baseline gap-3">
              <h2 className="text-xl font-bold text-gray-900">Your Balance</h2>
              <span className="text-2xl font-bold text-green-600">
                ${balance.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Users Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Users</h2>
            
            {/* Search Input */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Users List */}
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between py-4 px-0"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 font-medium min-w-[2rem]">
                      {user.id}
                    </span>
                    <span className="text-gray-900 font-medium">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={() =>navigate('/sendMoney')}
                    className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                  >
                    Send Money
                  </button>
                </div>
              ))}
              
              {filteredUsers.length === 0 && searchTerm && (
                <div className="text-center py-8 text-gray-500">
                  No users found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}