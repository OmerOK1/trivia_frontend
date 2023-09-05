import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import CustomButton from "../../Button/CustomButton";
import CustomLink from "../../CustomLink/CustomLink";
import QuestionPage from "../QuestionPage/QuestionPage";

function GameWelcome(): JSX.Element {
    const navigate = useNavigate();
    const gameTitle = store.getState().gameReducer.game?.title;



    return (
        <div className="game-welcome-page">
            <h1>Welcome to {gameTitle}!</h1>
            <CustomLink to="/game/singleplayer/question">Play Now</CustomLink>
        </div>
    )
}

export default GameWelcome;