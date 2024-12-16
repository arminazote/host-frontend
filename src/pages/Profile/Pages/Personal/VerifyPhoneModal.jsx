import React, { useState } from "react";
import axios from "axios";
import { TbReload } from "react-icons/tb";
import ShowToast from "../../../../component/Toastfy/ShowToast";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../../component/Redux/ReduxFunction";

const VerifyPhoneModal = ({ isOpen, onClose, phone, onVerified }) => {
  const [generatedCode, setGeneratedCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [OTPloading, setOTPLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const dispatch = useDispatch();

  const generateRandomCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedCode(code);
    setEnteredCode("");
    setErrorMessage("");
  };

  React.useEffect(() => {
    if (isOpen) {
      generateRandomCode();
    }
  }, [isOpen]);

  const handleRequestOtp = async () => {
    if (cooldown) return;
    if (enteredCode !== generatedCode) {
      setErrorMessage("Verification code does not match!");
      return;
    }
    if (phoneNumber !== phone) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/send-otp`,
        {
          numbers: `${phoneNumber}`,
        }
      );

      if (response.status === 200) {
        ShowToast({ success: "OTP sent successfully!" });
        setTimeRemaining(120);
        setErrorMessage("");
        setCooldown(true);
        const interval = setInterval(() => {
          setTimeRemaining((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setCooldown(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        setTimeout(() => {
          setCooldown(false);
        }, 120000);
      } else {
        setErrorMessage("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage(
        "An error occurred while sending the OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Function to verify OTP via API
  const handleVerifyOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }
    if (!enteredOtp) {
      setErrorMessage("Please enter the OTP.");
      return;
    }
    setOTPLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/verify-phone`,
        {
          numbers: `${phoneNumber}`,
          otp: Number(enteredOtp),
        }
      );

      if (response.status === 200) {
        ShowToast({ success: "OTP verified successfully!" });
        dispatch(updateUser({ isVerified: true }));
        onClose();
        onVerified();
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      ShowToast({ error: "Error verifying OTP" });
      setErrorMessage(
        "An error occurred while verifying the OTP. Please try again."
      );
    } finally {
      setOTPLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          ✖
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Verify Phone Number
        </h2>
        <label
          htmlFor="enteredCode"
          className="block text-gray-700 font-semibold mb-2"
        >
          Enter Verification Code <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 mb-4">
          <div className="flex-1">
            <input
              type="text"
              id="enteredCode"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              placeholder="Enter the verification code"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="text-center">
            <button
              onClick={generateRandomCode}
              className="flex gap-2 px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300"
            >
              {generatedCode}
              <TbReload className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 font-semibold mb-2"
          >
            Enter your phone number for verify{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <span className="bg-gray-200 border border-gray-300 px-3 py-2 rounded-l-lg text-gray-600">
              +880
            </span>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Fill up here"
              className="flex-1 border-t border-b border-r border-gray-300 rounded-r-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        <div className="flex gap-2 mb-4">
          <button
            disabled={loading || cooldown} // Disable if loading or in cooldown
            onClick={handleRequestOtp}
            className={`w-1/2 bg-yellow-400 text-black font-bold p-2 rounded-lg transition ${
              loading || cooldown
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-yellow-500"
            }`}
          >
            {loading ? "Requesting For OTP..." : "Request OTP"}
          </button>
          <input
            type="number"
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border w-1/2 border-gray-300 rounded-lg p-2 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <button
            disabled={OTPloading}
            onClick={handleVerifyOtp}
            className="w-full bg-black text-white font-bold py-2 rounded-lg hover:bg-gray-800 transition"
          >
            {OTPloading ? "Verifying OTP..." : "Verify Phone Number"}
          </button>
        </div>
        {cooldown && (
          <div className="text-center mt-4 text-yellow-600">
            {formatTime(timeRemaining)} remaining to request OTP
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyPhoneModal;
