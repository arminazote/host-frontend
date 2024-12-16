import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../Redux/ReduxFunction";
import { useState } from "react";
import axios from "axios";

const useGameHandler = (accessToken) => {
  const [loadingGame, setLoadingGame] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const playGame = async (game) => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    setLoadingGame(game.gameid);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/game/get-url`,
        { game_uid: game.gameid },
        {
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response)
      if (response.data.code === 0) {
        window.open(response.data.payload.game_launch_url, "_blank");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message === "jwt expired") {
        dispatch(logOut());
        navigate("/login");
      }
    } finally {
      setLoadingGame(null);
    }
  };

  return { loadingGame, playGame };
};

export default useGameHandler;
