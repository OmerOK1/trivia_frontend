import CustomLink from "../../../../Utils/CustomLink/CustomLink";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

function JoinGamePage(): JSX.Element {
    const param = useParams();
    const gameId = Number(param.gameid);
    
    
    return (
        <Container maxWidth={false} sx={{ height: 100 , display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }} >
            <CssBaseline />
            <Typography component="h1" variant="h5" marginBottom={8}>
                {gameId}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <CustomLink to="/game/multiplayer/welcome">Join Game</CustomLink>
            </Box>
        </Container>


    )
}

export default JoinGamePage;