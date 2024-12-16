import { Link, Outlet } from "react-router-dom";
import banner from "../../assets/allbanner/sports.jpg";
import img2 from "../../assets/allbanner/ranibajibd.png";
import { Helmet } from "react-helmet";
import Saba from "./Saba";
import Loader from "../../Layout/Loader";
const Sportsbook = () => {
  return (
    <div>
      <Loader></Loader>
      <Helmet>
        <title> Sports Games | Ranibaji</title>
        <meta
          name="description"
          content="Live sportsbook games and more. Best odds and real-time updates!"
        />
        <meta
          name="keywords"
          content="sports betting, live casino , live betting, cricket odds, football odds"
        />
        <link rel="canonical" href="https://ranibaji.com/sportsbook" />
      </Helmet>
      <div className="relative">
        <img src={banner} alt="sports Background" className="w-full md:h-80 object-cover" />
        <img
          src={img2}
          alt="logo"
          className="absolute md:w-60 w-32 top-1/2 right-10 transform -translate-y-1/2"
        />
      </div>
      {/* <div className="md:w-10/12 flex gap-4 items-center w-11/12 mx-auto my-8">
        <Link to="/sportsbook/saba">
          <button className="border-2 rounded-full px-6 md:flex md:items-center gap-1 border-yellow-500 p-2 hover:bg-yellow-500 active:bg-yellow-500">
            <h2 className="text-base ">SABA Sport</h2>
          </button>
        </Link>
      </div> */}
      <Saba></Saba>
    </div>
  );
};

export default Sportsbook;
