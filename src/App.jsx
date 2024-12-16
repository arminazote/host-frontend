import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import { useSelector } from "react-redux";
import BottomMenue from "./component/BottomMenue";
import Loader from "./Layout/Loader";

function App() {
  const location = useLocation();
  const pathname = location.pathname; // Get current route
  const user = useSelector((state) => state.Auth.user);

  const isAuthRoute = pathname === "/registration" || pathname === "/login";

  return (
    <>
      <Loader></Loader>
      {user && <BottomMenue />}
      {!isAuthRoute && <Navbar />}
      <Outlet />
      {!isAuthRoute && <Footer />}
    </>
  );
}

export default App;
