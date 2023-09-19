import { useNavigate, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { GameModel } from '../Models/GameModel';
import { Category } from '../Models/Enums/Category';
import { Difficulty } from '../Models/Enums/Difficulty';
import { LayoutEnum } from '../Models/Enums/LayoutEnum';
import { useState } from 'react';
import { addGameApi } from '../../WebAPI/UserApi';
import store from '../../Redux/Store';
import { setGameAction } from '../../Redux/GameState';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Copyright, Height } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';


function AddGame() {

    const navigate = useNavigate();
    const [inTimeout, setInTimeout] = useState(false);

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
        await addGameApi(game).then((res) => {
            store.dispatch(setGameAction(res.data));
            console.log(store.getState().gameReducer);
            navigate("/game/singleplayer");
        })
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
                    <Typography component="h1" variant="h5" marginTop={8}>
                        Game Settings
                    </Typography>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

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
                                select SelectProps={{ native: true }} {...register("answerTimeLimit")} defaultValue={90}
                                inputProps={{ name: 'answerTimeLimit', id: 'answer-time-limit' }}>
                                <option value={90}>90 seconds</option>
                                <option value={60}>60 seconds</option>
                                <option value={30}>30 seconds</option>
                            </TextField>
                        </FormControl>

                        <FormControl sx={{ mt: 2 }} fullWidth>
                            <TextField
                                color="success" variant="outlined" label="Category"
                                {...register("category")} defaultValue={Category.ANY} select SelectProps={{ native: true }}
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

                        <Button type="submit" id='submit-button' variant="outlined" size='large' disabled={!isValid} color='success' sx={{ mt: 2 }}>
                            Start Game
                        </Button>
                    </ Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </Container >
    );


}

export default AddGame;

