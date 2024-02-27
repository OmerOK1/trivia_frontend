import { useState } from "react";
import store from "../../../../../Redux/Store";
import CustomButton from "../../../../Utils/Button/CustomButton";
import { QuestionModel } from "../../../../../Models/QuestionModel";
import { addUserAnswerAction, setNextQuestionAction } from "../../../../../Redux/GameState";
import CustomLink from "../../../../Utils/CustomLink/CustomLink";
import "./QuestionPage.css"
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Timer from "../../../../Utils/Timer/Timer";


export function QuestionPage() {
    const [currentQuestion, setCurrentQuestion] = useState<QuestionModel>(store.getState().gameReducer.question!);
    const [isLast, setIsLast] = useState<boolean>(store.getState().gameReducer.isLastQuestion);
    const [answered, setAnswered] = useState(false);
    const [inTimeout, setInTimeout] = useState(false);
    const gameLength = store.getState().gameReducer.game?.questionsPerRound;
    const [questionIndex, setQuestionIndex] = useState<number>(store.getState().gameReducer.questionIndex);
    const getTimeLimit = store.getState().gameReducer.game?.answerTimeLimit;
    const [timeOver, setTimeOver] = useState(false);
    const [buttonsSelection, setButtonsSelection] = useState<{
        button1: boolean;
        button2: boolean;
        button3: boolean;
        button4: boolean;
    }>({
        button1: false,
        button2: false,
        button3: false,
        button4: false,
    });


    function handleNextQuestion() {
        if (inTimeout) return;
        setInTimeout(true);
        setAnswered(false);
        setTimeOver(false);
        setButtonsSelection({
            button1: false,
            button2: false,
            button3: false,
            button4: false,
        });
        store.dispatch(setNextQuestionAction());
        setCurrentQuestion(store.getState().gameReducer.question!);
        setIsLast(store.getState().gameReducer.isLastQuestion);
        setQuestionIndex(store.getState().gameReducer.questionIndex); //could be optimised to simple number if needed, but this should avoid more bugs
        
        setTimeout(() => setInTimeout(false), 1500);
    }

    
    function handleButtonColor(answerNumber: number): "secondary" | "success" | "error" {
        if (buttonsSelection[`button${answerNumber}` as keyof typeof buttonsSelection]) {
            return (answerNumber === correctAnswerNumber())? "success" : "error";
        }
        return "secondary";
    }

    function handleAnswerChoice(answerNumber: number, answerText: string) {
        if (answered) return;
        if (![1, 2, 3, 4].includes(answerNumber)) return;
        setAnswered(true);

        const correctNumber = correctAnswerNumber();
        const isCorrect = answerNumber === correctNumber;
        store.dispatch(addUserAnswerAction(store.getState().gameReducer.questionIndex - 1, answerText, isCorrect));
        
        setButtonsSelection((prevSelection) => ({
            ...prevSelection,
            [`button${answerNumber}`]: true,
            [`button${correctNumber}`]: true
        }));
    }

    function correctAnswerNumber(): number {
        const correctAnswer = currentQuestion.correctAnswer;
        if (currentQuestion.option1 === correctAnswer) return 1;
        if (currentQuestion.option2 === correctAnswer) return 2;
        if (currentQuestion.option3 === correctAnswer) return 3;
        return 4;
    }

    const handleTimeOver = () => {
        if (answered || timeOver) return;
    
        setTimeOver(true);
    
        const correctNumber = correctAnswerNumber();
        store.dispatch(addUserAnswerAction(store.getState().gameReducer.questionIndex - 1, "", false));
        setButtonsSelection((prevSelection) => ({
            ...prevSelection,
            [`button${correctNumber}`]: true
        }));
        setTimeout(() => {
            setInTimeout(false);
            handleNextQuestion();
        }, 1500);
    };
    

    return (
        <div className="question-page">
            <h2>QUESTION {questionIndex}/{gameLength}</h2>
            <h1>{currentQuestion?.questionBody}</h1>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 5, md: 5 }} columns={{ xs: 3, sm: 6 }}>
                    {Array.from(Array(4)).map((_, index) => (
                        <Grid xs={3} sm={3} key={index}>
                            <Button color={handleButtonColor(index+1)} variant="contained" size="large" fullWidth={true}
                            onClick={() => handleAnswerChoice(
                                index + 1, currentQuestion?.[`option${index + 1}` as keyof QuestionModel]!
                            )}>{index + 1}. {currentQuestion?.[`option${index + 1}` as keyof QuestionModel]} </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            {(answered === false) && (!timeOver) && <Timer key={questionIndex} timeLimit={getTimeLimit!} onTimeout={handleTimeOver} />}
            <Box width="20vw" >
            
                {answered === true && (isLast ? 
                (<CustomLink to="/game/singleplayer/review">finish</CustomLink>) : 
                <CustomButton className="menu-button-gray" name="Continue" handleClick={() => handleNextQuestion()} />
                    )
                }
                {timeOver && (isLast ? 
                (<CustomLink to="/game/singleplayer/review">finish</CustomLink>) : 
                <CustomButton className="menu-button-red" name="Continue" handleClick={() => handleNextQuestion()} />
            )}
            </Box >
        </div >
    );
}
export default QuestionPage
