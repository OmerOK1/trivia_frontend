import { Route, Routes } from "react-router-dom";
import GameWelcome from "../../../Pages/GameLoopArea/GameWelcome/GameWelcome";
import QuestionPage from "../../../Pages/GameLoopArea/QuestionPage/QuestionPage";
import GameReview from "../../../Pages/GameLoopArea/GameReview/GameReview";
import GamePageSP from "../../../Pages/GameLoopArea/GamePageSP/GamePageSP";
import "../Routing.css"



function GameRouting(): JSX.Element {
    return (
        <div className="routing-sub">
            <Routes>
                <Route path="/" element={<GamePageSP/>} />
                <Route path="/welcome" element={<GameWelcome />} />
                <Route index element={<GameWelcome />} />
                <Route path="/question" element={<QuestionPage />} />
                <Route path="/review" element={<GameReview />} />
            </Routes>
        </div>
    );
}

export default GameRouting;