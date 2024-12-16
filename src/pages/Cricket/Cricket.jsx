import { Helmet } from "react-helmet";
import img from "../../assets/allbanner/cricket.jpg";
import img2 from "../../assets/allbanner/ranibajibd.png";
import { useSelector } from "react-redux";
import useGameHandler from "../../component/Hooks/useGameHandler";
import luckyImage from "../../assets/crickte_lucky.jpg";
import { LiaHotjar } from "react-icons/lia";
import Loader from "../../Layout/Loader";

const Cricket = () => {
  const accessToken = useSelector((state) => state.Auth.token);
  const { loadingGame, playGame } = useGameHandler(accessToken);

  const game = {
    name: "Lucky Sports",
    gameid: "92b24e4c25107367a80e0fe1a97c24e4",
    type: "Cricket Game",
    icon: luckyImage,
  };

  return (
    <div>
      <Loader></Loader>
      <Helmet>
        <title> Cricket Games | Ranibaji</title>
        <meta
          name="description"
          content="Live sportsbook games and more. Best odds and real-time updates!"
        />
        <meta
          name="keywords"
          content="sports betting, live casino , live betting, cricket odds, football odds"
        />
        <link rel="canonical" href="https://ranibaji.com/cricket" />
      </Helmet>
      <div className="relative">
        <img src={img} alt="sports Background" className="w-full object-cover md:h-96 h-32" />
        <img
          src={img2}
          alt="logo"
          className="absolute md:w-60 w-32 top-1/2 right-2 transform -translate-y-1/2"
        />
      </div>
      <div className="grid md:w-10/12 my-6 mx-auto lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-4 items-center">
        <button
          onClick={() => playGame(game)}
          className="relative group"
          disabled={loadingGame === game.gameid}
        >
          {/* Game Image */}
          <div className="relative">
            <img
              className="lg:w-96 mx-auto w-full hover:opacity-60 lg:h-96 h-72 ml-2 rounded-3xl"
              src={game.icon}
              alt="gameimge"
            />
            {/* Hot Badge */}
            <div className="absolute top-0 right-0 text-white text-sm font-semibold rounded-full lg:flex items-center hidden">
              <LiaHotjar size={60} color="red" className="text-yellow-300" />
            </div>
          </div>

          <h2 className="text-center text-xl font-semibold">{game.name}</h2>
          {loadingGame === game.gameid && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-3xl">
              <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Cricket;
