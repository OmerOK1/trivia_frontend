import { Outlet } from "react-router-dom";
import './GamePage.css'
import GameRoutingSP from "../../../../Utils/Routing/GameRouting/GameRoutingSP";
import store from "../../../../../Redux/Store";
import Typography from "@mui/material/Typography";

function GamePageSP(): JSX.Element {
    const title = store.getState().gameReducer.game?.title;
    return (
        <div className="game-page">
            {title !== undefined && <Typography variant='h3' sx={{cursor: 'pointer'}} >{title}</Typography>}
            <GameRoutingSP />
            <Outlet />
        </div>
    )
}

export default GamePageSP;