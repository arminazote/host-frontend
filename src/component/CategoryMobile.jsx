import React from "react";
import { Link } from "react-router-dom";

const CategoryMobile = () => {
  return (
    <div className="lg:hidden w-full bg-white py-4 relative">
      <div
        className="flex overflow-x-auto space-x-4 px-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        style={{
          paddingBottom: "15px",
        }}
      >
        {/* Hot Games */}
        <Link
          to="/"
          className="flex-shrink-0 flex flex-col items-center bg-yellow-400 rounded-lg shadow-md py-1 px-4 hover:bg-yellow-500 w-20"
        >
          <div className="text-2xl text-black font-bold">🔥</div>
          <span className="mt-1 font-bold text-sm text-center">Hot Games</span>
        </Link>

        {/* Cricket */}
        <Link
          to="/cricket"
          className="flex-shrink-0 flex flex-col items-center bg-gray-200 rounded-lg shadow-md py-1 px-4 hover:bg-gray-300 w-20"
        >
          <div className="text-2xl text-black font-bold">🏏</div>
          <span className="mt-1 font-bold text-sm text-center">Cricket</span>
        </Link>

        {/* Casino */}
        <Link
          to="/live-casino"
          className="flex-shrink-0 flex flex-col items-center bg-gray-200 rounded-lg shadow-md py-1 px-4 hover:bg-gray-300 w-20"
        >
          <div className="text-2xl text-black font-bold">♠️</div>
          <span className="mt-1 font-bold text-sm text-center">Casino</span>
        </Link>

        {/* Slot */}
        <Link
          to="/slots"
          className="flex-shrink-0 flex flex-col items-center bg-gray-200 rounded-lg shadow-md py-1 px-4 hover:bg-gray-300 w-20"
        >
          <div className="text-2xl text-black font-bold">🎰</div>
          <span className="mt-1 font-bold text-sm text-center">Slot</span>
        </Link>

        {/* Table */}
        <Link
          to="/table"
          className="flex-shrink-0 flex flex-col items-center bg-gray-200 rounded-lg shadow-md py-1 px-4 hover:bg-gray-300 w-20"
        >
          <div className="text-2xl text-black font-bold">🃏</div>
          <span className="mt-1 font-bold text-sm text-center">Table</span>
        </Link>

        {/* Sports */}
        <Link
          to="/sportsbook"
          className="flex-shrink-0 flex flex-col items-center bg-gray-200 rounded-lg shadow-md py-1 px-4 hover:bg-gray-300 w-20"
        >
          <div className="text-2xl text-black font-bold">⚽</div>
          <span className="mt-1 font-bold text-sm text-center">Sports</span>
        </Link>

        {/* Fishing */}
        <Link
          to="/fishing"
          className="flex-shrink-0 flex flex-col items-center bg-gray-200 rounded-lg shadow-md py-1 px-4 hover:bg-gray-300 w-20"
        >
          <div className="text-2xl text-black font-bold">🎏</div>
          <span className="mt-1 font-bold text-sm text-center">Fishing</span>
        </Link>

        {/* Crash */}
        <Link
          to="/crash"
          className="flex-shrink-0 flex flex-col items-center bg-gray-200 rounded-lg shadow-md py-1 px-4 hover:bg-gray-300 w-20"
        >
          <div className="text-2xl text-black font-bold">💥</div>
          <span className="mt-1 font-bold text-sm text-center">Crash</span>
        </Link>
      </div>
    </div>
  );
};

export default CategoryMobile;
