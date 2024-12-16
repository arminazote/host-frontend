import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { useSelector } from "react-redux";
import axios from "axios";
import VerifyPhoneModal from "./VerifyPhoneModal";
import AddSecondaryPhoneModal from "./AddSecondaryPhoneModal";
import Loader from "../../../../Layout/Loader";

const Personal = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSecondaryModalOpen, setSecondaryModalOpen] = useState(false);
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
    <section className="md:px-10 py-5">
      <Loader></Loader>
      <h1 className="text-xl my-5 font-semibold flex gap-6">My Profile</h1>
      <div id="profileInfo" className="my-7 space-y-8">
        <div>
          <h1 className="text-lg font-semibold">Username</h1>
          <p>{userInfo?.userName}</p>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Full Name</h1>
          <p>{userInfo?.fullName ? userInfo?.fullName : "No fullName found"}</p>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Currency</h1>
          <p>{userInfo?.currency}</p>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Total Refer Bonus</h1>
          <p>{userInfo?.totalReferBonus} TK</p>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Turnover</h1>
          {userInfo?.balance === 0 ||
          userInfo?.isDeposit ||
          userInfo.totalBetAmount >= 3000 ? (
            <p>Completed</p>
          ) : (
            <p>{userInfo?.totalBetAmount - 3000} TK</p>
          )}
        </div>
        <div>
          <h1 className="text-lg font-semibold">Your Role</h1>
          <p>{userInfo.role}</p>
        </div>
        <div>
          <h1 className="text-lg font-semibold mb-1">Primary Number</h1>
          <div className="border border-gray-400 w-[38%] px-1 py-1 rounded-md flex gap-4 items-center">
            <p className="font-bold">{userInfo?.primaryPhone}</p>
            {isVerified ? (
              <p className="text-green-600 underline font-bold flex gap-1 items-center">
                <HiOutlineExclamationCircle size={30} className="font-bold" />
                Verified
              </p>
            ) : (
              <button
                onClick={() => setModalOpen(true)}
                className="text-orange-600 underline font-bold cursor-pointer flex gap-1 items-center"
              >
                <HiOutlineExclamationCircle size={30} className="font-bold" />
                Verify OTP
              </button>
            )}
          </div>
          {userInfo?.secondaryPhone && (
            <>
              <h1 className="text-lg font-semibold mb-1 mt-2">
                Secondary Number
              </h1>
              <div className="border border-gray-400 w-[38%] px-1 py-1 rounded-md flex gap-4 items-center">
                <p className="font-bold">{userInfo?.secondaryPhone}</p>
                {isVerified ? (
                  <p className="text-green-600 underline font-bold flex gap-1 items-center">
                    <HiOutlineExclamationCircle
                      size={30}
                      className="font-bold"
                    />
                    Verified
                  </p>
                ) : (
                  <button
                    onClick={() => setModalOpen(true)}
                    className="text-orange-600 underline font-bold cursor-pointer flex gap-1 items-center"
                  >
                    <HiOutlineExclamationCircle
                      size={30}
                      className="font-bold"
                    />
                    Verify OTP
                  </button>
                )}
              </div>
            </>
          )}
          {!userInfo?.secondaryPhone && (
            <button
              onClick={() => setSecondaryModalOpen(true)}
              className="bg-yellow-400 mt-4 px-4 py-2 rounded-lg font-semibold"
            >
              ADD SECONDARY NUMBER
            </button>
          )}
        </div>
      </div>
      {isModalOpen && (
        <VerifyPhoneModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          phone={userInfo.primaryPhone}
          onVerified={() => setVerified(true)}
        />
      )}
      {isSecondaryModalOpen && (
        <AddSecondaryPhoneModal
          isOpen={isSecondaryModalOpen}
          onClose={() => setSecondaryModalOpen(false)}
        />
      )}
    </section>
  );
};

export default Personal;
