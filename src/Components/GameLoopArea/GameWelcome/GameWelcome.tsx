import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import CustomLink from "../../CustomLink/CustomLink";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Height } from "@mui/icons-material";

function GameWelcome(): JSX.Element {
    const navigate = useNavigate();
    const gameTitle = store.getState().gameReducer.game?.title;

    return (
        <Container maxWidth={false} sx={{ height: 100 , display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }} >
            <CssBaseline />
            <Typography component="h1" variant="h1" marginTop={8}>
                Welcome to {gameTitle}!
            </Typography>
            <Box sx={{ Height: 100, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <CustomLink to="/game/singleplayer/question">Play Now</CustomLink>
            </Box>
        </Container>


    )
}

export default GameWelcome;