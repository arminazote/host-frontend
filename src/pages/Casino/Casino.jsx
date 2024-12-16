import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";
import img from "../../assets/allbanner/casino3.webp";
import img2 from "../../assets/allbanner/ranibajibd.png";
import evo from "../../../public/evolution-removebg-preview.png";
import ezugi from "../../../public/ezugi-removebg-preview.png";
import pt from "../../../public/playtech-removebg-preview.png";
import pragmatic from "../../../public/pragmatic-removebg-preview.png";
import evo2 from "../../assets/allbanner/ld_evo.webp";
import pragmatic2 from "../../assets/allbanner/ld_pp.webp";
import playtech2 from "../../assets/allbanner/ld_pt.webp";
import ezugi2 from "../../assets/allbanner/ezugi.jpg";
import Loader from "../../Layout/Loader";

const Casino = () => {
  const [activeButton, setActiveButton] = useState("evo");

  const casinoButtons = [
    {
      id: "evo",
      label: "Evolution",
      desktopImg: evo,
      mobileImg: evo2,
      link: "/live-casino/evo",
    },
    {
      id: "pragmatic",
      label: "Pragmatic",
      desktopImg: pragmatic,
      mobileImg: pragmatic2,
      link: "/live-casino/pragmatic",
    },
    {
      id: "ezugi",
      label: "Ezugi",
      desktopImg: ezugi,
      mobileImg: ezugi2,
      link: "/live-casino/ezugi",
    },
    {
      id: "pt",
      label: "Playtech",
      desktopImg: pt,
      mobileImg: playtech2,
      link: "/live-casino/pt",
    },
  ];

  const buttonClasses = (buttonId) =>
    `flex items-center gap-2 md:border-2  rounded-full p-2 px-4 
    md:border-yellow-500 md:bg-transparent
    ${activeButton === buttonId ? "md:bg-yellow-500 md:border-yellow-500" : "md:hover:bg-yellow-500"}
    md:flex-row justify-center 
    md:w-full w-auto block md:text-left text-center`;

  return (
    <div>
      <Loader></Loader>
      <Helmet>
        <title>Live Casino Games | Ranibaji Betting Platform</title>
        <meta
          name="description"
          content="Live casino games and more. Best odds and real-time updates!"
        />
        <meta
          name="keywords"
          content="sports betting, live casino , live betting, cricket odds, football odds"
        />
        <link rel="canonical" href="https://ranibaji.com/live-casino" />
      </Helmet>

      {/* Casino Header */}
      <div className="relative">
        <img src={img} alt="Casino Background" className="w-full md:h-80 object-cover h-32" />
        <img
          src={img2}
          alt="logo"
          className="absolute md:w-60 w-32 top-1/2 md:right-10 right-0 transform -translate-y-1/2"
        />
      </div>

      {/* Casino Buttons */}
      <div className="grid md:w-10/12 my-6 mx-auto md:grid-cols-4 grid-cols-2 md:gap-4 gap-2 items-center">
        {casinoButtons.map((button) => (
          <Link key={button.id} to={button.link}>
            <button
              className={buttonClasses(button.id)}
              onClick={() => setActiveButton(button.id)}
            >
              <picture>
                <source srcSet={button.mobileImg} media="(max-width: 768px)" />
                <img
                  className="md:w-12 w-80 md:h-auto h-24" // Mobile and Desktop Image
                  src={button.desktopImg}
                  alt={button.label}
                />
              </picture>
              {/* Text only for Desktop */}
              <span className="hidden md:inline-block md:text-sm font-semibold">
                {button.label}
              </span>
            </button>
          </Link>
        ))}
      </div>
      <div className="my-4 divider divider-warning">
        <input type="text" />

      </div>

      <Outlet />
    </div>
  );
};

export default Casino;
