import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  id: string;
  name: string;
}

export default function Dashboard() {
  const [balance,setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate=useNavigate();
  const [user, setUser] = useState<{firstName: string, lastName: string} | null>(null);

  

  useEffect(()=>{
    const fetchData = async () => {
      setLoading(true);
      try {
        const [balanceRes, userRes] = await Promise.all([
          axios.get("http://localhost:3000/api/v1/account/balance", {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }),
          axios.get("http://localhost:3000/api/v1/auth/me", {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }),
        ]);
        setBalance(balanceRes.data.balance);
        setUser(userRes.data);
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

            
          </div>
        </div>
      </div>
    </div>
  );
}