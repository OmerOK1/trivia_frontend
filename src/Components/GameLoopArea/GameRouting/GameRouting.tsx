import { Route, Routes } from "react-router-dom";
import GameWelcome from "../GameWelcome/GameWelcome";
import QuestionPage from "../QuestionPage/QuestionPage";
import GamePageSP from "../GamePageSP/GamePageSP";
import GameReview from "../GameReview/GameReview";


function GameRouting(): JSX.Element {
    return (
        <div className="Routing">
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