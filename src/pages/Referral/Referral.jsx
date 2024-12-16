import React, { useContext, useState } from "react";
import img from "../../assets/banner/Free-200-Bonus.webp";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../Layout/Loader";
import { ContextSource } from "../../component/ContextAPI/ContextAPI";
const Referral = () => {
  const accessToken = useSelector((state) => state.Auth.token);
  const [copied, setCopied] = useState(false);
  const { userInfo } = useContext(ContextSource);

  const handleCopy = () => {
    if (userInfo?.referralCode) {
      const fullUrl = `https://ranibaji.com/registration?promocode=${userInfo.referralCode}`;
      navigator.clipboard.writeText(fullUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset "Copied" status after 2 seconds
      });
    }
  };
  return (
    <div className="mt-10 md:w-10/12 mx-auto ">
      <Loader></Loader>
      {/* Banner Section */}
      <div>
        <img
          src={img}
          alt="Referral Program Banner"
          className=" w-full  object-cover  rounded-lg"
        />
      </div>
      {/* Registration Section */}
      {accessToken ? (
        <div className="mt-6 bg-yellow-100 p-6 rounded-lg shadow-md text-center relative">
          <h3 className="text-lg font-bold text-yellow-700 mb-2">
            Every friend you refer, you will get free ৳200!
          </h3>
          <p className="text-sm text-yellow-600 mb-4">
            Your friends will receive a free ৳300 too!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleCopy}
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-blue-700 transition"
            >
              {copied ? "Copied!" : "Copy Promo Link"}
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-yellow-600 transition"
              onClick={() => {
                const promoUrl = `https://ranibaji.com/registration?promocode=${userInfo.referralCode}`; // Replace with dynamic promo code if needed
                const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  promoUrl
                )}`;
                window.open(facebookShareUrl, "_blank", "noopener,noreferrer");
              }}
            >
              Share Your Promocode
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 bg-yellow-100 p-6 rounded-lg shadow-md text-center relative">
          <h3 className="text-lg font-bold text-yellow-700 mb-2">
            Every friend you refer, you will get free ৳200!
          </h3>
          <p className="text-sm text-yellow-600 mb-4">
            Your friends will receive a free ৳300 too!
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/registration"
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-blue-700 transition"
            >
              Register Now
            </Link>
            <Link
              to="/login"
              className="bg-yellow-500 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-yellow-600 transition"
            >
              Login
            </Link>
          </div>
        </div>
      )}

      <div className="mt-10 bg-white rounded-lg shadow-md p-6">
        <h4 className="text-xl font-bold text-gray-800 mb-6">
          Lifetime Referral Commission
        </h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-300 rounded-full p-3"></div>
            <div className="flex-1 bg-black text-white p-4 rounded-lg text-center">
              <p className="font-semibold">You</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-center">
            <div className="bg-gray-300 rounded-full p-3"></div>
            <div className="flex-1 bg-gray-200 text-gray-700 p-4 rounded-lg">
              <p className="font-semibold">Tier 1 (1%)</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-center">
            <div className="bg-gray-300 rounded-full p-3"></div>
            <div className="flex-1 bg-gray-200 text-gray-700 p-4 rounded-lg">
              <p className="font-semibold">Tier 2 (0.7%)</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-center">
            <div className="bg-gray-300 rounded-full p-3"></div>
            <div className="flex-1 bg-gray-200 text-gray-700 p-4 rounded-lg">
              <p className="font-semibold">Tier 3 (0.3%)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;
