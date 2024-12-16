import useGameHandler from "../../component/Hooks/useGameHandler";
import { saba } from "../../component/Utils/sports/sportsbook";
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader";

const Saba = () => {
  const accessToken = useSelector((state) => state.Auth.token);
  const { loadingGame, playGame } = useGameHandler(accessToken);

  return (
    <div className="md:w-10/12 mx-auto">
      <Loader></Loader>
      <div className=" my-8 ">
        {saba.map((game) => (
          <button
            key={game.gameid}
            onClick={() => playGame(game)}
            className="relative group"
            disabled={loadingGame === game.gameid}
          >
            <img
              className=" w-full hover:opacity-60 md:h-40 rounded-3xl"
              src={game.icon}
              alt="gameimge"
            />
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

export default Saba;
