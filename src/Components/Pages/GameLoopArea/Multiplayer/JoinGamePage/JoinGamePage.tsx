import CustomLink from "../../../../Utils/CustomLink/CustomLink";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as yup from 'yup';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "../../../../../Redux/Store";
import { setGameAction, setThisPlayerAction } from "../../../../../Redux/GameState";
import { getGameApi, joinGameApi, updatePlayerApi } from "../../../../../WebAPI/UserApi";
import { GameModel } from "../../../../../Models/GameModel";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { PlayerModel } from "../../../../../Models/PlayerModel";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";

function JoinGamePage(): JSX.Element {
    const param = useParams();
    const gameId = Number(param.gameid);
    const navigate = useNavigate();
    const [localPlayer, setLocalPlayer] = useState(store.getState().gameReducer.thisPlayer || '');
    const [localGame, setLocalGame] = useState<GameModel>(store.getState().gameReducer.game || {});
    const [validatedState, setValidatedState] = useState(false);

    useEffect(() => {
        if (!('id' in localGame) || store.getState().gameReducer.game?.id !== gameId) {
            handleNewGame();
        } else setValidatedState(true);
    }, [])


    async function handleNewGame() {
        await joinGameApi(gameId)
            .then((res) => {
                setLocalGame(res.data.game);
                setLocalPlayer(res.data.player);
                store.dispatch(setGameAction(localGame));
                store.dispatch(setThisPlayerAction(localPlayer));
                setValidatedState(true);
            }).catch((error) => {
                setLocalGame({ title: "Can't fetch game: " + error });
                console.error(error);
            })
    }

    const schema = yup.object().shape({
        name:
            yup.string().notRequired(),
    });
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<PlayerModel>({ mode: "all", resolver: yupResolver(schema) });


    const handleJoinButton = async (res: PlayerModel) => {
        if (!validatedState) return;
        setValidatedState(false);
        if (localPlayer.name !== res.name) {
            setLocalPlayer({ playerId: localPlayer.playerId, host: localPlayer.host, answers: localPlayer.answers, name: res.name });
            await updatePlayerApi(localPlayer, gameId).then((res)=> {
                store.dispatch(setThisPlayerAction(res.data));
                navigate("/game/multiplayer");
            });
        }
        else navigate("/game/multiplayer");
        setValidatedState(true);
    }


    return (
        <Container maxWidth={false} sx={{ height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }} >
            <CssBaseline />
            <Typography component="h1" variant="h5" marginBottom={8}>
                {(validatedState && 'title' in localGame) ? localGame.title : 'no game yet, validatedState: ' + validatedState + ' game: ' + localGame?.title}
                {" game id: " + gameId}
            </Typography>
            <Box onSubmit={handleSubmit(handleJoinButton)} >
                <TextField sx={{ mt: 2 }}
                    margin="normal"
                    fullWidth
                    defaultValue={localPlayer?.name}
                    label="Choose Name"
                    type="text"
                    variant="outlined"
                    color="secondary"
                    {...register("name")}
                />
                <Button type='submit' variant="contained" size="large" disabled={!validatedState} color='primary' sx={{ mt: 2 }} >Join Game</Button>
            </Box>
        </Container>


    )
}

export default JoinGamePage;