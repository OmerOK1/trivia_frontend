import { Outlet } from "react-router-dom";
import store from "../../../../../Redux/Store";
import GameRoutingTimeTrial from "../../../../Utils/Routing/GameRouting/GameRoutingTimeTrial";
import Typography from "@mui/material/Typography";

function GamePageTimeTrial(): JSX.Element {
    const title = store.getState().gameReducer.game?.title;
    return (
        <div className="game-page">
            {title !== undefined && <Typography variant='h3' sx={{cursor: 'pointer'}} >{title}</Typography>}
            <GameRoutingTimeTrial />
            {/* add time limit here */}
            <Outlet />
        </div>
    )
}

export default GamePageTimeTrial;