import { Route, Routes } from "react-router-dom";
import Landing from "../../Pages/LandingPage/Landing";
import SinglePlayerSettings from "../../Pages/SinglePlayerSettings/SinglePlayerSettings";
import SignUpPage from "../../Resgistration/SignUp/SignUp";
import MultiPlayerSettings from "../../Pages/MultiPlayerSettings/MultiPlayerSettings";
import SignInPage from "../../Resgistration/SignIn/SignIn";
import GamePageSP from "../../Pages/GameLoopArea/Singleplayer/GamePageSP/GamePageSP";
import "./Routing.css"
import GamePageMP from "../../Pages/GameLoopArea/Multiplayer/GamePageMP/GamePageMP";
import GamePageSurvival from "../../Pages/GameLoopArea/Survival/GamePageSurvival/GamePageSurvival";
import AddGameSurvival from "../../Pages/AddGame/AddGameSurvival";
import GamePageTimeTrial from "../../Pages/GameLoopArea/TimeTrial/GamePageTimeTrial/GamePageTimeTrial";
import AddGameTimerTrial from "../../Pages/AddGame/AddGameTimeTrial";

function Routing(): JSX.Element {
    return (
        <div className="routing">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/demosettings" element={<SinglePlayerSettings />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/multiplayersettings" element={<MultiPlayerSettings />} />
                <Route path="/survivalsettings" element={<AddGameSurvival />} />
                <Route path="/timetrialsettings" element={<AddGameTimerTrial />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/joingame" element={<SignInPage />} />
                <Route path={"/game/singleplayer/*"} element={<GamePageSP />} />
                <Route path={"/game/multiplayer/*"} element={<GamePageMP />} />
                <Route path={"/game/survival/*"} element={<GamePageSurvival />} />
                <Route path={"/game/timetrial/*"} element={<GamePageTimeTrial />} />
            </Routes>
        </div>
    );
}

export default Routing;
