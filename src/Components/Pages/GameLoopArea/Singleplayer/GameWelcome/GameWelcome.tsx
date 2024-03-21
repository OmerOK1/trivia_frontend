import { useNavigate } from "react-router-dom";
import store from "../../../../../Redux/Store";
import CustomLink from "../../../../Utils/CustomLink/CustomLink";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GameMode } from "../../../../../Models/Enums/GameMode";
import { useEffect, useState } from "react";

function GameWelcome(): JSX.Element {
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
      const gameMode = store.getState().gameReducer.game?.gameMode!;
      const [nextPage, setNextPage] = useState<string>("")

      useEffect(() => {
        switch (gameMode) {
        case GameMode.CLASSIC: 
        setNextPage("/game/singleplayer/question")
        break;
        case GameMode.TIME_TRIAL: setNextPage("/game/timetrial/question")
        break;
        case GameMode.SURVIVAL: setNextPage("/game/survival/question")
        }
    }, [])
      

    return (
        <Container maxWidth={false} sx={{ height: 100 , display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' , alignItems: 'center' }} >
            <CssBaseline />
            <Typography component="h1" variant="h5" marginBottom={8}>
                {randomMessage}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '35%' }} >
                <CustomLink to={nextPage}>Let's Play!</CustomLink>
            </Box>
        </Container>
    )
}

export default GameWelcome;