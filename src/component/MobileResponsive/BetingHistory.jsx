import { useState } from "react";
import { FaMoneyBillWave, FaGift, FaRegCreditCard } from "react-icons/fa";
import MyBethistory from "../../pages/Profile/Pages/MyBethistory/MyBethistory";
import Turnover from "../../pages/Profile/Pages/Turnover/Turnover";
import History from "../../pages/Profile/Pages/History/History";

const BetingHistory = () => {
  const [selectedOption, setSelectedOption] = useState("Bet History");
  const [activeButton, setActiveButton] = useState("Deposit");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(`Selected: ${event.target.value}`);
  };

  const renderContent = () => {
    if (selectedOption === "Bet History") {
      return <MyBethistory />;
    } else if (selectedOption === "Turnover History") {
      return <Turnover />;
    } else if (selectedOption === "Wallet History") {
      return (
        <div className="mt-4 text-center">
          <div className="flex justify-center flex-wrap gap-4 mb-4">
            {[
              { label: "Deposit", icon: <FaMoneyBillWave /> },
              { label: "Withdrawal", icon: <FaRegCreditCard /> },
              { label: "Bonus", icon: <FaGift /> },
            ].map((button) => (
              <button
                key={button.label}
                onClick={() => setActiveButton(button.label)}
                className={`${
                  activeButton === button.label ? "bg-gray-600" : "bg-gray-300"
                } text-black flex items-center gap-2 px-4 py-2 rounded`}
              >
                {button.icon}
                <span>{button.label}</span>
              </button>
            ))}
          </div>
          <div className="divider"></div>
          <History activeButton={activeButton} />
        </div>
      );
    }
  };

  return (
    <div className="md:w-10/12 mx-auto min-h-screen">
      <h2 className="bg-black text-yellow-500 py-4 text-center text-xl">
        History
      </h2>
      <div className="flex px-4 justify-center mt-4">
        <select
          value={selectedOption}
          onChange={handleChange}
          className="bg-gray-100 border-none w-full text-center text-black rounded px-4 py-2"
        >
          <option value="Bet History">Bet History</option>
          <option value="Turnover History">Turnover History</option>
          <option value="Wallet History">Wallet History</option>
        </select>
      </div>
      <div className="mt-4 text-center">{renderContent()}</div>
    </div>
  );
};

export default BetingHistory;
