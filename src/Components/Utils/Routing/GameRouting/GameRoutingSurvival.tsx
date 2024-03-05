import { Routes, Route } from "react-router-dom";
import GamePageSurvival from "../../../Pages/GameLoopArea/Survival/GamePageSurvival/GamePageSurvival";
import GameWelcome from "../../../Pages/GameLoopArea/Singleplayer/GameWelcome/GameWelcome";
import QuestionPageSurvival from "../../../Pages/GameLoopArea/Survival/QuestionPageSurvival/QuestionPageSurvival";
import GameReview from "../../../Pages/GameLoopArea/Singleplayer/GameReview/GameReview";

function GameRoutingSurvival(): JSX.Element {
    return (
        <div className="routing-sub">
            <Routes>
                <Route path="/" element={<GamePageSurvival/>} />
                <Route path="/welcome" element={<GameWelcome />} />
                <Route index element={<GameWelcome />} />
                <Route path="/question" element={<QuestionPageSurvival />} /> 
                <Route path="/review" element={<GameReview />} /> 
            </Routes>
        </div>
    );
}

export default GameRoutingSurvival;