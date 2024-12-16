import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import WithdrawModal from "./WithdrawModal";

const Withdraw = () => {
  const accessToken = useSelector((state) => state.Auth.token);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const withdrawalsPerPage = 15;
  const [withdrawals, setWithdrawals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState();

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/pay/get-payment-method`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        setPaymentMethod(response.data.data.paymentMethod);
      } catch (err) {
        console.error("Error fetching withdrawals:", err);
      }
    };

    fetchWithdrawals();
  }, []);

  useEffect(() => {
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
        setWithdrawals(response.data.data.withdrawals);
        console.log(response.data.data);
      } catch (err) {
        console.error("Error fetching withdrawals:", err);
      }
    };

    fetchWithdrawals();
  }, [accessToken]);

  // Update status in state
  const updateWithdrawalStatus = (id, newStatus) => {
    setWithdrawals((prev) =>
      prev.map((withdrawal) =>
        withdrawal.id === id ? { ...withdrawal, status: newStatus } : withdrawal
      )
    );
  };

  // Filter and Search Logic
  const filteredWithdrawals = withdrawals.filter(
    (withdraw) =>
      (filter === "All" || withdraw.status === filter) &&
      (search === "" ||
        withdraw.userName.toLowerCase().includes(search.toLowerCase()) ||
        withdraw.user_account_no.includes(search))
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredWithdrawals.length / withdrawalsPerPage);
  const currentWithdrawals = filteredWithdrawals.slice(
    (currentPage - 1) * withdrawalsPerPage,
    currentPage * withdrawalsPerPage
  );

  // Open Modal
  const openModal = (withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWithdrawal(null);
  };

  return (
    <div className="py-6 lg:p-6 bg-gray-100 min-h-screen lg:mt-0 mt-16">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Withdraw Requests</h1>
        <p className="text-gray-600">
          Manage and track all user withdrawal requests with detailed records.
        </p>
      </header>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full lg:w-1/3">
          <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by user or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative w-full lg:w-1/4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="APPROVED">Approved</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white shadow-md rounded-lg">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Account</th>
              <th className="py-3 px-4 text-left">Wallet</th>
              <th className="py-3 px-4 text-left">Gateway</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentWithdrawals.length > 0 ? (
              currentWithdrawals.map((withdraw) => (
                <tr key={withdraw.id} className="border-b last:border-none">
                  <td className="py-3 px-4">{withdraw.userName}</td>
                  <td className="py-3 px-4">{withdraw.user_account_no}</td>
                  <td className="py-3 px-4">{withdraw.e_wallet_name}</td>
                  <td className="py-3 px-4">{withdraw.gateway}</td>
                  <td className="py-3 px-4">{withdraw.amount}</td>
                  <td className="py-3 px-4">
                    {format(new Date(withdraw.createdAt), "PPpp")}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() =>
                        withdraw.status === "PENDING" && openModal(withdraw)
                      }
                      className={`px-4 py-2 text-white rounded flex items-center gap-1 ${
                        withdraw.status === "PENDING"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : withdraw.status === "APPROVED"
                          ? "bg-green-500 cursor-not-allowed"
                          : "bg-gray-500"
                      }`}
                      disabled={
                        withdraw.status !== "PENDING" ||
                        paymentMethod?.toLowerCase() !==
                          withdraw?.gateway?.toLowerCase()
                      }
                    >
                      {withdraw.status === "PENDING" && (
                        <FaEdit className="text-white" />
                      )}
                      <span>{withdraw.status}</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-3 px-4 text-center text-gray-500">
                  No withdrawal requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile List */}
      <div className="block lg:hidden">
        {currentWithdrawals.length > 0 ? (
          currentWithdrawals.map((withdraw) => (
            <div
              key={withdraw.id}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <p>
                <strong>Username:</strong> {withdraw.userName}
              </p>
              <p>
                <strong>Account:</strong> {withdraw.user_account_no}
              </p>
              <p>
                <strong>Wallet:</strong> {withdraw.e_wallet_name}
              </p>
              <p>
                <strong>Gateway:</strong> {withdraw.gateway}
              </p>
              <p>
                <strong>Amount:</strong> {withdraw.amount}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {format(new Date(withdraw.createdAt), "PPpp")}
              </p>
              <button
                onClick={() =>
                  withdraw.status === "PENDING" && openModal(withdraw)
                }
                className={`px-4 py-2 text-white rounded flex items-center gap-1 mt-4 ${
                  withdraw.status === "PENDING"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : withdraw.status === "APPROVED"
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-gray-500"
                }`}
                disabled={
                  withdraw.status !== "PENDING" ||
                  paymentMethod?.toLowerCase() !==
                    withdraw?.gateway?.toLowerCase()
                }
              >
                {withdraw.status === "PENDING" && (
                  <FaEdit className="text-white" />
                )}
                <span>{withdraw.status}</span>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No withdrawal requests found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`px-4 py-2 rounded-lg bg-blue-500 text-white ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p>
          Page <span className="font-bold">{currentPage}</span> of{" "}
          <span className="font-bold">{totalPages}</span>
        </p>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className={`px-4 py-2 rounded-lg bg-blue-500 text-white ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && selectedWithdrawal && (
        <WithdrawModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Withdrawal Details"
          data={selectedWithdrawal}
          accessToken={accessToken}
          updateStatus={updateWithdrawalStatus}
        />
      )}
    </div>
  );
};

export default Withdraw;
