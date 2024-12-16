import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { FaUsers, FaHistory, FaMoneyBillWave, FaHome } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import Loader from "../../Layout/Loader";

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Loader></Loader>
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-40" : "w-16"
        } bg-[#4A47A3] transition-all duration-300 flex-col text-white lg:flex hidden`}
      >
        <button
          className="p-4 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "<<" : ">>"}
        </button>

        <ul className="mt-4">
          <li className="mb-6 px-4 flex items-center gap-4">
            <FaHome />
            {isSidebarOpen && (
              <NavLink
                to="/admin/overview"
                className={({ isActive }) =>
                  `hover:underline ${isActive ? "font-bold underline" : ""}`
                }
              >
                Home
              </NavLink>
            )}
          </li>
          <li className="mb-6 px-4 flex items-center gap-4">
            <FaUsers />
            {isSidebarOpen && (
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `hover:underline ${isActive ? "font-bold underline" : ""}`
                }
              >
                Users
              </NavLink>
            )}
          </li>
          <li className="mb-6 px-4 flex items-center gap-4">
            <FaMoneyCheckDollar />
            {isSidebarOpen && (
              <NavLink
                to="/admin/deposit"
                className={({ isActive }) =>
                  `hover:underline ${isActive ? "font-bold underline" : ""}`
                }
              >
                Deposit
              </NavLink>
            )}
          </li>
          <li className="mb-6 px-4 flex items-center gap-4">
            <FaMoneyBillWave />
            {isSidebarOpen && (
              <NavLink
                to="/admin/withdraw"
                className={({ isActive }) =>
                  `hover:underline ${isActive ? "font-bold underline" : ""}`
                }
              >
                Withdraw
              </NavLink>
            )}
          </li>
          <li className="mb-6 px-4 flex items-center gap-4">
            <FaHistory />
            {isSidebarOpen && (
              <NavLink
                to="/admin/bet-history"
                className={({ isActive }) =>
                  `hover:underline ${isActive ? "font-bold underline" : ""}`
                }
              >
                Bet History
              </NavLink>
            )}
          </li>
          <li className="mb-6 px-4 flex items-center gap-4">
            <MdPayment />
            {isSidebarOpen && (
              <NavLink
                to="/admin/dualpayment"
                className={({ isActive }) =>
                  `hover:underline ${isActive ? "font-bold underline" : ""}`
                }
              >
                Manage Pay
              </NavLink>
            )}
          </li>
        </ul>
      </div>
      <div className="flex-1 p-6">
        <Outlet></Outlet>
      </div>
      <ul className="flex lg:hidden  absolute flex-wrap bg-gray-400 gap-1">
        <li className="px-4 flex items-center gap-1 text-xl">
          <FaHome />
          {isSidebarOpen && (
            <NavLink
              to="/admin/overview"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "font-bold underline" : ""}`
              }
            >
              Home
            </NavLink>
          )}
        </li>
        <li className="px-4 flex items-center gap-1">
          <FaUsers />
          {isSidebarOpen && (
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "font-bold underline" : ""}`
              }
            >
              Users
            </NavLink>
          )}
        </li>
        <li className="px-4 flex items-center gap-1">
          <FaMoneyCheckDollar />
          {isSidebarOpen && (
            <NavLink
              to="/admin/deposit"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "font-bold underline" : ""}`
              }
            >
              Deposit
            </NavLink>
          )}
        </li>
        <li className="mb-6 px-4 flex items-center gap-1">
          <FaMoneyBillWave />
          {isSidebarOpen && (
            <NavLink
              to="/admin/withdraw"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "font-bold underline" : ""}`
              }
            >
              Withdraw
            </NavLink>
          )}
        </li>
        <li className="mb-6 px-4 flex items-center gap-1">
          <FaHistory />
          {isSidebarOpen && (
            <NavLink
              to="/admin/bet-history"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "font-bold underline" : ""}`
              }
            >
              Bet History
            </NavLink>
          )}
        </li>
        <li className="mb-6 px-4 flex items-center gap-1">
          <MdPayment />
          {isSidebarOpen && (
            <NavLink
              to="/admin/dualpayment"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "font-bold underline" : ""}`
              }
            >
              Dual Pay
            </NavLink>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Admin;
