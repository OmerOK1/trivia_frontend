import { useNavigate } from 'react-router-dom';
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
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Copyright } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';


function AddGame() {

    const navigate = useNavigate();
    const [inTimeout, setInTimeout] = useState(false);
    const [answerTimeLimit, setAnswerTimeLimit] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        // const selectedValue = Number()
        setAnswerTimeLimit(event.target.value);
    };

    const schema = yup.object().shape({
        title:
            yup.string().notRequired(),
        category:
            yup.string().required("please enter wanted category"),
        difficulty:
            yup.string().required("please enter difficulty level"),
        questionsPerRound:
            yup.number().integer().min(1).max(10).required("insert amount between 1 - 10"),
        answerTimeLimit:
            yup.number().integer(),
        layout:
            yup.string().required()
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
        <Container 
        // sx={{
        //     backgroundColor: 'primary.light',
        //     '&:hover': {
        //       backgroundColor: 'primary.main',
        //       opacity: [0.9, 0.8, 0.7],
        //     },
        //   }} 
          >
            <h1>Game settings</h1>
            {/* Step 9 - handleSubmit your form  */}

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <Box component="form" onSubmit={() => handleSubmit(addGame)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            //   name="title"
                            label="Game Title"
                            type="text"
                            id="title"
                            autoComplete="current-title"
                            {...register("title")}
                        />
                        <Box >
                            <span className="validation_rules">{errors.title?.message}</span>
                        </Box >

                        <TextField
                            {...register("questionsPerRound")}
                            margin="normal"
                            required
                            fullWidth
                            //   name="title"
                            label="Number of Questions"
                            type="number"
                            id="number"
                            autoComplete="current-title"
                        />
                        <Box >
                            <span className="validation_rules">{errors.questionsPerRound?.message}</span>
                        </Box >

                        <FormControl sx={{ mt: 2, minWidth: 120 }} fullWidth>
                            <InputLabel id="time-limit-label">Time Limit</InputLabel>
                            <Select
                                labelId="time-limit-label"
                                {...register("answerTimeLimit")}
                                value={answerTimeLimit}
                                onChange={handleChange}
                                displayEmpty
                                label={"Time Limit"}
                                inputProps={{ 'aria-label': '' }}
                            >
                                <MenuItem value={90}>
                                    <em>90 seconds</em>
                                </MenuItem>
                                <MenuItem value={60}>60 seconds</MenuItem>
                                <MenuItem value={30}>30 seconds</MenuItem>
                                <MenuItem value={15}>15 seconds</MenuItem>

                            </Select>
                        </FormControl>


                    </ Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>


            {/* <form onSubmit={handleSubmit(addGame)} className="add_game_form flex-center-col">

                <label htmlFor="title">game title</label>
                <input {...register("title")} type="title" placeholder= "title" id="title" />
                <span className="validation_rules">{errors.title?.message}</span>
                <br />

                <label htmlFor="number of questions">number of questions</label>
                <input {...register("questionsPerRound")} type='number' min={1} max={10} id="questionsPerRound" />
                <span className="validation_rules">{errors.questionsPerRound?.message}</span>
                <br />

                <label htmlFor="answer timer">answer timer</label> 
                <select {...register("answerTimeLimit")} defaultValue={15} id="answerTimeLimit">
                    <option value={15}>15 seconds</option>
                    <option value={30}>30 seconds</option>
                    <option value={60}>60 seconds</option>
                </select>
                <span className="validation_rules">{errors.answerTimeLimit?.message}</span>
                <br />

                <label htmlFor="category">Category</label>
                <select {...register("category")} defaultValue="ANY" id="category"> 
                    <option value="" disabled>Category</option>
                    {Object.keys(Category).map((key, index) => (
                        <option
                        aria-selected="true"
                        key={key}
                        value={key}
                        >{Object.values(Category)[index]}
                        </option>
                    ))}
                </select>
                <span className="validation_rules">{errors.category?.message}</span>
                <br />

                <label htmlFor="difficulty">difficulty</label>
                <select {...register("difficulty")} defaultValue="ANY" id="difficulty"> 
                    <option value="" disabled>difficulty</option>
                    {Object.keys(Difficulty).map((key, index) => (
                        <option
                        aria-selected="true"
                        key={key}
                        value={key}
                        >{Object.values(Difficulty)[index]}
                        </option>
                    ))}
                </select>
                <span className="validation_rules">{errors.difficulty?.message}</span>
                <br />

                <label htmlFor="layout">layout</label>
                <select {...register("layout")} placeholder="layout" defaultValue="" id="layout"> 
                    <option value="" disabled>layout</option>
                    {Object.keys(LayoutEnum).map((key, index) => (
                        <option
                        aria-selected="true"
                        key={key}
                        value={key}
                        >{Object.values(LayoutEnum)[index]}
                        </option>
                    ))}
                </select>
                <span className="validation_rules">{errors.layout?.message}</span>
                <br />

                <button className="button-success">Start Game!</button>
            </form> */}
        </Container>
    );


}

export default AddGame;