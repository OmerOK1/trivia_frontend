import Typography from "@mui/material/Typography";
import GameRoutingSurvival from "../../../../Utils/Routing/GameRouting/GameRoutingSurvival";
import { Outlet } from "react-router-dom";
import store from "../../../../../Redux/Store";

function GamePageSurvival(): JSX.Element {
    const title = store.getState().gameReducer.game?.title;
    return (
        <div className="game-page">
            {title !== undefined && <Typography variant='h3' sx={{cursor: 'pointer'}} >{title}</Typography>}
            <GameRoutingSurvival />
            <Outlet />
        </div>
    )
}

export default GamePageSurvival;