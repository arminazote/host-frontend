import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../../Layout/Loader";

const Turnover = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [betHistory, setBetHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = useSelector((state) => state.Auth.token);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/get-me`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        setUserInfo(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user info");
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [accessToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/game/bethistory`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        setBetHistory(response.data.data);
      } catch (err) {
        console.error("Error fetching deposit data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loader></Loader>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Example data for turnover progress
  const totalTurnoverRequired = 3000;
  const currentTurnover = userInfo?.totalBetAmount;

  // Calculate turnover progress percentage
  const turnoverProgress =
    userInfo?.balance === 0 || userInfo?.isDeposit
      ? 100
      : Math.min((currentTurnover / totalTurnoverRequired) * 100, 100);

  // Function to render the data
  const renderData = () => {
    return betHistory.length > 0 ? (
      <table className="w-full table-xs border-collapse mx-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-center">Bet ID</th>
            <th className="border px-4 py-2 text-center">Amount</th>
            <th className="border px-4 py-2 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {betHistory.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2 text-sm text-center">
                {item.id}
              </td>
              <td className="border px-4 py-2 text-center">
                {item.bet_amount}
              </td>
              <td className="border px-4 py-2 text-center">Completed</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-center">No data found</p>
    );
  };

  return (
    <div className="ml-4 my-3">
      <Loader></Loader>
      <h2 className="font-bold text-center">
        <i>
          Turnover amount display may be delayed. Please wait at least five(5)
          minutes after your bets are settled
        </i>
      </h2>
      <h2 className="text-2xl font-semibold text-center">Turnover History</h2>

      {/* Turnover Summary */}
      <div className="bg-gray-100 p-4 my-4 rounded-md shadow-md">
        <h3 className="text-lg font-semibold mb-2">Turnover Progress</h3>
        <p className="mb-2">
          To unlock your bonus, you need to bet{" "}
          <span className="font-bold">{totalTurnoverRequired} TK</span>. So far,
          you've bet <span className="font-bold">{currentTurnover} TK</span>.
        </p>
        {/* Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-4">
          <div
            className={`h-4 rounded-full ${
              turnoverProgress === 100 ? "bg-green-500" : "bg-orange-400"
            }`}
            style={{ width: `${turnoverProgress}%` }}
          ></div>
        </div>
        <p className="text-right text-sm mt-1">
          {turnoverProgress.toFixed(2)}% Completed
        </p>
      </div>

      {/* Button Controls */}
      <div className="flex gap-3 my-3 justify-end">
        <button className="p-2 px-4 rounded-xl bg-black text-white">
          Completed
        </button>
      </div>

      {/* Data Table or No Data Message */}
      {renderData()}
    </div>
  );
};

export default Turnover;
