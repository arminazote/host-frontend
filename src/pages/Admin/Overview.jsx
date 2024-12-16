import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";

const Overview = () => {
  const accessToken = useSelector((state) => state.Auth.token);
  const [users, setUsers] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const sliceUsers = users.slice(0, 5);
  const sliceWithdrawals = withdrawals.slice(0, 5);
  const [depositTotals, setDepositTotals] = useState({
    dailyTotal: 0,
    weeklyTotal: 0,
    monthlyTotal: 0,
  });
  const [withdrawalTotals, setWithdrawalTotals] = useState({
    dailyTotal: 0,
    weeklyTotal: 0,
    monthlyTotal: 0,
  });

  useEffect(() => {
    // Fetch deposits
    const fetchDeposits = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/pay/get-deposits`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        const { dailyTotal, weeklyTotal, monthlyTotal } = response.data.data;
        setDepositTotals({ dailyTotal, weeklyTotal, monthlyTotal });
      } catch (err) {
        console.error("Error fetching deposit data:", err);
      }
    };

    // Fetch withdrawals
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/pay/get-withdraws`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        const { dailyTotal, weeklyTotal, monthlyTotal, withdrawals } =
          response.data.data;
        setWithdrawalTotals({ dailyTotal, weeklyTotal, monthlyTotal });
        setWithdrawals(withdrawals);
      } catch (err) {
        console.error("Error fetching withdrawal data:", err);
      }
    };

    // Fetch users
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        setUsers(response.data.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchDeposits();
    fetchWithdrawals();
    fetchUsers();
  }, [accessToken]);

  return (
    <div className="py-6 lg:p-6 bg-gray-100 min-h-screen lg:mt-0 mt-16">
      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back, Super Admin!</p>
      </header>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white shadow-lg flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-3xl font-bold">{users.length}</p>
            <p className="text-sm flex items-center gap-2 mt-2">
              +4.5% This Week
            </p>
          </div>
          <FaUsers className="text-4xl opacity-75" />
        </div>

        {/* Total Withdrawals */}
        <div className="bg-gradient-to-r from-green-500 to-teal-400 p-6 rounded-lg text-white shadow-lg">
          <h3 className="text-lg font-semibold">Withdrawals</h3>
          <p className="text-sm">Daily: {withdrawalTotals.dailyTotal} TK</p>
          <p className="text-sm">Weekly: {withdrawalTotals.weeklyTotal} TK</p>
          <p className="text-sm">Monthly: {withdrawalTotals.monthlyTotal} TK</p>
        </div>

        {/* Total Deposits */}
        <div className="bg-gradient-to-r from-pink-500 to-red-400 p-6 rounded-lg text-white shadow-lg">
          <h3 className="text-lg font-semibold">Deposits</h3>
          <p className="text-sm">Daily: {depositTotals.dailyTotal} TK</p>
          <p className="text-sm">Weekly: {depositTotals.weeklyTotal} TK</p>
          <p className="text-sm">Monthly: {depositTotals.monthlyTotal} TK</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Users */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Latest Users</h2>
          <ul>
            {sliceUsers.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center py-3 border-b last:border-none"
              >
                <div>
                  <h3 className="font-medium">{user.userName}</h3>
                  <p className="text-sm text-gray-500">{user.primaryPhone}</p>
                </div>
                <p className="text-xs text-gray-400">
                  {format(new Date(user.createdAt), "PPpp")}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Withdrawals */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Latest Withdrawals</h2>
          <ul>
            {sliceWithdrawals.map((withdrawal) => (
              <li
                key={withdrawal.id}
                className="flex justify-between items-center py-3 border-b last:border-none"
              >
                <div>
                  <h3 className="font-medium">{withdrawal.userName}</h3>
                  <p className="text-sm text-gray-500">
                    Amount: {withdrawal.amount} TK
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  {format(new Date(withdrawal.createdAt), "PPpp")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
