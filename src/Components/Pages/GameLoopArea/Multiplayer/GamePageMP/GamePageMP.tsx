import { Outlet } from "react-router-dom";
import '../.././Singleplayer/GamePageSP/GamePage.css'
import GameRoutingMP from "../../../../Utils/Routing/GameRouting/GameRoutingMP";
import store from "../../../../../Redux/Store";
import Typography from "@mui/material/Typography";

function GamePageMP(): JSX.Element {
    const title = store.getState().gameReducer.game?.title;
    return (
        <div className="game-page">
            {title !== undefined && <Typography variant='h3' sx={{cursor: 'pointer'}} >{title}</Typography>}
            <GameRoutingMP />
            <Outlet />
        </div>
    )
}

export default GamePageMP;