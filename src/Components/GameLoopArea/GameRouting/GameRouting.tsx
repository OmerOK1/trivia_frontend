import { Route, Routes } from "react-router-dom";
import GameWelcome from "../GameWelcome/GameWelcome";
import QuestionPage from "../QuestionPage/QuestionPage";
import GamePageSP from "../GamePageSP/GamePageSP";

function GameRouting(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<GamePageSP/>} />
                <Route path="/welcome" element={<GameWelcome />} />
                <Route index element={<GameWelcome />} /> {/*should set welcome as default*/}
                <Route path="/question" element={<QuestionPage />} />
            </Routes>
        </div>
    );
}

export default GameRouting;