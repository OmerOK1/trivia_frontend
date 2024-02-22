import { useNavigate, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { GameModel } from '../../../Models/GameModel';
import { useEffect, useState } from 'react';
import { addGameApi } from '../../../WebAPI/UserApi';
import store from '../../../Redux/Store';
import { setGameAction, setThisPlayerAction } from '../../../Redux/GameState';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { Difficulty } from '../../../Models/Enums/Difficulty';
import { Category } from '../../../Models/Enums/Category';
import { LayoutEnum } from '../../../Models/Enums/LayoutEnum';
import { publicIpv4 } from 'public-ip';
import globals from '../../../Services/Globals';


function AddGame(props: { isMP: boolean }) {
    const nextPage = (props.isMP) ? "/game/multiplayer" : "/game/singleplayer";
    const navigate = useNavigate();
    const [inTimeout, setInTimeout] = useState(false);
    const [domain, setDomain] = useState('http://'+globals.getHost+':3000');

    yup.setLocale({ mixed: { notType: '' } })
    yup.setLocale({ number: { min: (e) => `minimum is ${e.min}` } })
    yup.setLocale({ number: { max: (e) => `maximum is ${e.max}` } })
    const schema = yup.object().shape({
        title:
            yup.string().notRequired(),
        category:
            yup.string().required("please enter a valid category"),
        difficulty:
            yup.string().required("please enter a valid difficulty level"),
        questionsPerRound:
            yup.number().integer("please use Integers.").min(1).max(10).required("insert an amount of questions between 1 - 10 only, please."),
        answerTimeLimit:
            yup.number().integer(),
        layout:
            yup.string()
    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<GameModel>({ mode: "all", resolver: yupResolver(schema) });

    const addGame = async (game: GameModel) => {
        if (inTimeout) { return; }
        setInTimeout(true);
        store.dispatch(setThisPlayerAction({name: "host", host: true, playerId: "host"}));
        game.isMultiplayer = props.isMP;
        await addGameApi(game).then((res) => {
            res.data.url = domain + '/' + res.data.url; //TODO: generlize hard coded domain
            store.dispatch(setGameAction(res.data));
            console.log(store.getState().gameReducer);
            navigate(nextPage);
        }).catch((err)=>console.log("addGame promise broken: " + err));
        setTimeout(() => setInTimeout(false), 3000);
    }

    return (
        <Container id="form-page" maxWidth={false} >
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Typography component="h1" variant="h5" marginBottom={8}>
                        Game Settings
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit(addGame)} noValidate sx={{ mt: 1 }}>
                        <TextField sx={{ mt: 2 }}
                            margin="normal"
                            fullWidth
                            label="Game Title"
                            type="text"
                            {...register("title")}
                        />
                        <TextField sx={{ mt: 2 }}
                            {...register("questionsPerRound")}
                            fullWidth
                            defaultValue={3}
                            error={!!errors.questionsPerRound}
                            helperText={errors.questionsPerRound?.message}
                            id="questions-per-round-field"
                            label="Number of Questions"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            color="secondary"
                        />

                        <FormControl sx={{ mt: 2 }} fullWidth>
                            <TextField
                                color="success" variant="outlined" label="Time Limit"
                                select SelectProps={{ native: true }} {...register("answerTimeLimit")} defaultValue={30}
                                inputProps={{ name: 'answerTimeLimit', id: 'answer-time-limit' }}>
                                <option value={90}>90 seconds</option>
                                <option value={60}>60 seconds</option>
                                <option value={30}>30 seconds</option>
                            </TextField>
                        </FormControl>

                        <FormControl sx={{ mt: 2 }} fullWidth>
                            <TextField
                                color="success" variant="outlined" label="Category"
                                {...register("category")} defaultValue={"GENERAL_KNOWLEDGE"} select SelectProps={{ native: true }}
                                error={!!errors.category} helperText={errors.category?.message}
                            >
                                { }
                                {Object.entries(Category).map(([categoryKey, categoryValue]) => (
                                    <option key={categoryKey} value={categoryKey}>{categoryValue}</option>
                                ))}
                            </TextField>
                        </FormControl>

                        <FormControl sx={{ mt: 2 }} fullWidth >
                            <TextField
                                color="success" variant="outlined" label="Difficulty"
                                {...register("difficulty")} defaultValue={Difficulty.ANY} select SelectProps={{ native: true }}
                                error={!!errors.difficulty} helperText={errors.difficulty?.message}
                            >
                                {Object.keys(Difficulty).map((difficultyKey) => (
                                    <option key={difficultyKey} value={difficultyKey}>{difficultyKey}</option>
                                ))}
                            </TextField>
                        </FormControl>

                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField
                                color="success" variant="outlined" label="Layout"
                                {...register("layout")} defaultValue={LayoutEnum.NORMAL} select SelectProps={{ native: true }}
                                error={!!errors.layout} helperText={errors.layout?.message}
                            >
                                {Object.keys(LayoutEnum).map((layoutKey) => (
                                    <option key={layoutKey} value={layoutKey}>{layoutKey}</option>
                                ))}
                            </TextField>
                        </FormControl>

                        <Button type="submit" id='submit-button' variant="contained" size="large" disabled={!isValid} color='primary' sx={{ mt: 2 }}>
                            Start Game
                        </Button>
                    </ Box>
                </Box>
            </Container>
        </Container >
    );
}
export default AddGame;


    // useEffect(() => {
    //     async function getIp() {
    //         try {
    //             const response = await fetch("https://api.ipify.org?format=json");
    //             const data = await response.json();
    //             console.log("data: " + data);
    //             const ipAddress = data.ip;
    //             setDomain(`http://${ipAddress}:3000`);
    //         } catch (error) {
    //             console.error("Error fetching IP address:", error);
    //         }
    //     }
    //     getIp();
    //     setInTimeout(false);
    // }, []); 

    // useEffect(() => {
    //     async function fetchPublicIp() {
    //       try {
    //         const ip = await publicIpv4();
    //         setPublicIpAddress(ip);
    //         console.log("ip: " + ip)
    //       } catch (error) {
    //         console.error('Error fetching public IP address:', error);
    //       }
    //     }

    //     fetchPublicIp();
    //     const ifaces = os.networkInterfaces();
    //     let localIpAddress = '';

    //     Object.keys(ifaces).forEach((ifname) => {
    //         ifaces[ifname].forEach((iface: { family: string; internal: any; address: string; }) => {
    //             if (iface.family === 'IPv4' && !iface.internal) {
    //                 localIpAddress = iface.address;
    //             }
    //         });
    //     });

    //     console.log('Local IP Address:', localIpAddress);

    // }, []);