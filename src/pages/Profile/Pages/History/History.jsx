import axios from "axios";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ContextSource } from "../../../../component/ContextAPI/ContextAPI";
import Loader from "../../../../Layout/Loader";

const History = () => {
  const [activeTab, setActiveTab] = useState("deposit");
  const [loading, setLoading] = useState(true);
  const [depositData, setDepositData] = useState([]);
  const [withdrawData, setWithdrawData] = useState([]);
  const accessToken = useSelector((state) => state.Auth.token);
  const { userInfo } = useContext(ContextSource);
  const [referrerUsers, setReferrerUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/pay/get-deposit`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        setDepositData(response.data.data);
      } catch (err) {
        console.error("Error fetching deposit data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/pay/get-withdraw`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        setWithdrawData(response.data.data);
      } catch (err) {
        console.error("Error fetching deposit data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users/referrer-user/${
            userInfo?.referralCode
          }`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        setReferrerUser(response.data.data);
      } catch (err) {
        console.error("Error fetching deposit data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const renderTable = () => {
    switch (activeTab) {
      case "deposit":
        return (
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr>
                <th>Deposit ID</th>
                <th>Payment Channel</th>
                <th>Deposit Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {depositData.map((item) => (
                <tr key={item.id}>
                  <td className="text-wrap">{item.orderId}</td>
                  <td>{item.gateway}</td>
                  <td>{item.amount}</td>
                  <td>{format(new Date(item.createdAt), "PPpp")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "withdrawal":
        return (
          <table className="w-full table-xs border-collapse">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Gateway</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {withdrawData.map((item) => (
                <tr key={item.id}>
                  <td>{item.amount}</td>
                  <td>{item.gateway}</td>
                  <td>{item.e_wallet_name}</td>
                  <td>{item.status}</td>
                  <td>{format(new Date(item.createdAt), "PPpp")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "bonus":
        return (
          <table className="w-full  table-xs border-collapse">
            <thead>
              <tr>
                <th>Referrer Name</th>
                <th>Bonus Type</th>
                <th>Bonus Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {referrerUsers.map((item) => (
                <tr key={item.id}>
                  <td>{item.referrer.userName}</td>
                  <td>Referral</td>
                  <td>200</td>
                  <td>{format(new Date(item.createdAt), "PPpp")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="ml-4 my-3">
      <Loader></Loader>
      <h2 className="text-2xl font-semibold">History</h2>
      <div className="flex gap-3 my-3">
        <button
          className={`p-2 px-4 rounded-xl ${
            activeTab === "deposit"
              ? "bg-yellow-400 text-black"
              : "border-2 border-orange-300"
          }`}
          onClick={() => setActiveTab("deposit")}
        >
          Deposit
        </button>
        <button
          className={`p-2 px-4 rounded-xl ${
            activeTab === "withdrawal"
              ? "bg-yellow-400 text-black"
              : "border-2 border-orange-300"
          }`}
          onClick={() => setActiveTab("withdrawal")}
        >
          Withdrawal
        </button>
        <button
          className={`p-2 px-4 rounded-xl ${
            activeTab === "bonus"
              ? "bg-yellow-400 text-black"
              : "border-2 border-orange-300"
          }`}
          onClick={() => setActiveTab("bonus")}
        >
          Bonus
        </button>
      </div>
      {renderTable()}
    </div>
  );
};

export default History;
