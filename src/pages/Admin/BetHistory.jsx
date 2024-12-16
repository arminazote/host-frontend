import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { format } from "date-fns";
import { gameInfo } from "../../component/Utils/gamesInfo";

const BetHistory = () => {
  const accessToken = useSelector((state) => state.Auth.token);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [betHistory, setBetHistory] = useState([]);
  const betsPerPage = 15;

  const getGameName = (game_uid) => {
    const game = gameInfo.find((game) => game.gameid === game_uid);
    const gameName = game ? game.name : "Unknown Game";
    return gameName.length > 20 ? `${gameName.substring(0, 20)}...` : gameName;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/game/bet-history`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        setBetHistory(response.data.data);
      } catch (err) {
        console.error("Error fetching deposit data:", err);
      }
    };
    fetchData();
  }, []);

  // Filter and Search Logic
  const filteredBets = betHistory.filter(
    (bet) =>
      search === "" ||
      bet.userName.toLowerCase().includes(search.toLowerCase()) ||
      getGameName(bet.game_uid).includes(search)
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredBets.length / betsPerPage);
  const currentBets = filteredBets.slice(
    (currentPage - 1) * betsPerPage,
    currentPage * betsPerPage
  );

  return (
    <div className="py-6 lg:p-6 bg-gray-100 min-h-screen lg:mt-0 mt-16">
      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Bet History</h1>
        <p className="text-gray-600">
          Review all user bets with filters, search, and pagination.
        </p>
      </header>

      {/* Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full lg:w-1/3">
          <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by user or game name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Bet History Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full table-auto">
          <thead className="hidden md:table-header-group">
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Game Name</th>
              <th className="py-3 px-4 text-left">Game ID</th>
              <th className="py-3 px-4 text-left">Bet Amount</th>
              <th className="py-3 px-4 text-left">Win Amount</th>
              <th className="py-3 px-4 text-left">Loss Amount</th>
              <th className="py-3 px-4 text-left">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {currentBets.length > 0 ? (
              currentBets.map((bet) => (
                <tr
                  key={bet.id}
                  className="md:table-row border-b hover:bg-gray-100 last:border-none"
                >
                  <td className="block md:table-cell py-3 px-4">
                    <div className="flex gap-2 md:hidden">
                      <span className="font-bold">Username : </span>
                      <span>{bet.userName}</span>
                    </div>
                    <span className="hidden md:block">{bet.userName}</span>
                  </td>
                  <td className="block md:table-cell py-3 px-4">
                    <div className="flex gap-2 md:hidden">
                      <span className="font-bold">Game Name : </span>
                      <span> {getGameName(bet.game_uid)}</span>
                    </div>
                    <span className="hidden md:block">
                      {getGameName(bet.game_uid)}
                    </span>
                  </td>
                  <td className="block md:table-cell py-3 px-4">
                    <div className="flex gap-2 md:hidden">
                      <span className="font-bold">Game Name : </span>
                      <span> {bet.game_uid}</span>
                    </div>
                    <span className="hidden md:block">{bet.game_uid} </span>
                  </td>
                  <td className="block md:table-cell py-3 px-4">
                    <div className="flex gap-2 md:hidden mb-1">
                      <span className="font-bold">Bet Amount : </span>
                      <span>{bet.bet_amount} TK</span>
                    </div>
                    <span className="hidden md:block">{bet.bet_amount} TK</span>
                  </td>
                  <td className="block md:table-cell py-3 px-4">
                    <div className="flex gap-2 md:hidden mb-1">
                      <span className="font-bold">Win Amount : </span>
                      <span className="font-bold text-green-500">
                        {bet.win_amount} TK
                      </span>
                    </div>
                    <span className="hidden md:block font-bold text-green-500">
                      {bet.win_amount} TK
                    </span>
                  </td>
                  <td className="block md:table-cell py-3 px-4">
                    <div className="flex gap-2 md:hidden mb-1">
                      <span className="font-bold">Loss Amount : </span>
                      <span className={`font-bold text-red-500`}>
                        {bet.bet_amount > bet.win_amount
                          ? bet.bet_amount - bet.win_amount
                          : 0}{" "}
                        TK
                      </span>
                    </div>
                    <span className={`hidden md:block font-bold text-red-500`}>
                      {bet.bet_amount > bet.win_amount
                        ? bet.bet_amount - bet.win_amount
                        : 0}{" "}
                      TK
                    </span>
                  </td>
                  <td className="block md:table-cell py-3 px-4">
                    <div className="flex gap-2 md:hidden mb-1">
                      <span className="font-bold">Date : </span>
                      <span>{format(new Date(bet.createdAt), "PPpp")}</span>
                    </div>
                    <span className="hidden md:block">
                      {format(new Date(bet.createdAt), "PPpp")}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-3 px-4 text-center text-gray-500">
                  No bets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
    </div>
  );
};

export default BetHistory;
