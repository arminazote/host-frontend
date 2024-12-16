import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import ShowToast from "../../../../component/Toastfy/ShowToast";
import Loader from "../../../../Layout/Loader";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const accessToken = useSelector((state) => state.Auth.token);

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.put(
        "https://api.ranibaji.com/api/v1/auth/change-password",
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        {
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        ShowToast({ success: "Password changed successfully!" });
        reset();
      }
    } catch (error) {
      if (error.response.status === 400) {
        ShowToast({
          error:
            error.response?.data?.errors[0]?.message || "An error occurred",
        });
      } else if (error.response.status === 401) {
        ShowToast({ error: "Incorrect current password" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="text-xl font-semibold">
      <Loader></Loader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative left-10 top-10 space-y-3"
      >
        {/* Current Password */}
        <div className="relative">
          <label htmlFor="currentPassword" className="text-lg">
            Current Password
          </label>
          <br />
          <div className="flex items-center border-2 border-gray-300  w-[285px] p-2 rounded-xl">
            <input
              type={showPassword.currentPassword ? "text" : "password"}
              id="currentPassword"
              className="focus:outline-none"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("currentPassword")}
            >
              {showPassword.currentPassword ? "👁️" : "🙈"}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-red-500 text-sm">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="relative">
          <label htmlFor="newPassword" className="text-lg">
            New Password
          </label>
          <br />
          <div className="flex items-center border-2 border-gray-300 w-[285px] p-2 rounded-xl">
            <input
              type={showPassword.newPassword ? "text" : "password"}
              id="newPassword"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message:
                    "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
              className="focus:outline-none flex-1"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("newPassword")}
              className="right-2"
            >
              {showPassword.newPassword ? "👁️" : "🙈"}
            </button>
          </div>
          {errors.newPassword && (
            <p className="w-[285px] text-red-500 text-sm">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="relative">
          <label htmlFor="confirmNewPassword" className="text-lg">
            Confirm New Password
          </label>
          <br />
          <div className="flex items-center border-2 border-gray-300  w-[285px] p-2 rounded-xl">
            <input
              type={showPassword.confirmNewPassword ? "text" : "password"}
              id="confirmNewPassword"
              {...register("confirmNewPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              className="focus:outline-none"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirmNewPassword")}
              className="right-2"
            >
              {showPassword.confirmNewPassword ? "👁️" : "🙈"}
            </button>
          </div>
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading} // Disable button while loading
          className={`w-48 p-1 rounded-2xl text-lg text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
          }`}
        >
          {loading ? "Processing..." : "Change Password"}
        </button>
      </form>
    </section>
  );
};

export default ChangePassword;
