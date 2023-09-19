import { Route, Routes } from "react-router-dom";
import GameWelcome from "../../GameLoopArea/GameWelcome/GameWelcome";
import QuestionPage from "../../GameLoopArea/QuestionPage/QuestionPage";
import GamePageSP from "../../GameLoopArea/GamePageSP/GamePageSP";
import GameReview from "../../GameLoopArea/GameReview/GameReview";
import "../Routing.css"



function GameRouting(): JSX.Element {
    return (
        <div className="routing">
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