import React, { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { ContextSource } from "../../component/ContextAPI/ContextAPI";
import UserDetails from "../../component/MobileResponsive/UserDetails";
import Personal from "./Pages/Personal/Personal";
const Profile = () => {
  const { userInfo } = useContext(ContextSource);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (userInfo?.referralCode) {
      const fullUrl = `https://ranibaji.com/registration?promocode=${userInfo.referralCode}`;
      navigator.clipboard.writeText(fullUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset "Copied" status after 2 seconds
      });
    }
  };

  const menuItems = [
    { label: "Deposit", value: "profile/deposit" },
    { label: "withdrawal", value: "profile/withdrawal" },
    { label: "Voucher", value: "profile/voucher" },
    { label: "Betting History", value: "profile/betting-history" },
    { label: "History", value: "profile/history" },
    { label: "Turnover History", value: "profile/turnover" },
    { label: "My Profile", value: "profile/personal" },
    { label: "Bank Details", value: "profile/bank-details" },
    { label: "Password", value: "profile/change-password" },
    { label: "Inbox", value: "profile/inbox" },
    { label: "Recommendation", value: "profile/recommendation" },
    { label: "Betting Pass", value: "profile/betting-pass" },
    { label: "Wheel Of Fortune", value: "profile/wheel_of_fortune" },
    { label: "Reward", value: "profile/reward" },
  ];

  return (
    <section className="bg-gray-300 h-full">
      <div className="w-10/12 mx-auto py-5">
        <div
          id="dashboard-navbar"
          className="p-2 rounded-md border-2 mb-5 bg-white lg:flex hidden"
        >
          <div className="flex flex-wrap gap-x-6">
            {menuItems?.map((e, idx) => (
              <NavLink to={`/${e.value}`} key={idx}>
                <button className="text-lg font-semibold p-2">{e.label}</button>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="lg:hidden ">
          <UserDetails></UserDetails>
          <Personal></Personal>
        </div>
        <div id="dashboard-header" className="lg:flex gap-3 hidden">
          <div className="bg-white w-2/12 px-4 py-3 h-full rounded-lg">
            <h1 className="text-lg font-bold">Welcome!</h1>
            <div className="my-2 bg-gray-200 p-2 flex rounded-lg">
              <CiUser className="text-xl my-auto" />
              <h1 className="text-lg font-semibold">{userInfo?.userName}</h1>
            </div>
            <div className="my-2 bg-gray-200 p-2 rounded-lg">
              <div className="flex gap-3">
                <CiUser className="text-xl my-auto " />
                <div>
                  <h1 className="font-bold">Betting Pass</h1>
                  <h1 className="text-blue-600 font-semibold">Level 1</h1>
                </div>
              </div>
              <hr className="border w-full bg-gray-400 h-[6px] my-1 rounded-md" />
              <p>{userInfo?.level}/400</p>
            </div>
            <div className="my-2 bg-gray-200 p-2 rounded-lg">
              <div className="flex gap-3">
                <CiUser className="text-xl my-auto " />
                <div>
                  <h1 className="font-bold">
                    VIP{" "}
                    <span className="text-blue-600 font-semibold">MEMBER</span>
                  </h1>
                </div>
              </div>
              <hr className="border w-full bg-gray-400 h-[6px] my-1 rounded-md" />
              <p>0/400</p>
            </div>
            <div className="my-2 bg-gray-200 p-2 rounded-lg">
              <h1 className="font-bold">Prize coins</h1>
              <h1 className="text-blue-600 font-semibold">{userInfo?.coins}</h1>
              <div className="w-fit mx-auto text-center">
                <button className="btn-custom px-5 py-1 font-semibold text-sm  rounded-lg">
                  GO TO REVIEW
                </button>
              </div>
            </div>
            <div className="my-2 bg-gray-200 p-2 rounded-lg space-y-2">
              <h1 className="font-bold">My Wallet</h1>
              <h1 className="text-blue-600 font-semibold">
                {userInfo?.balance} TK
              </h1>
              <div className="w-fit mx-auto text-center">
                <button className="btn-custom px-5 py-1 font-semibold text-sm  rounded-lg">
                  REDEEM
                </button>
              </div>
              <p className="text-sm">
                Earn extra cash with our exclusive referral program by inviting
                your friends to sign up using your referral code
              </p>
              <div>
                <h1 className="font-bold">Promo Code</h1>
                <div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="py-1 px-2 bg-gray-400 text-blue-600 font-semibold text-center w-fit rounded-lg">
                      {userInfo?.referralCode}
                    </p>
                    <button
                      onClick={handleCopy}
                      className="py-1 px-2 w-full bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                    >
                      {copied ? "Copied!" : "Copy Promo Link"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white  w-full">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
