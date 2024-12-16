import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Users = () => {
  const accessToken = useSelector((state) => state.Auth.token);
  const loginUserInfo = useSelector((state) => state.Auth.user);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        setUsers(response.data.data);
      } catch (err) {
        console.error("Error fetching deposit data:", err);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      (user.userName.toLowerCase().includes(search.toLowerCase()) ||
        user.primaryPhone.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter ? user.role === roleFilter : true)
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== selectedUser.id)
    );
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  // Get the users for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="py-6 lg:p-6 bg-gray-100 rounded shadow-md lg:mt-0 mt-16">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-2">User Management</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="p-2 border border-gray-300 rounded w-full lg:w-1/3 md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded w-full lg:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="USER">User</option>
          <option value="SUPER_ADMIN">Super Admin</option>
          <option value="SUB_ADMIN">Sub Admin</option>
        </select>
      </div>

      {/* Desktop View: User Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left font-semibold">SL</th>
              <th className="p-3 text-left font-semibold">Username</th>
              <th className="p-3 text-left font-semibold">Phone</th>
              <th className="p-3 text-left font-semibold">Balance</th>
              <th className="p-3 text-left font-semibold">Role</th>
              <th className="p-3 text-left font-semibold">Status</th>
              <th className="p-3 text-left font-semibold">Verified</th>
              {loginUserInfo && loginUserInfo?.role === "SUPER_ADMIN" && (
                <th className="p-3 text-left font-semibold">Actions</th>
              )}

              <th className="text-left font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-blue-100`}
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{user.userName}</td>
                  <td className="p-3">{user.primaryPhone}</td>
                  <td className="p-3">{user.balance}</td>
                  <td
                    className={`p-3 text-sm font-bold ${
                      user.role === "SUPER_ADMIN"
                        ? "text-green-500"
                        : user.role === "SUB_ADMIN"
                        ? "text-blue-500"
                        : "text-gray-700"
                    }`}
                  >
                    {user.role === "SUPER_ADMIN"
                      ? "Super Admin"
                      : user.role === "SUB_ADMIN"
                      ? "Sub Admin"
                      : "User"}
                  </td>
                  <td
                    className={`p-3 text-sm font-bold ${
                      user.userStatus === "ACTIVE"
                        ? "text-green-500"
                        : "text-red-700"
                    }`}
                  >
                    {user.userStatus === "ACTIVE" ? "Active" : "Blocked"}
                  </td>
                  <td
                    className={`p-3 text-sm font-bold ${
                      user.isVerified ? "text-green-500" : "text-red-700"
                    }`}
                  >
                    {user.isVerified ? "True" : "False"}
                  </td>
                  {loginUserInfo && loginUserInfo?.role === "SUPER_ADMIN" && (
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleDelete(user)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  )}

                  <td>
                    <Link
                      to={`/admin/users/${user.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View: User Cards */}
      <div className="md:hidden">
        {currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-md mb-4 p-4 flex flex-col gap-3 border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700">Username:</span>
                <span>{user.userName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700">Phone:</span>
                <span>{user.primaryPhone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700">Balance:</span>
                <span>{user.balance} TK</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700">Role:</span>
                <span
                  className={`${
                    user.role === "SUPER_ADMIN"
                      ? "text-green-500"
                      : user.role === "SUB_ADMIN"
                      ? "text-blue-500"
                      : "text-gray-700"
                  }`}
                >
                  {user.role === "SUPER_ADMIN"
                    ? "Super Admin"
                    : user.role === "SUB_ADMIN"
                    ? "Sub Admin"
                    : "User"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700">Status:</span>
                <span
                  className={`${
                    user.userStatus === "ACTIVE"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {user.userStatus === "ACTIVE" ? "Active" : "Blocked"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700">Verified:</span>
                <span
                  className={`${
                    user.isVerified ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {user.isVerified ? "True" : "False"}
                </span>
              </div>

              <div className="flex gap-2 justify-end">
                {loginUserInfo && loginUserInfo?.role === "SUPER_ADMIN" && (
                  <button
                    onClick={() => handleDelete(user)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}

                <Link
                  to={`/admin/users/${user.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit Info
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">No users found.</div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-200 px-4 py-2 rounded-l hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } px-4 py-2 hover:bg-gray-300`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="bg-gray-200 px-4 py-2 rounded-r hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="mb-4">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
