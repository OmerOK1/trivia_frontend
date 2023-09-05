import { Outlet } from "react-router-dom";
import GameRouting from "../GameRouting/GameRouting";

function GameSinglePlayer(): JSX.Element {

  return (
    <div className="GameMain">
      <GameRouting />
      <Outlet />
    </div>
  );
}

export default GameSinglePlayer;