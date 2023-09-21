import { Route, Routes } from "react-router-dom";
import Landing from "../../Pages/LandingPage/Landing";
import SinglePlayerSettings from "../../Pages/SinglePlayerSettings/SinglePlayerSettings";
import SignUpPage from "../../Resgistration/SignUp/SignUp";
import MultiPlayerSettings from "../../Pages/MultiPlayerSettings/MultiPlayerSettings";
import SignInPage from "../../Resgistration/SignIn/SignIn";
import GamePageSP from "../../Pages/GameLoopArea/GamePageSP/GamePageSP";
import "./Routing.css"

function Routing(): JSX.Element {
    return (
        <div className="routing">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/demosettings" element={<SinglePlayerSettings />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/multiplayersettings" element={<MultiPlayerSettings />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/joingame" element={<SignInPage />} />
                <Route path={"/game/singleplayer"} element={<GamePageSP />} />
                <Route path={"/game/singleplayer/*"} element={<GamePageSP />} />
            </Routes>
        </div>
    );
}

export default Routing;