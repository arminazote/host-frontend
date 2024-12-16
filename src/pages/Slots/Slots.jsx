import { Link, Outlet } from "react-router-dom";
import img from "../../assets/allbanner/slots3.webp";
import img2 from "../../assets/allbanner/ranibajibd.png";
import { Helmet } from "react-helmet";
import { useState } from "react";
import jili from '../../assets/categories/JILI.webp';
import jdb from '../../assets/categories/JDB.webp';
import easy from '../../assets/categories/easy.jpg';
import pragmatic from '../../assets/categories/ld_pp.webp';
import redtiger from '../../assets/categories/redtiger.jpg';
import pgsoft from '../../assets/categories/PG.webp';
import Loader from "../../Layout/Loader";

const Slots = () => {
  const [activeButton, setActiveButton] = useState("");

  const buttonClasses = (buttonId) =>
    `flex items-center gap-2 md:border-2 rounded-full p-2 px-4 justify-center w-full md:bg-transparent md:border-yellow-500 ${
      activeButton === buttonId
        ? "md:bg-yellow-500 md:border-yellow-500"
        : "md:hover:bg-yellow-500"
    } md:text-left text-center`;

  const slots = [
    {
      id: "jili",
      label: "Jili",
      img: jili,
    },
    {
      id: "pragmatic",
      label: "Pragmatic",
      img: pragmatic,
    },
    {
      id: "pgsoft",
      label: "PG Soft",
      img: pgsoft,
    },
    {
      id: "jdb",
      label: "JDB",
      img: jdb,
    },
    {
      id: "easy",
      label: "Easy Gaming",
      img: easy,
    },
    {
      id: "redtiger",
      label: "Red Tiger",
      img: redtiger,
    },
  ];

  return (
    <div>
      <Loader></Loader>
      <Helmet>
        <title>Slots Games | Ranibaji</title>
        <meta
          name="description"
          content="Live slots and more. Best odds and real-time updates!"
        />
        <meta
          name="keywords"
          content="sports betting, slots, live casino, live betting, cricket odds, football odds"
        />
        <link rel="canonical" href="https://ranibaji.com/slots" />
      </Helmet>

      {/* Header Section with Background Image */}
      <div className="relative">
        <img src={img} alt="Slots" className="w-full md:h-80 h-32 object-cover" />
        <img
          src={img2}
          alt="Ranibaji Logo"
          className="absolute md:w-60 w-20 top-1/2 left-0 transform -translate-y-1/2"
        />
      </div>

      {/* Slots Game Buttons */}
      <div className="grid md:w-10/12 my-6 mx-auto lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4 items-center">
        {slots.map(({ id, label, img }) => (
          <div key={id} className="relative">
            <Link to={`/slots/${id}`}>
              <button
                className={buttonClasses(id)}
                onClick={() => setActiveButton(id)}
              >
                <img
                  className="lg:w-10 w-full lg:h-6 h-24"
                  src={img}
                  alt={label}
                />
                {/* Text Overlay for Easy Gaming (Visible only on mobile) */}
                {id === "easy" && (
                  <span className="absolute inset-0 flex ml-16 items-center justify-center text-white font-bold text-xl sm:block lg:hidden">
                    EASY
                  </span>
                )}
                {/* Hide label on mobile, show on larger screens */}
                <h2 className="hidden sm:block md:text-lg lg:text-sm text-xs font-semibold">
                  {label}
                </h2>
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div className="my-4 divider divider-warning"></div>

      {/* Render Outlet for nested routes */}
      <Outlet />
    </div>
  );
};

export default Slots;
