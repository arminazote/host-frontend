import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ShowToast from "../../component/Toastfy/ShowToast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogInUser, setUser } from "../../component/Redux/ReduxFunction";
import ResetPasswordModal from "./ResetPasswordModal";
import ResetPassword from "./ResetPassword";
import img from "../../assets/ranibajibd.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isResetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [phoneNumberForReset, setPhoneNumberForReset] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogIn = async (data) => {
    setIsLoading(true); // Set loading to true
    dispatch(LogInUser({ data, errors })).then((res) => {
      console.log(errors, data)
      if ("error" in res && res.error) {
        ShowToast({ error: "Your credential is incorrect" });
        setIsLoading(false);
      } else if ("payload" in res && res.payload) {
        const userDetails = res?.payload?.data.user;
        const name = `${userDetails.userName}`;
        const role = userDetails.role;
        const isVerified = userDetails?.isVerified;
        const token = res.payload.data.accessToken;
        dispatch(setUser({ user: { name, role, isVerified }, token }));
        setIsLoading(false);
        localStorage.setItem("showPopup", "true");
        ShowToast({ success: "User Login Successfully" });
        navigate("/");
      }
    });
  };

  const handleOtpVerified = (phoneNumber) => {
    setPhoneNumberForReset(phoneNumber);
    setModalOpen(false);
    setResetPasswordOpen(true);
  };

  const handleForgetPasswordModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(true);
  };

  return (
    <section className="lg:min-h-[600px] min-h-[550px] p-2 bg-[#2d394b] flex items-center justify-center">
      <div className="bg-white lg:w-1/3 md:w-2/3 w-full mx-auto py-10 px-6 sm:px-8 border-2 rounded-lg shadow-lg">
        <div className="text-center">
          <img className="w-48 mx-auto" src={img} alt="logo" />
          <p className="text-lg text-gray-500">Login to your account</p>
        </div>
        <form onSubmit={handleSubmit(handleLogIn)} className="space-y-6 mt-6">
          {/* Username Field */}
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              {...register("userName", { required: "Username is required" })}
              placeholder="Enter your username"
              className={`border w-full p-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.userName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`border w-full p-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={handleForgetPasswordModal}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Forgot your password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
          >
            {isLoading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <ResetPasswordModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onOtpVerified={handleOtpVerified}
        />
        <ResetPassword
          isOpen={isResetPasswordOpen}
          onClose={() => setResetPasswordOpen(false)}
          phoneNumber={phoneNumberForReset}
        />
      </div>
    </section>
  );
};

export default Login;
