import { useEffect, useRef, useState } from "react";
import { FaBell, FaBars, FaUser } from "react-icons/fa6";
import logo from "../../public/ranibajibd.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../component/Redux/ReduxFunction";
import { jwtDecode } from "jwt-decode";
import ShowToast from "../component/Toastfy/ShowToast";

const Navbar = () => {
  const accessToken = useSelector((state) => state.Auth.token);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);

  const handleLogOut = () => {
    dispatch(logOut());
    setModal(false);
    navigate("/login");
  };

  const handleProfileRoute = () => {
    navigate("/profile/personal");
    setModal(false);
  };

  const handleAdminRoute = () => {
    navigate("/admin/overview");
    setModal(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const closeSidebar = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.addEventListener("click", closeSidebar);
    } else {
      document.removeEventListener("click", closeSidebar);
    }
    return () => document.removeEventListener("click", closeSidebar);
  }, [sidebarOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        dispatch(logOut());
        navigate("/login");
      } else {
        const timeUntilExpiry = (decodedToken.exp - currentTime) * 1000;
        const timer = setTimeout(() => {
          dispatch(logOut());
          ShowToast({ error: "Your session has expired!" });
          navigate("/login");
        }, timeUntilExpiry);

        return () => clearTimeout(timer); // Cleanup on component unmount
      }
    }
  }, [accessToken, dispatch]);

  return (
    <>
      <div
        ref={sidebarRef}
        className="bg-[#2d394b] p-2 lg:px-12 md:px-8 flex justify-between"
      >
        <NavLink to={"/"}>
          <img className="w-40 lg:w-60 rounded-lg" src={logo} alt="ranibaji" />
        </NavLink>
        <div className="flex gap-6 items-center">
          {user?.name ? (
            <div className="flex gap-5 relative items-center">
              <div className="lg:flex hidden gap-2">
                <FaUser
                  onClick={() => setModal(!modal)}
                  className="text-4xl cursor-pointer bg-white text-yellow-600 p-[5px] rounded-full"
                />
                <h1 className="my-auto text-lg text-primary font-bold">
                  Hi, {user?.name}
                </h1>
              </div>
              <FaBell className="text-3xl  bg-white text-yellow-600 p-[5px] rounded-full" />
              <div
                className={
                  modal == true
                    ? "absolute w-[214px] bg-white z-50 px-5 py-2 top-10 -left-[88px] text-center rounded-md border-2 flex flex-col gap-2"
                    : "hidden"
                }
              >
                {user?.role === "SUPER_ADMIN" && (
                  <button
                    onClick={handleAdminRoute}
                    className="border border-gray-400 bg-gray-300 hover:bg-gray-400 rounded-md text-sm my-1 list-none font-semibold py-2 px-1"
                  >
                    Super Admin Dashboard
                  </button>
                )}
                {user?.role === "SUB_ADMIN" && (
                  <button
                    onClick={handleAdminRoute}
                    className="border border-gray-400 bg-gray-300 hover:bg-gray-400 rounded-md text-sm my-1 list-none font-semibold py-2 px-1"
                  >
                    Sub-Admin Dashboard
                  </button>
                )}
                <button
                  onClick={handleProfileRoute}
                  className="border border-gray-400 bg-gray-300 hover:bg-gray-400 rounded-md text-sm my-1 list-none font-semibold py-2 px-1"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogOut}
                  className="border px-4 py-1 rounded-md font-semibold bg-[#990000] hover:bg-red-500 text-white"
                >
                  LogOut
                </button>
              </div>
            </div>
          ) : (
            <div className="gap-5 lg:flex md:flex hidden">
              <NavLink to={"/login"}>
                <button className="border px-5 py-2 rounded-md font-bold bg-[#ffd700] text-black">
                  LogIn
                </button>
              </NavLink>
              <NavLink to={"/registration"}>
                <button className="border px-5 py-2 rounded-md font-bold bg-[#990000] text-white">
                  Registration
                </button>
              </NavLink>
            </div>
          )}

          <button
            onClick={toggleSidebar}
            className="md:hidden  text-white text-3xl"
          >
            <FaBars />
          </button>
        </div>
      </div>
      {!user && (
        <div className="w-full flex lg:hidden fixed bottom-0 z-50 h-14">
          <button
            onClick={() => navigate("/registration")}
            className="bg-yellow-400 p-2 w-full font-bold"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 p-2 w-full text-white font-bold"
          >
            Login
          </button>
        </div>
      )}

      <div
        className={`fixed top-0 left-0 z-50 w-60 h-full bg-[#2d394b] transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="p-6 flex flex-col">
          <NavLink onClick={() => setSidebarOpen(false)} to="/">
            <img className="w-60 mb-6" src={logo} alt="ranibaji" />
          </NavLink>
          <NavLink
            onClick={() => setSidebarOpen(false)}
            to="/cricket"
            className="font-semibold mb-4 text-white text-base flex items-center hover:text-yellow-500"
          >
            <span className="text-xl mr-2">🏏</span> Cricket
          </NavLink>

          <NavLink
            onClick={() => setSidebarOpen(false)}
            to="/live-casino"
            className="font-semibold mb-4 text-white text-base flex items-center hover:text-yellow-500"
          >
            <span className="text-xl mr-2">♠️</span> Live Casino
          </NavLink>

          <NavLink
            onClick={() => setSidebarOpen(false)}
            to="/slots"
            className="font-semibold mb-4 text-white text-base flex items-center hover:text-yellow-500"
          >
            <span className="text-xl mr-2">🎰</span> Slot Games
          </NavLink>

          <NavLink
            onClick={() => setSidebarOpen(false)}
            to="/table"
            className="font-semibold mb-4 text-white text-base flex items-center hover:text-yellow-500"
          >
            <span className="text-xl mr-2">🃏</span> Table
          </NavLink>

          <NavLink
            onClick={() => setSidebarOpen(false)}
            to="/sportsbook"
            className="font-semibold mb-4 text-white text-base flex items-center hover:text-yellow-500"
          >
            <span className="text-xl mr-2">⚽</span> Sportsbook
          </NavLink>

          <NavLink
            onClick={() => setSidebarOpen(false)}
            to="/fishing"
            className="font-semibold mb-4 text-white text-base flex items-center hover:text-yellow-500"
          >
            <span className="text-xl mr-2">🎏</span> Fishing
          </NavLink>

          <NavLink
            onClick={() => setSidebarOpen(false)}
            to="/crash"
            className="font-semibold mb-4 text-white text-base flex items-center hover:text-yellow-500"
          >
            <span className="text-xl mr-2">💥</span> Crash
          </NavLink>

          <NavLink
            onClick={() => setSidebarOpen(false)}
            to="/promotion"
            className="font-semibold mb-4 text-white text-base flex items-center hover:text-yellow-500"
          >
            <span className="text-xl mr-2">🎉</span> Promotion
          </NavLink>

          {/* <NavLink
            onClick={() => setSidebarOpen(false)}
            to="/betting-pass"
            className="font-semibold mb-4 text-white text-base flex items-center hover:text-yellow-500"
          >
            <span className="text-xl mr-2">🎫</span> Betting Pass
          </NavLink> */}

          <NavLink
            onClick={() => setSidebarOpen(false)}
            to="/referral"
            className="font-semibold mb-4 text-white text-base flex items-center hover:text-yellow-500"
          >
            <span className="text-xl mr-2">🔗</span> Referral
          </NavLink>

          <NavLink
            onClick={() => setSidebarOpen(false)}
            to="/vip"
            className="font-semibold mb-4 text-white text-base flex items-center hover:text-yellow-500"
          >
            <span className="text-xl mr-2">💎</span> VIP
          </NavLink>

          <NavLink
            onClick={() => setSidebarOpen(false)}
            to="/agent-affiliate"
            className="font-semibold mb-4 text-white text-base flex items-center hover:text-yellow-500"
          >
            <span className="text-xl mr-2">🕴️</span> Agent Affiliate
          </NavLink>

          <NavLink
            onClick={() => setSidebarOpen(false)}
            to="/rewards"
            className="font-semibold mb-4 text-white text-base flex items-center hover:text-yellow-500"
          >
            <span className="text-xl mr-2">🎁</span> Rewards
          </NavLink>
        </div>
      </div>
      <div className="hidden bg-black text-white md:flex gap-8 px-6 py-3">
        <NavLink
          to="/cricket"
          className="font-semibold text-base hover:text-yellow-500"
          activeClassName="text-yellow-500"
        >
          Cricket
        </NavLink>
        <NavLink
          to="/live-casino"
          className="font-semibold text-base hover:text-yellow-500"
          activeClassName="text-yellow-500"
        >
          Live Casino
        </NavLink>
        <NavLink
          to="/slots"
          className="font-semibold text-base hover:text-yellow-500"
          activeClassName="text-yellow-500"
        >
          Slot Games
        </NavLink>
        <NavLink
          to="/table"
          className="font-semibold text-base hover:text-yellow-500"
          activeClassName="text-yellow-500"
        >
          Table Games
        </NavLink>
        <NavLink
          to="/sportsbook"
          className="font-semibold text-base hover:text-yellow-500"
          activeClassName="text-yellow-500"
        >
          Sportsbook
        </NavLink>
        <NavLink
          to="/fishing"
          className="font-semibold text-base hover:text-yellow-500"
          activeClassName="text-yellow-500"
        >
          Fishing
        </NavLink>
        <NavLink
          to="/crash"
          className="font-semibold text-base hover:text-yellow-500"
          activeClassName="text-yellow-500"
        >
          Crash
        </NavLink>
        <NavLink
          to="/promotion"
          className="font-semibold text-base hover:text-yellow-500"
          activeClassName="text-yellow-500"
        >
          Promotion
        </NavLink>

        <NavLink
          to="/referral"
          className="font-semibold text-base hover:text-yellow-500"
          activeClassName="text-yellow-500"
        >
          Referral
        </NavLink>
        <NavLink
          to="/vip"
          className="font-semibold text-base hover:text-yellow-500"
          activeClassName="text-yellow-500"
        >
          VIP
        </NavLink>
        <NavLink
          to="/agent-affiliate"
          className="font-semibold text-base hover:text-yellow-500"
          activeClassName="text-yellow-500"
        >
          Agent Affiliate
        </NavLink>
        <NavLink
          to="/rewards"
          className="font-semibold text-base hover:text-yellow-500"
          activeClassName="text-yellow-500"
        >
          Rewards
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
