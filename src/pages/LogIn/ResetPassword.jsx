import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ShowToast from "../../component/Toastfy/ShowToast";
import Loader from "../../Layout/Loader";

const ResetPassword = ({ isOpen, onClose, phoneNumber }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      primaryPhone: phoneNumber,
      newPassword: data.newPassword,
    };
    setLoading(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        reset();
        ShowToast({ success: "Password reset successful" });
        onClose();
      } else {
        ShowToast({ error: "Failed to reset password:" });
      }
    } catch (error) {
      console.error("Error during password reset:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Loader></Loader>
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
          Reset Password
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              disabled
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              placeholder="Enter your new password"
              className={`w-full p-2 border rounded-lg focus:outline-none ${
                errors.newPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              placeholder="Confirm your password"
              className={`w-full p-2 border rounded-lg focus:outline-none ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-2 rounded-lg hover:opacity-90 transition"
          >
            {loading ? "Resetting Your Password..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
