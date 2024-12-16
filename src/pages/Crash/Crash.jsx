import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";
import img from "../../assets/allbanner/crash3.webp";
import img2 from "../../assets/allbanner/ranibajibd.png";
import jilimobile from "../../assets/categories/JILI.webp";
import spribemobile from "../../assets/categories/SPB.webp";
import Loader from "../../Layout/Loader";

const Crash = () => {
  const [activeButton, setActiveButton] = useState("jili");

  const crashButtons = [
    {
      id: "jili",
      label: "Jili",
      img: jilimobile,
      link: "/crash/jili",
    },
    {
      id: "spribe",
      label: "Spribe",
      img: spribemobile,
      link: "/crash/spribe",
    },
  ];

  const buttonClasses = (buttonId) =>
    `flex items-center gap-2 md:border-2 rounded-full p-2 px-4 
    md:border-yellow-500 md:bg-transparent
    ${
      activeButton === buttonId
        ? "md:bg-yellow-500 md:border-yellow-500"
        : "md:hover:bg-yellow-500"
    }
    md:flex-row justify-center md:w-full w-auto block md:text-left text-center`;

  return (
    <div>
      <Loader></Loader>
      <Helmet>
        <title>Crash Games | Ranibaji Betting Platform</title>
        <meta
          name="description"
          content="Explore the best Crash games, live updates, and top odds."
        />
        <meta
          name="keywords"
          content="crash games, live games, betting platform, Jili, Spribe"
        />
        <link rel="canonical" href="https://ranibaji.com/crash" />
      </Helmet>

      {/* Crash Header */}
      <div className="relative">
        <img
          src={img}
          alt="Crash Background"
          className="w-full md:h-80 object-cover h-32"
        />
        <img
          src={img2}
          alt="logo"
          className="absolute md:w-60 w-32 top-6 md:right-10 right-0 transform -translate-y-1/2"
        />
      </div>

      {/* Crash Buttons */}
      <div className="grid md:w-10/12 my-6 mx-auto lg:grid-cols-6 grid-cols-2 md:gap-4 gap-2 items-center">
        {crashButtons.map((button) => (
          <Link key={button.id} to={button.link}>
            <button
              className={buttonClasses(button.id)}
              onClick={() => setActiveButton(button.id)}
            >
              <img
                className="md:w-12 w-72 md:h-auto h-24"
                src={button.img}
                alt={button.label}
              />
              {/* Text only for Desktop */}
              <span className="hidden md:inline-block md:text-sm font-semibold">
                {button.label}
              </span>
            </button>
          </Link>
        ))}
      </div>

      <div className="my-4 divider divider-warning"></div>

      <Outlet />
    </div>
  );
};

export default Crash;
