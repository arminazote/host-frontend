import { kingmaker } from "../../component/Utils/Table/kingmaker";
import { useSelector } from "react-redux";
import useGameHandler from "../../component/Hooks/useGameHandler";
import Loader from "../../Layout/Loader";

const KingMaker = () => {
  const accessToken = useSelector((state) => state.Auth.token);
  const { loadingGame, playGame } = useGameHandler(accessToken);

  return (
    <div className="md:w-10/12 mx-auto">
      <Loader></Loader>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 px-2 gap-6">
        {kingmaker.map((game) => (
          <button
            key={game.gameid}
            onClick={() => playGame(game)}
            className="relative group"
            disabled={loadingGame === game.gameid}
          >
            <img
              className="md:w-48 mx-auto hover:opacity-60 md:h-40 h-24 rounded-3xl"
              src={game.icon}
              alt="gameimge"
            />
            <h2 className="text-center text-xs font-semibold">{game.name}</h2>
            {loadingGame === game.gameid && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-3xl">
                <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KingMaker;
