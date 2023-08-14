import { Route, Routes } from "react-router-dom";
import Landing from "../LandingPage/Landing";
import SinglePlayerSettings from "../SinglePlayerSettings/SinglePlayerSettings";
import SignUpPage from "../Resgistration/SignUp/SignUp";
import MultiPlayerSettings from "../MultiPlayerSettings/MultiPlayerSettings";
import SignInPage from "../Resgistration/SignIn/SignIn";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/demosettings" element={<SinglePlayerSettings />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/multiplayersettings" element={<MultiPlayerSettings />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/joingame" element={<SignInPage />} />

            </Routes>
        </div>
    );
}

export default Routing;
