import { useNavigate } from "react-router-dom";
import store from "../../../../../Redux/Store";
import CustomLink from "../../../../Utils/CustomLink/CustomLink";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import QRCode from "react-qr-code";

function GameWelcomeMP(): JSX.Element {
    const messages = [
        "Welcome to the trivia challenge! Get ready to test your knowledge.",
        "The trivia adventure is about to begin. Are you up for the challenge?",
        "It's time to dive into the world of trivia. Let's get started.",
        "Prepare for a fun-filled trivia experience. Your game is ready to go.",
        "Your trivia journey is about to begin. Show off your knowledge prowess.",
        "The trivia arena beckons! Prepare to face off against the toughest questions and claim victory.",
        "You're about to embark on a trivia adventure in the grand arena of knowledge. Are you up for the challenge?",
        "Prepare to enter the arena of intellect, where only the sharpest minds emerge victorious.",
        "It's trivia o'clock! Your game is loaded, and the fun is about to begin.",
        "Game on, trivia enthusiast! Your custom challenge is all set. Let's get those answers rolling.",
        "The countdown to trivia glory begins now. Buckle up for an exciting knowledge adventure."
      ];
      const randomMessage = messages[ Math.floor(Math.random() * messages.length) ];

    return (
        <Container maxWidth={false} sx={{ height: '60vh' , display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }} >
            <CssBaseline />
            <Typography component="h1" variant="h6" >Scan Here To Join Game!</Typography>
            <QRCode value={store.getState().gameReducer.game?.url!} bgColor="transparent" />
            <Typography component="h1" variant="h6" marginBottom={3} marginTop={2}>
                url: {store.getState().gameReducer.game?.url} <br />
                id: {store.getState().gameReducer.game?.id} <br />
                Multiplayer
            </Typography>
            <Typography component="h1" variant="h5" marginBottom={6}>
                {randomMessage}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '35%' }} >
                <CustomLink to="">Let's Play!</CustomLink>
            </Box>
        </Container>


    )
}

export default GameWelcomeMP;