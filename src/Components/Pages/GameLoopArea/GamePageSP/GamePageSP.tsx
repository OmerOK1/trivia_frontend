import { Outlet } from "react-router-dom";
import './GamePage.css'
import GameRouting from "../../../Utils/Routing/GameRouting/GameRouting";

function GamePageSP(): JSX.Element {
    return (
        <div className="game-page">
            <GameRouting />
            <Outlet />
        </div>
    )
}

export default GamePageSP;