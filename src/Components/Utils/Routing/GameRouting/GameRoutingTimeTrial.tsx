import { Routes, Route } from "react-router-dom";
import GameReview from "../../../Pages/GameLoopArea/Singleplayer/GameReview/GameReview";
import GameWelcome from "../../../Pages/GameLoopArea/Singleplayer/GameWelcome/GameWelcome";
import GamePageTimeTrial from "../../../Pages/GameLoopArea/TimeTrial/GamePageTimeTrial/GamePageTimeTrial";
import QuestionPageTimeTrial from "../../../Pages/GameLoopArea/TimeTrial/QuestionPageTimeTrial/QuestionPageTimeTrial";


function GameRoutingTimeTrial(): JSX.Element {
    return (
        <div className="routing-sub">
            <Routes>
                <Route path="/" element={<GamePageTimeTrial/>} />
                <Route path="/welcome" element={<GameWelcome />} />
                <Route index element={<GameWelcome />} />
                <Route path="/question" element={<QuestionPageTimeTrial />} /> 
                <Route path="/review" element={<GameReview />} /> 
            </Routes>
        </div>
    );
}

export default GameRoutingTimeTrial;