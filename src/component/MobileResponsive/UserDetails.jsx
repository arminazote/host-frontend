import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { FaBangladeshiTakaSign, FaPeopleGroup } from "react-icons/fa6";
import { PiHandWithdrawDuotone } from "react-icons/pi";
import { RiLuggageDepositFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../Layout/Loader";

const UserDetails = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVerified, setVerified] = useState(false);
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
        setVerified(response.data.data.isVerified);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch user info");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [accessToken]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  return (
    <>
      <div>
        <Loader></Loader>
        <div className="lg:hidden md:px-2 my-4 items-center justify-between flex">
          <div>
            <h2 className="text-xs font-semibold">{userInfo.userName}</h2>
            <p className="flex text-xs items-center gap-1 text-red-600 font-semibold">
              <FaBangladeshiTakaSign />- {userInfo.balance} tk{" "}
            </p>
          </div>
          <div className="justify-center items-center flex flex-col">
            <Link
              to="/deposit"
              className="justify-center items-center flex flex-col"
            >
              <h1 className="bg-black w-12 h-12 justify-center items-center text-center text-white rounded-2xl p-2">
                <RiLuggageDepositFill className="text-3xl" />
              </h1>
              <p className="text-xs font-bold">Deposit</p>
            </Link>
          </div>
          <div className="justify-center items-center flex flex-col">
            <Link
              to="/withdrawalmobile"
              className="justify-center items-center flex flex-col"
            >
              <h1 className="bg-black w-12 h-12 justify-center items-center text-white rounded-2xl p-2">
                <PiHandWithdrawDuotone className="text-3xl" />
              </h1>
              <p className="text-xs font-bold">Withdrawal</p>
            </Link>
          </div>
          <div className="justify-center items-center flex flex-col">
            <Link
              to="/referral"
              className="justify-center items-center flex flex-col"
            >
              <h1 className="bg-black w-12 h-12 justify-center items-center text-white rounded-2xl p-2">
                <FaPeopleGroup className="text-3xl" />
              </h1>
              <p className="text-xs font-bold">Referral</p>
            </Link>
          </div>
          <div className="justify-center items-center flex flex-col">
            <Link
              to="/betinghistory"
              className="justify-center items-center flex flex-col"
            >
              <h1 className="bg-black w-12 h-12 justify-center items-center text-white rounded-2xl p-2">
                <FaHistory className="text-3xl" />
              </h1>
              <p className="text-xs font-bold">History</p>
            </Link>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default UserDetails;
