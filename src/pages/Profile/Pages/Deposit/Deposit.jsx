import { useEffect, useState } from "react";
import axios from "axios";
import { ecpay } from "./ecpay";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { mpayInfo } from "./mpayInfo";
import Loader from "../../../../Layout/Loader";

const Deposit = () => {
  const [activeButton, setActiveButton] = useState(1);
  const [selectedWallet, setSelectedWallet] = useState("NAGAD");
  const [paymentMethod, setPaymentMethod] = useState();
  const accessToken = useSelector((state) => state.Auth.token);

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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: null,
      e_wallet_name: "NAGAD",
    },
  });

  const handleAmountClick = (value, buttonId) => {
    setValue("amount", value);
    setActiveButton(buttonId);
  };

  const handleWalletSelection = (wallet) => {
    setSelectedWallet(wallet.name);
    setValue("e_wallet_name", wallet.name);
  };

  const mPaySubmit = async (data) => {
    const payload = {
      price: data.amount,
      payType: data.e_wallet_name,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/payment/generate-deposit`,
        payload,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      if (response.data.success) {
        const url = response.data.data.d.h5;
        const width = 500;
        const height = 600;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        const popup = window.open(
          url,
          "_blank",
          `width=${width},height=${height},left=${left},top=${top}`
        );
        if (!popup) {
          alert("Popup blocked. Please allow popups for this site.");
        }
      } else {
        console.log("error: " + response.data);
      }
    } catch (error) {
      console.error("Error submitting deposit request:", error);
    }
  };

  const okPaySubmit = async (data) => {
    const payload = {
      pay_type: data.e_wallet_name,
      money: data.amount,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/ok-pay/payin`,
        payload,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      if (response.data.success) {
        const url = response.data.data.data.url;
        const width = 500;
        const height = 600;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        const popup = window.open(
          url,
          "_blank",
          `width=${width},height=${height},left=${left},top=${top}`
        );
        if (!popup) {
          alert("Popup blocked. Please allow popups for this site.");
        }
      } else {
        console.log("error: " + response.data);
      }
    } catch (error) {
      console.error("Error submitting deposit request:", error);
    }
  };

  return (
    <div>
      <Loader></Loader>
      {paymentMethod === "MPAY" ? (
        <div className="ml-4 my-4">
          <form onSubmit={handleSubmit(mPaySubmit)}>
            <h1 className="text-2xl font-semibold my-2">
              Deposit With MPay Payment Gateway
            </h1>
            <h2>Deposit Options *</h2>
            <div className="flex gap-3 my-2">
              {mpayInfo.map((pay) => (
                <button
                  key={pay.name}
                  type="button"
                  onClick={() => handleWalletSelection(pay)}
                >
                  <img
                    className={`md:w-24 w-16 border-2 rounded-2xl md:h-16 h-12 ${
                      selectedWallet === pay.name
                        ? "border-orange-400 bg-blue-400"
                        : "border-orange-300"
                    }`}
                    src={pay.image}
                    alt={pay.name}
                  />
                </button>
              ))}
            </div>
            <h2 className="my-2">Deposit Amount *</h2>
            <input
              {...register("amount", {
                required: "Amount is required",
                min: { value: 200, message: "Minimum amount is 200" },
                max: { value: 10000, message: "Maximum amount is 10000" },
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
              className="w-72 border-orange-400 border-2 py-[6px] px-2 rounded-xl outline-none"
              placeholder="200 - 10000"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
            <div className="flex flex-wrap w-72 gap-3 my-2">
              {[200, 500, 2000, 5000, 10000].map((amount, index) => (
                <button
                  key={amount}
                  type="button"
                  className={`border-2 p-2 px-4 rounded-2xl ${
                    activeButton === index + 1
                      ? "bg-yellow-400 text-black"
                      : "border-orange-300"
                  }`}
                  onClick={() => handleAmountClick(amount, index + 1)}
                >
                  {amount}
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="my-2 bg-blue-500 w-72 py-2 text-white rounded-full text-xl"
            >
              Deposit
            </button>
          </form>
        </div>
      ) : (
        <div className="ml-4 my-4">
          <form onSubmit={handleSubmit(okPaySubmit)}>
            <h1 className="text-2xl font-semibold my-2">
              Deposit With OKPay Payment Gateway
            </h1>
            <h2>Deposit Options *</h2>
            <div className="flex gap-3 my-2">
              {ecpay.map((pay) => (
                <button
                  key={pay.name}
                  type="button"
                  onClick={() => handleWalletSelection(pay)}
                >
                  <img
                    className={`md:w-24 w-16 border-2 rounded-2xl md:h-16 h-12 ${
                      selectedWallet === pay.name
                        ? "border-orange-400 bg-blue-400"
                        : "border-orange-300"
                    }`}
                    src={pay.image}
                    alt={pay.name}
                  />
                </button>
              ))}
            </div>
            <h2 className="my-2">Deposit Amount *</h2>
            <input
              {...register("amount", {
                required: "Amount is required",
                min: { value: 200, message: "Minimum amount is 200" },
                max: { value: 10000, message: "Maximum amount is 10000" },
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
              className="w-72 border-orange-400 border-2 py-[6px] px-2 rounded-xl outline-none"
              placeholder="200 - 10000"
            />
            <div className="flex flex-wrap w-72 gap-3 my-2">
              {[200, 500, 2000, 5000, 10000].map((amount, index) => (
                <button
                  key={amount}
                  type="button"
                  className={`border-2 p-2 px-4 rounded-2xl ${
                    activeButton === index + 1
                      ? "bg-yellow-400 text-black"
                      : "border-orange-300"
                  }`}
                  onClick={() => handleAmountClick(amount, index + 1)}
                >
                  {amount}
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="my-2 bg-blue-500 w-72 py-2 text-white rounded-full text-xl"
            >
              Deposit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Deposit;
