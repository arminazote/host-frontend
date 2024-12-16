import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ShowToast from "../../component/Toastfy/ShowToast";

const ManagePayment = () => {
  const accessToken = useSelector((state) => state.Auth.token);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState(null);
  const [selectedGateway, setSelectedGateway] = useState("MPAY");

  useEffect(() => {
    const fetchPaymentMethod = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/pay/get-payment-method`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          setPaymentMethod(response.data.data.paymentMethod);
        } else {
          ShowToast({ error: "Failed to fetch active payment method." });
        }
      } catch (error) {
        ShowToast({
          error:
            error.response?.data?.message || "Error fetching payment method.",
        });
      }
    };

    fetchPaymentMethod();
  }, [accessToken]);

  const handleUpdatePayment = async () => {
    try {
      setIsLoading(true);
      setMessage("");

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/pay/update-dual-payment`,
        { paymentMethod },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        ShowToast({ success: "Payment method updated successfully!" });
      } else {
        ShowToast({ error: "Failed to update payment method." });
      }
    } catch (error) {
      ShowToast({
        error: error.response?.data?.message || "An error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckBalance = async () => {
    try {
      setBalanceLoading(true);
      setBalance(null);

      const url =
        selectedGateway === "MPAY"
          ? `${import.meta.env.VITE_API_BASE_URL}/payment/check-balance`
          : `${import.meta.env.VITE_API_BASE_URL}/ok-pay/check-balance`;

      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        {
          selectedGateway === "MPAY"
            ? setBalance(response.data.data.balance)
            : setBalance(response.data.data.balance);
        }

        ShowToast({ success: "Balance retrieved successfully!" });
      } else {
        ShowToast({ error: "Failed to fetch balance." });
      }
    } catch (error) {
      ShowToast({
        error: error.response?.data?.message || "Error fetching balance.",
      });
    } finally {
      setBalanceLoading(false);
    }
  };

  return (
    <div className="py-6 lg:p-6 bg-gray-100 flex justify-center items-center lg:mt-0 mt-16">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Manage Dual Payment
        </h2>

        {/* Payment Method Section */}
        <label className="block text-gray-600 text-sm mb-2">
          Select Payment Method:
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="MPAY">MPAY</option>
          <option value="OKPAY">OKPAY</option>
        </select>
        <button
          onClick={handleUpdatePayment}
          disabled={isLoading}
          className={`mt-4 w-full px-4 py-2 text-white rounded-lg 
            ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {isLoading ? "Updating..." : "Update Payment Method"}
        </button>

        {/* Check Balance Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Check Balance
          </h3>
          <label className="block text-gray-600 text-sm mb-2">
            Select Gateway:
          </label>
          <select
            value={selectedGateway}
            onChange={(e) => setSelectedGateway(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="MPAY">MPAY</option>
            <option value="OKPAY">OKPAY</option>
          </select>

          <button
            onClick={handleCheckBalance}
            disabled={balanceLoading}
            className={`mt-4 w-full px-4 py-2 text-white rounded-lg 
              ${
                balanceLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
          >
            {balanceLoading ? "Checking..." : "Check Balance"}
          </button>

          {balance !== null && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
              <p className="text-lg font-medium text-gray-700">
                Balance: <span className="text-green-600">{balance} TK</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagePayment;
