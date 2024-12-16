import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Assuming you're using Redux Persist

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.Auth.user); // Access user from Redux

  if (!user) {
    // Redirect if not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect if the role is not allowed
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
