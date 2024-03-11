import { Routes, Route } from "react-router-dom";
import GameReview from "../../../Pages/GameLoopArea/Singleplayer/GameReview/GameReview";
import GameWelcome from "../../../Pages/GameLoopArea/Singleplayer/GameWelcome/GameWelcome";


function GameRoutingTimeTrial(): JSX.Element {
    return (
        <div className="routing-sub">
            {/* <Routes>
                <Route path="/" element={<GamePageSurvival/>} />
                <Route path="/welcome" element={<GameWelcome />} />
                <Route index element={<GameWelcome />} />
                <Route path="/question" element={<QuestionPageSurvival />} /> 
                <Route path="/review" element={<GameReview />} /> 
            </Routes> */}
        </div>
    );
}

export default GameRoutingTimeTrial;