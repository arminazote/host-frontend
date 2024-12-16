import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import ShowToast from "../../component/Toastfy/ShowToast";

const WithdrawModal = ({
  isOpen,
  onClose,
  title,
  data,
  accessToken,
  updateStatus,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState();

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/pay/get-payment-method`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        setPaymentMethod(response.data.data.paymentMethod);
      } catch (err) {
        console.error("Error fetching withdrawals:", err);
      }
    };

    fetchWithdrawals();
  }, []);

  if (!isOpen) return null;

  const mpayOnSubmit = async (formData) => {
    setIsLoading(true);
    const payload = {
      bankMark: data.e_wallet_name,
      money: parseFloat(formData.amount),
      recAcc: data.user_account_no,
      remark: formData.remark || "default remark",
      withdrawId: data.id,
    };

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/payment/generate-withdraw-provider/${data.userId}`,
        payload,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      if (response.data.data.code === 0) {
        updateStatus(data.id, "APPROVED");
        ShowToast({ success: "Withdraw approved successfully!" });
        reset();
        onClose();
      } else {
        ShowToast({ error: "Cannot process withdraw request" });
      }
    } catch (error) {
      console.error("API Error:", error);
      ShowToast({ error: "An error occurred while processing the request." });
    } finally {
      setIsLoading(false);
    }
  };

  const okpayOnSubmit = async (formData) => {
    setIsLoading(true);
    const payload = {
      pay_type: data.e_wallet_name,
      account: data.user_account_no,
      money: parseInt(formData.amount),
      attach: data.userId,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/ok-pay/payout/${data.id}`,
        payload,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      console.log("frontend: ", response.data);
      if (response.data.data.code === 0) {
        updateStatus(data.id, "APPROVED");
        ShowToast({ success: "Withdraw approved successfully!" });
        reset();
        onClose();
      } else {
        ShowToast({ error: "Cannot process withdraw request" });
      }
    } catch (error) {
      console.error("API Error:", error);
      ShowToast({ error: "An error occurred while processing the request." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      {paymentMethod === "MPAY" ? (
        <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-lg transition-transform transform scale-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              {title} MPay Gateway
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <IoClose size={28} />
            </button>
          </div>
          <form onSubmit={handleSubmit(mpayOnSubmit)}>
            <div className="space-y-4 mb-6">
              <p className="text-gray-600">
                <strong className="text-gray-800">Username:</strong>{" "}
                {data.userName}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Account:</strong>{" "}
                {data.user_account_no}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Status:</strong> {data.status}
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="amount"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                {...register("amount", { required: "Amount is required" })}
                defaultValue={data.amount}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="remark"
              >
                Remark
              </label>
              <input
                type="text"
                id="remark"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                {...register("remark")}
                placeholder="Optional remark"
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`px-6 py-2 font-medium rounded-md shadow-md text-white focus:outline-none focus:ring ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Approve"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-lg transition-transform transform scale-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              {title} OKPay Gateway
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <IoClose size={28} />
            </button>
          </div>
          <form onSubmit={handleSubmit(okpayOnSubmit)}>
            <div className="space-y-4 mb-6">
              <p className="text-gray-600">
                <strong className="text-gray-800">Username:</strong>{" "}
                {data.userName}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Account:</strong>{" "}
                {data.user_account_no}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Status:</strong> {data.status}
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="amount"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                {...register("amount", { required: "Amount is required" })}
                defaultValue={data.amount}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="remark"
              >
                Remark
              </label>
              <input
                type="text"
                id="remark"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                {...register("remark")}
                placeholder="Optional remark"
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`px-6 py-2 font-medium rounded-md shadow-md text-white focus:outline-none focus:ring ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Approve"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default WithdrawModal;
