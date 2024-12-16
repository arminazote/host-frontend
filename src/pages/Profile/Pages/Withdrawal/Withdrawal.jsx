import { useEffect, useState } from "react";
import { ecpay } from "../Deposit/ecpay";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import ShowToast from "../../../../component/Toastfy/ShowToast";
import Loader from "../../../../Layout/Loader";

const Withdrawal = () => {
  const [selectedWallet, setSelectedWallet] = useState("NAGAD");
  const [paymentMethod, setPaymentMethod] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const accessToken = useSelector((state) => state.Auth.token);
  const [user, setUser] = useState(null);

  const userPhones = [
    "Select Number",
    user?.primaryPhone,
    user?.secondaryPhone,
  ].filter((phone) => phone);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/get-me`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        setUser(response.data.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

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
      e_wallet_name: "NAGAD",
    },
  });

  const handleWalletSelection = (wallet) => {
    setSelectedWallet(wallet.name);
    setValue("e_wallet_name", wallet.name);
  };

  const onSubmit = async (data, apiUrl) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          Authorization: accessToken,
        },
      });
      if (response.data.success) {
        ShowToast({ success: "Withdraw request sent successfully" });
      }
    } catch (error) {
      console.log(error);
      ShowToast({ error: error.response.data.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const mPaySubmit = (data) =>
    onSubmit(
      data,
      `${import.meta.env.VITE_API_BASE_URL}/payment/generate-withdraw-owner`
    );

  const okPaySubmit = (data) =>
    onSubmit(data, `${import.meta.env.VITE_API_BASE_URL}/ok-pay/payout-owner`);

  return (
    <div>
      <Loader></Loader>
      {paymentMethod === "MPAY" ? (
        <div className="ml-4 my-3">
          <form onSubmit={handleSubmit(mPaySubmit)}>
            <h1 className="text-2xl font-semibold my-2">
              Withdrawal With MPay Payment Gatewaye
            </h1>
            <h2>Withdrawal Options *</h2>
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
            <h2 className="my-2">Select Phone Number *</h2>
            <select
              {...register("user_account_no", {
                required: "Phone number is required",
              })}
              className="w-72 border-orange-400 border-2 py-[6px] px-2 rounded-xl outline-none"
            >
              {userPhones.map((phone, index) => (
                <option key={index} value={phone}>
                  {phone}
                </option>
              ))}
            </select>
            {errors.user_account_no && (
              <p className="text-red-500 text-sm mt-1">
                {errors.user_account_no.message}
              </p>
            )}
            <h2 className="my-2">Withdrawable Amount *</h2>
            <input
              type="number"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 500, message: "Minimum amount is 500" },
                max: { value: 10000, message: "Maximum amount is 10000" },
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
              className="w-72 border-orange-400 border-2 py-[6px] px-2 rounded-xl outline-none"
              placeholder="500 - 10000"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
            <br />
            <button
              disabled={isSubmitting}
              className="my-4 bg-blue-500 w-72 p-2 text-white rounded-full"
            >
              {isSubmitting ? "Processing..." : "Withdraw"}
            </button>
          </form>
        </div>
      ) : (
        <div className="ml-4 my-3">
          <form onSubmit={handleSubmit(okPaySubmit)}>
            <h1 className="text-2xl font-semibold my-2">
              Withdrawal With OKPay Payment Gatewaye
            </h1>
            <h2>Withdrawal Options *</h2>
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
            <h2 className="my-2">Select Phone Number *</h2>
            <select
              {...register("user_account_no", {
                required: "Phone number is required",
              })}
              className="w-72 border-orange-400 border-2 py-[6px] px-2 rounded-xl outline-none"
            >
              {userPhones.map((phone, index) => (
                <option key={index} value={phone}>
                  {phone}
                </option>
              ))}
            </select>
            {errors.user_account_no && (
              <p className="text-red-500 text-sm mt-1">
                {errors.user_account_no.message}
              </p>
            )}
            <h2 className="my-2">Withdrawable Amount *</h2>
            <input
              type="number"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 200, message: "Minimum amount is 200" },
                max: { value: 10000, message: "Maximum amount is 10000" },
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
              className="w-72 border-orange-400 border-2 py-[6px] px-2 rounded-xl outline-none"
              placeholder="500 - 10000"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
            <br />
            <button
              disabled={isSubmitting}
              className="my-4 bg-blue-500 w-72 p-2 text-white rounded-full"
            >
              {isSubmitting ? "Processing..." : "Withdraw"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Withdrawal;
