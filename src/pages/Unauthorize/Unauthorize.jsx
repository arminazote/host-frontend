import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-500 to-purple-600 text-white">
      <div className="bg-white text-red-600 p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
        <h1 className="text-4xl font-extrabold mb-4">Access Denied</h1>
        <p className="text-lg text-gray-700 mb-6">
          You do not have permission to access this page. Please check with your
          administrator or log in with a different account.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
        >
          Go to Login
        </button>
      </div>
      <p className="text-white mt-6 text-sm">
        If you believe this is an error, please contact support.
      </p>
    </div>
  );
};

export default Unauthorized;
