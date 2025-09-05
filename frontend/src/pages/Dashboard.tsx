import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export default function Dashboard() {
  const [balance,setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate=useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<{firstName: string, lastName: string} | null>(null);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {});
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(()=>{
    const fetchData = async () => {
      setLoading(true);
      try {
        const [balanceRes, userRes, usersRes] = await Promise.all([
          api.get("/account/balance"),
          api.get("/auth/me"),
          api.get("/auth/users"),
        ]);
        setBalance(balanceRes.data.balance);
        setUser(userRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  },[])
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Payments App</h1>
          <div className="flex items-center gap-3">
            <span className="text-gray-600">Hello, {user?.firstName}</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">{user?.firstName?.[0]}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-baseline gap-3">
              <h2 className="text-xl font-bold text-gray-900">Your Balance</h2>
              {
                loading ? <span className="text-2xl font-bold text-gray-600">Loading...</span> :
                error ? <span className="text-2xl font-bold text-red-600">Error</span> :
                <span className="text-2xl font-bold text-green-600">
                  ${balance.toLocaleString()}
                </span>
              }
            </div>
          </div>

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

            <div className="space-y-4">
              {users.filter(user => user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || user.lastName.toLowerCase().includes(searchTerm.toLowerCase())).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between py-4 px-0"
                >
                  <div className="flex items-center gap-4">
                    
                    <span className="text-gray-900 font-medium">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                  <button
                    onClick={() =>navigate('/send', { state: { id: user.id, name: `${user.firstName} ${user.lastName}` } })}
                    className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                  >
                    Send Money
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
