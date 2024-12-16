import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";
import img from "../../assets/allbanner/fishing3.webp";
import img2 from "../../assets/allbanner/ranibajibd.png";
import jili from '../../assets/categories/JILI.webp';
import Loader from "../../Layout/Loader";

const Fishing = () => {
  const [activeButton, setActiveButton] = useState("");

  // Button styling logic
  const buttonClasses = (buttonId) =>
    `flex items-center gap-2 md:border-2 rounded-full p-2 px-4 md:border-yellow-500 md:bg-transparent ${
      activeButton === buttonId
        ? "md:bg-yellow-500 md:border-yellow-500"
        : "md:hover:bg-yellow-500"
    } md:flex-row justify-center md:w-full w-auto block md:text-left text-center`;

  // Fishing games data
  const fishingGames = [
    {
      id: "jili",
      label: "Jili",
      img: jili,
      link: "/fishing/jili",
    },
  ];

  return (
    <div>
      <Loader></Loader>
      {/* SEO Helmet */}
      <Helmet>
        <title>Fishing Games | Ranibaji 2025</title>
        <meta
          name="description"
          content="Live hot games and more. Best odds and real-time updates!"
        />
        <meta
          name="keywords"
          content="sports betting, fishing, live casino, live betting, cricket odds, football odds"
        />
        <link rel="canonical" href="https://ranibaji.com" />
      </Helmet>

      {/* Header Section with Background Image */}
      <div className="relative">
        <img
          src={img}
          alt="Fishing Background"
          className="w-full object-cover md:h-80 h-32"
        />
        <img
          src={img2}
          alt="Ranibaji Logo"
          className="absolute md:w-60 w-32 top-6 md:right-10 right-0 transform -translate-y-1/2"
        />
      </div>

      {/* Game Buttons Grid */}
      <div className="grid md:w-10/12 my-6 mx-auto lg:grid-cols-6 grid-cols-2 md:gap-4 gap-2 items-center">
        {fishingGames.map(({ id, label, img, link }) => (
          <Link key={id} to={link}>
            <button
              className={buttonClasses(id)}
              onClick={() => setActiveButton(id)}
            >
              <img
                className="md:w-12 w-72 md:h-auto h-24"
                src={img}
                alt={label}
              />
              {/* Text only for Desktop */}
              <span className="hidden md:inline-block md:text-sm font-semibold">
                {label}
              </span>
            </button>
          </Link>
        ))}
      </div>

      <div className="my-4 divider divider-warning"></div>

      {/* Render Outlet for nested routes */}
      <Outlet />
    </div>
  );
};

export default Fishing;
