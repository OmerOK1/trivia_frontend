import Container from "@mui/material/Container";
import GameRouting from "../../Routing/GameRouting/GameRouting";
import { Outlet } from "react-router-dom";
import './GamePage.css'

function GamePageSP() {
    return (
        <div className="game-page">
            <GameRouting />
            <Outlet />
        </div>
    )
}

export default GamePageSP;