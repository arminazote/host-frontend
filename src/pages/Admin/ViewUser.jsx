import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import ShowToast from "../../component/Toastfy/ShowToast";

const ViewUser = () => {
  const { id } = useParams();
  const userId = id;
  const accessToken = useSelector((state) => state.Auth.token);
  const loginUserInfo = useSelector((state) => state.Auth.user);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users/${userId}`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId, loginUserInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/users/${userId}`,
        data,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      ShowToast({ success: "User updated successfully!" });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Set default values once userData is available
  useEffect(() => {
    if (userData) {
      setValue("fullName", userData.fullName);
      setValue("userName", userData.userName);
      setValue("primaryPhone", userData.primaryPhone);
      setValue("secondaryPhone", userData.secondaryPhone);
      setValue("level", userData.level);
      setValue("coins", userData.coins);
      setValue("balance", userData.balance); // Format date to YYYY-MM-DD
      setValue("role", userData.role);
      setValue("userStatus", userData.userStatus);
      setValue("totalBetAmount", userData.totalBetAmount);
      setValue("isVerified", userData.isVerified);
      setValue("isDeposit", userData.isDeposit);
      setValue("totalReferBonus", userData.totalReferBonus);
      setValue("referralCode", userData.referralCode);
    }
  }, [userData, setValue]);

  return (
    <div className="flex justify-center items-center min-h-screen lg:p-6 lg:mt-0 mt-16">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="lg:text-3xl text-2xl font-bold text-center text-gray-800 mb-4">
            Update User Info
          </h2>
          <p className="text-sm text-center text-gray-500 mb-8">
            Please update the user details below
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  disabled={!loginUserInfo || loginUserInfo?.role === "USER"}
                  {...register("fullName")}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
                {errors.fullName && (
                  <span className="text-xs text-red-500">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              {/* User Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User Name
                </label>
                <input
                  type="text"
                  disabled={!loginUserInfo || loginUserInfo?.role === "USER"}
                  {...register("userName", {
                    required: "Username is required",
                  })}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
                {errors.userName && (
                  <span className="text-xs text-red-500">
                    {errors.userName.message}
                  </span>
                )}
              </div>

              {/* Primary Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Primary Phone Number
                </label>
                <input
                  type="text"
                  disabled={!loginUserInfo || loginUserInfo?.role === "USER"}
                  {...register("primaryPhone", {
                    required: "Primary Phone number is required",
                  })}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
                {errors.primaryPhone && (
                  <span className="text-xs text-red-500">
                    {errors.primaryPhone.message}
                  </span>
                )}
              </div>

              {/* Secondary Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Secondary Phone Number
                </label>
                <input
                  disabled={!loginUserInfo || loginUserInfo?.role === "USER"}
                  type="text"
                  {...register("secondaryPhone")}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
                {errors.secondaryPhone && (
                  <span className="text-xs text-red-500">
                    {errors.secondaryPhone.message}
                  </span>
                )}
              </div>

              {/* Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User Level
                </label>
                <input
                  disabled={
                    !loginUserInfo ||
                    loginUserInfo?.role === "USER" ||
                    loginUserInfo?.role === "SUB_ADMIN"
                  }
                  type="number"
                  {...register("level", {
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
                {errors.level && (
                  <span className="text-xs text-red-500">
                    {errors.level.message}
                  </span>
                )}
              </div>

              {/* Coins */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Coins
                </label>
                <input
                  disabled={
                    !loginUserInfo ||
                    loginUserInfo?.role === "USER" ||
                    loginUserInfo?.role === "SUB_ADMIN"
                  }
                  type="number"
                  {...register("coins", {
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
                {errors.coins && (
                  <span className="text-xs text-red-500">
                    {errors.coins.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Balance
                </label>
                <input
                  disabled={
                    !loginUserInfo ||
                    loginUserInfo?.role === "USER" ||
                    loginUserInfo?.role === "SUB_ADMIN"
                  }
                  type="number"
                  {...register("balance", {
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
                {errors.balance && (
                  <span className="text-xs text-red-500">
                    {errors.balance.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Refer Bonus
                </label>
                <input
                  disabled={
                    !loginUserInfo ||
                    loginUserInfo?.role === "USER" ||
                    loginUserInfo?.role === "SUB_ADMIN"
                  }
                  type="number"
                  {...register("totalReferBonus", {
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
                {errors.totalReferBonus && (
                  <span className="text-xs text-red-500">
                    {errors.totalReferBonus.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Referral Code
                </label>
                <input
                  disabled
                  type="text"
                  {...register("referralCode")}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  readOnly
                />
                {errors.referralCode && (
                  <span className="text-xs text-red-500">
                    {errors.referralCode.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Bet Amount
                </label>
                <input
                  disabled
                  type="number"
                  {...register("totalBetAmount", {
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  readOnly
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  disabled={
                    !loginUserInfo ||
                    loginUserInfo?.role === "USER" ||
                    loginUserInfo?.role === "SUB_ADMIN"
                  }
                  {...register("role", { required: "Role is required" })}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                >
                  <option value="SUPER_ADMIN">Super Admin</option>
                  <option value="SUB_ADMIN">Sub-Admin</option>
                  <option value="USER">User</option>
                </select>
                {errors.role && (
                  <span className="text-xs text-red-500">
                    {errors.role.message}
                  </span>
                )}
              </div>
              {/* User Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User Status
                </label>
                <select
                  disabled={!loginUserInfo || loginUserInfo?.role === "USER"}
                  {...register("userStatus", {
                    required: "User Status is required",
                  })}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="BLOCKED">BLOCKED</option>
                </select>
                {errors.userStatus && (
                  <span className="text-xs text-red-500">
                    {errors.userStatus.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User Verification
                </label>
                <select
                  disabled={!loginUserInfo || loginUserInfo?.role === "USER"}
                  {...register("isVerified", {
                    setValueAs: (value) => value === "true", // Convert string to boolean
                  })}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                >
                  <option value="true">Verified</option>
                  <option value="false">Not Verified</option>
                </select>
                {errors.isVerified && (
                  <span className="text-xs text-red-500">
                    {errors.isVerified.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Already Deposit
                </label>
                <select
                  disabled={
                    !loginUserInfo ||
                    loginUserInfo?.role === "USER" ||
                    loginUserInfo?.role === "SUB_ADMIN"
                  }
                  {...register("isDeposit", {
                    setValueAs: (value) => value === "true",
                  })}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                {errors.isDeposit && (
                  <span className="text-xs text-red-500">
                    {errors.isDeposit.message}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                disabled={!loginUserInfo || loginUserInfo?.role === "USER"}
                type="submit"
                className="lg:w-1/4 w-full py-3 text-white font-bold rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 transition duration-300"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
