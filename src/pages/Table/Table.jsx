import { Link, Outlet } from "react-router-dom";
import img from "../../assets/allbanner/table3.webp";
import img2 from "../../assets/allbanner/ranibajibd.png";
import { Helmet } from "react-helmet";
import { useState } from "react";
import jili from '../../assets/categories/JILI.webp';
import Kingmaker from '../../assets/categories/KM.webp';
import Loader from "../../Layout/Loader";

const Table = () => {
  const [activeButton, setActiveButton] = useState("");

  const buttonClasses = (buttonId) =>
    `flex items-center gap-2 md:border-2 rounded-full p-2 px-4 
    md:border-yellow-500 md:bg-transparent
    ${activeButton === buttonId ? "md:bg-yellow-500 md:border-yellow-500" : "md:hover:bg-yellow-500"}
    md:flex-row justify-center md:w-full w-auto block md:text-left text-center`;

  const tables = [
    {
      id: "jili",
      label: "Jili",
      img: jili,
      link: "/table/jili", // Define the link for the Jili table
    },
    {
      id: "km",
      label: "King Maker",
      img: Kingmaker,
      link: "/table/km", // Define the link for the King Maker table
    },
  ];

  return (
    <div>
      <Loader></Loader>
      <Helmet>
        <title>Table Games | Ranibaji</title>
        <meta
          name="description"
          content="Live table games and more. Best odds and real-time updates!"
        />
        <meta
          name="keywords"
          content="sports betting, table, live casino, live betting, cricket odds, football odds"
        />
        <link rel="canonical" href="https://ranibaji.com/table" />
      </Helmet>

      {/* Background with Logo */}
      <div className="relative">
        <img src={img} alt="Table Background" className="w-full md:h-96 h-32 object-cover" />
        <img
          src={img2}
          alt="logo"
          className="absolute md:w-60 w-24 top-1/2 right-0 transform -translate-y-1/2"
        />
      </div>

      {/* Grid for Buttons */}
      <div className="grid md:w-10/12 my-6 mx-auto lg:grid-cols-6 grid-cols-2 md:gap-4 gap-2 items-center">
        {tables.map((button) => (
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
      <div className="divider divider-warning my-4"></div>

      <Outlet />
    </div>
  );
};

export default Table;
