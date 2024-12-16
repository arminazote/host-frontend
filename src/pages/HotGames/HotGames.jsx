import React from "react";
import { hotgames } from "../../component/Utils/HotGames/hotgames";
import { useSelector } from "react-redux";
import { FaRegPlayCircle } from "react-icons/fa";
import { Helmet } from "react-helmet";
import useGameHandler from "../../component/Hooks/useGameHandler";

const HotGames = () => {
  const accessToken = useSelector((state) => state.Auth.token);
  const { loadingGame, playGame } = useGameHandler(accessToken);

  return (
    <div className="w-full mt-4 px-1">
      <Helmet>
        <title>Ranibaji - Bangladeshi Top Betting Platform Rani Baji</title>
        <meta
          name="description"
          content="Live hot games and more. Best odds and real-time updates!"
        />
        <meta
          name="keywords"
          content="sports betting, rani baji, live casino , live betting, cricket odds, football odds"
        />
        <link rel="canonical" href="https://ranibaji.com" />
      </Helmet>
      <h1 className="font-bold text-xl mb-4 lg:flex hidden">Hot Games</h1>
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {hotgames.map((game) => (
          <button
            key={game.gameid}
            onClick={() => playGame(game)}
            disabled={loadingGame === game.gameid}
            className="relative bg-white shadow-md rounded-md overflow-hidden cursor-pointer group"
          >
            <img
              src={game.icon}
              alt={game.name}
              className="w-full lg:h-32 h-24 object-cover"
            />
            <div className="p-2">
              <h2 className="text-sm font-bold truncate">{game.name}</h2>
              {loadingGame === game.gameid && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-3xl">
                  <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <p className="text-xs text-gray-500">{game.type}</p>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="font-bold text-lg text-orange-500 px-4 py-2 rounded-md">
                <FaRegPlayCircle className="hover:text-white" size={50} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HotGames;
