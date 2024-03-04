import { Routes, Route } from "react-router-dom";
import GamePageSurvival from "../../../Pages/GameLoopArea/Survival/GamePageSurvival/GamePageSurvival";

function GameRoutingSurvival(): JSX.Element {
    return (
        <div className="routing-sub">
            <Routes>
                <Route path="/" element={<GamePageSurvival/>} />
                {/* <Route path="/welcome" element={<GameWelcome />} />
                <Route index element={<GameWelcome />} />
                <Route path="/question" element={<QuestionPage />} />
                <Route path="/review" element={<GameReview />} /> */}
            </Routes>
        </div>
    );
}

export default GameRoutingSurvival;