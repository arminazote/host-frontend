import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Promotion from "../assets/promotion.svg";
import Home from "../assets/home.svg";
import Deposit from "../assets/deposit.svg";
import Account from "../assets/account.svg";
import { useDispatch, useSelector } from "react-redux";
import { MdDashboardCustomize } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { logOut } from "./Redux/ReduxFunction";
import ShowToast from "./Toastfy/ShowToast";

const BottomMenue = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUserInfo = useSelector((state) => state.Auth.user);

  const handleLogOut = () => {
    dispatch(logOut());
    ShowToast({ success: "Logged out successfully" });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      {loginUserInfo?.role === "SUPER_ADMIN" ||
      loginUserInfo?.role === "SUB_ADMIN" ? (
        <>
          <div className="bg-black w-full lg:hidden fixed bottom-0 z-50 h-14 rounded-t-box p-1 flex gap-4 justify-between px-5">
            <button
              onClick={handleLogOut}
              className="text-white justify-center items-center flex flex-col"
            >
              <LuLogOut size={20} />
              <p>Logut</p>
            </button>
            <Link
              to={"/admin/overview"}
              className="text-white justify-center items-center flex flex-col"
            >
              <MdDashboardCustomize size={20} />
              <p>Dashboard</p>
            </Link>

            <Link
              to={"/"}
              className="text-white justify-center items-center flex flex-col"
            >
              <img src={Home} alt="home" />
              <p>Home</p>
            </Link>
            <Link
              to={"/profile/personal"}
              className="text-white justify-center items-center flex flex-col"
            >
              <img src={Account} alt="profile" />
              <p>Profile</p>
            </Link>
            <Link
              to={"/admin/deposit"}
              className="text-white justify-center items-center flex flex-col"
            >
              <img src={Deposit} alt="deposit" />
              <p>Deposit</p>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="bg-black w-full lg:hidden fixed bottom-0 z-50 h-14 rounded-t-box p-1 flex gap-4 justify-between px-5">
            <button
              onClick={handleLogOut}
              className="text-white justify-center items-center flex flex-col"
            >
              <LuLogOut size={20} />
              <p>Logout</p>
            </button>
            <Link
              to={"/promotion"}
              className="text-white justify-center items-center flex flex-col"
            >
              <img src={Promotion} alt="promotion" />
              <p>Promotion</p>
            </Link>

            <Link
              to={"/"}
              className="text-white justify-center items-center flex flex-col"
            >
              <img src={Home} alt="home" />
              <p>Home</p>
            </Link>
            <Link
              to={"/profile/personal"}
              className="text-white justify-center items-center flex flex-col"
            >
              <img src={Account} alt="profile" />
              <p>Profile</p>
            </Link>
            <Link
              to={"/notification"}
              className="text-white justify-center items-center flex flex-col"
            >
              <FaMessage />
              <p>Message</p>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default BottomMenue;
