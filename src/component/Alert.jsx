import React from "react";

const Alert = () => {
  return (
    <div className="relative lg:w-9/12 w-full lg:mx-auto overflow-hidden h-10 bg-gray-700 rounded-md mt-4">
      <div className="whitespace-nowrap animate-marquee text-white font-medium px-4 mt-1">
        <span className="text-red-400 font-bold">Scam Alert:</span> Dear
        members, please do not share your login credentials, payment receipt,
        and OTP with anyone to ensure your account is secure. If you need
        assistance, contact us via live chat at the right bottom.
      </div>
    </div>
  );
};

export default Alert;
