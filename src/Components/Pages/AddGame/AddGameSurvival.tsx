import { useNavigate, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { GameModel } from '../../../Models/GameModel';
import { useEffect, useState } from 'react';
import { addGameApi } from '../../../WebAPI/UserApi';
import store from '../../../Redux/Store';
import { setGameAction, setMaxLivesAction, setThisPlayerAction } from '../../../Redux/GameState';
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
import globals from '../../../Services/Globals';
import { GameMode } from '../../../Models/Enums/GameMode';
import { SurvivalGameFormModel } from '../../../Models/SurvivalGameFormModel';


function AddGameSurvival() {
    const nextPage = ""; //TODO
    const navigate = useNavigate();
    const [inTimeout, setInTimeout] = useState(false);
    const [domain, setDomain] = useState('http://'+globals.getHost+':3000');

    yup.setLocale({ mixed: { notType: '' } })
    yup.setLocale({ number: { min: (e) => `minimum is ${e.min}` } })
    yup.setLocale({ number: { max: (e) => `maximum is ${e.max}` } })
    
    const schema = yup.object().shape({
        title:
            yup.string().notRequired(),
        difficulty:
            yup.string().required("please enter a valid difficulty level"),
        category:
            yup.string().required("please enter a valid category"),
        lives:
            yup.number().integer("Can't use non-whole numbers").min(1).max(5).required("Lives can only be between 1-5"),
        layout:
            yup.string().default("COMING_SOON")
    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<SurvivalGameFormModel>({ mode: "all", resolver: yupResolver(schema) });

    const addGame = async (game: SurvivalGameFormModel) => {
        if (inTimeout) { return; }
        setInTimeout(true);
        
        store.dispatch(setThisPlayerAction({name: "host", host: true, playerId: "host"}));


        const toServer = {
            title: game.title, 
            category: game.category,
            difficulty: game.difficulty,
            layout: game.layout,
            isMultiplayer: false,
            gameMode: GameMode.SURVIVAL} as GameModel;

        await addGameApi(toServer).then((res) => {
            res.data.url = domain + '/' + res.data.url;
            store.dispatch(setGameAction(res.data));
            store.dispatch(setMaxLivesAction(game.lives!))
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
                            defaultValue={"My Trivia Mania"}
                            {...register("title")}
                        />

                        <TextField sx={{ mt: 2 }}
                            {...register("lives")}
                            fullWidth
                            defaultValue={3}
                            error={!!errors.lives}
                            helperText={errors.lives?.message}
                            id="lives-field"
                            label="Number of Lives"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            color="secondary"
                        />

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

                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField
                                color="info" variant="outlined" label="Visual Theme: Coming Soon"
                                {...register("layout")} defaultValue={"COMING_SOON"} select SelectProps={{ native: true }}
                                error={!!errors.layout} helperText={errors.layout?.message} disabled={true}
                            >
                                { }
                                {Object.entries(LayoutEnum).map(([key, val]) => (
                                    <option key={key} value={key}>{val}</option>
                                ))}
                            </TextField>
                        </FormControl>

                        <Button type="submit" id='submit-button' variant="contained" size="large" disabled={!isValid} color='primary' sx={{ mt: 2 }}>
                            Confirm
                        </Button>
                    </ Box>
                </Box>
            </Container>
        </Container >
    );
}
export default AddGameSurvival;
