import { Route, Routes } from "react-router-dom";
import QuestionPage from "../../../Pages/GameLoopArea/Singleplayer/QuestionPage/QuestionPage";
import GameReview from "../../../Pages/GameLoopArea/Singleplayer/GameReview/GameReview";
import "../Routing.css"
import GamePageMP from "../../../Pages/GameLoopArea/Multiplayer/GamePageMP/GamePageMP";
import GameWelcomeMP from "../../../Pages/GameLoopArea/Multiplayer/GameWelcomeMP/GameWelcomeMP";
import JoinGamePage from "../../../Pages/GameLoopArea/Multiplayer/JoinGamePage/JoinGamePage";
import QuestionPageMP from "../../../Pages/GameLoopArea/Multiplayer/QuestionPageMP/QuestionPageMP";



function GameRoutingMP(): JSX.Element {
    return (
        <div className="routing-sub">
            <Routes>
                <Route path="/" element={<GamePageMP/>} />
                <Route path="/:gameid/*" element={<JoinGamePage />} />
                <Route path="/welcome" element={<GameWelcomeMP />} />
                <Route index element={<GameWelcomeMP />} />
                <Route path="/question" element={<QuestionPageMP />} />
                <Route path="/review" element={<GameReview />} />
            </Routes>
        </div>
    );
}

export default GameRoutingMP;