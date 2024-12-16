import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DepositInfo = () => {
  const accessToken = useSelector((state) => state.Auth.token);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [depositData, setDepositData] = useState([]);
  const rowsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/pay/get-deposits`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        console.log(response.data);
        setDepositData(response.data.data.deposits);
      } catch (err) {
        console.error("Error fetching deposit data:", err);
      }
    };

    fetchData();
  }, []);

  // Filter data based on search term and status filter
  const filteredData = depositData.filter((deposit) => {
    const matchesSearch = deposit.userName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="py-6 lg:p-6 min-h-screen bg-gray-100 lg:mt-0 mt-16">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Deposit Information
          </h2>

          {/* Search and Filter */}
          <div className="lg:flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Search by User"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full lg:w-1/3 text-sm mb-2"
            />
          </div>

          {/* Table desktop*/}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-200 text-left text-gray-700 font-semibold">
                    Order ID
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-left text-gray-700 font-semibold">
                    Username
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-left text-gray-700 font-semibold">
                    Gateway
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-left text-gray-700 font-semibold">
                    Amount
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-left text-gray-700 font-semibold">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((deposit) => (
                  <tr
                    key={deposit.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2 border border-gray-200 text-gray-700">
                      {deposit.orderId}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-gray-700">
                      {deposit.userName}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-gray-700">
                      {deposit.gateway}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-gray-700">
                      {deposit.amount} TK
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-gray-700">
                      {format(new Date(deposit.createdAt), "PPpp")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View: Deposit Cards */}
          <div className="md:hidden">
            {paginatedData.length > 0 ? (
              paginatedData.map((deposit) => (
                <div
                  key={deposit.id}
                  className="bg-white rounded-lg shadow-md mb-4 p-4 flex flex-col gap-3 border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-700">Deposit ID:</span>
                    <span>{deposit.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-700">Username:</span>
                    <span>{deposit.userName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-700">Amount:</span>
                    <span>{deposit.amount} TK</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-700">Gateway:</span>
                    <span>{deposit.gateway}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-700">Date:</span>
                    <span>{format(new Date(deposit.createdAt), "PPpp")}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                No deposit found.
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-md ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositInfo;
