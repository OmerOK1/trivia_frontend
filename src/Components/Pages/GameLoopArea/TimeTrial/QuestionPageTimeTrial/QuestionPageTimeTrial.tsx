import { useState } from "react";
import { QuestionModel } from "../../../../../Models/QuestionModel";
import store from "../../../../../Redux/Store";
import { addUserAnswerAction, setNextQuestionAction } from "../../../../../Redux/GameState";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import CustomLink from "../../../../Utils/CustomLink/CustomLink";
import "../../Singleplayer/QuestionPage/QuestionPage.css";
import TimerAdv from "../../../../Utils/Timer/TimerAdv";

export function QuestionPageTimeTrial() {
    const [currentQuestion, setCurrentQuestion] = useState<QuestionModel>(store.getState().gameReducer.question!);
    const [isLast, setIsLast] = useState<boolean>(store.getState().gameReducer.isLastQuestion);
    const [answered, setAnswered] = useState(false);
    const [questionIndex, setQuestionIndex] = useState<number>(store.getState().gameReducer.questionIndex);
    const getTimeLimit = store.getState().gameReducer.timeLimit;
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


    
    function handleAnswerChoice(answerNumber: number, answerText: string) {
        if (answered || timeOver) return;
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

        setTimeout(() => { //move to next question after this
            handleNextQuestion();
        }, 500);
    }

    function handleNextQuestion() {
        setAnswered(false);
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
    }

    
    function handleButtonColor(answerNumber: number): "secondary" | "success" | "error" {
        if (buttonsSelection[`button${answerNumber}` as keyof typeof buttonsSelection]) {
            return (answerNumber === correctAnswerNumber())? "success" : "error";
        }
        return "secondary";
    }


    function correctAnswerNumber(): number {
        const correctAnswer = currentQuestion.correctAnswer;
        if (currentQuestion.option1 === correctAnswer) return 1;
        if (currentQuestion.option2 === correctAnswer) return 2;
        if (currentQuestion.option3 === correctAnswer) return 3;
        return 4;
    }

    const handleTimeOver = () => {
        const correctNumber = correctAnswerNumber();
        store.dispatch(addUserAnswerAction(store.getState().gameReducer.questionIndex - 1, "", false));
        setButtonsSelection((prevSelection) => ({
            ...prevSelection,
            [`button${correctNumber}`]: true
        }));
        setTimeOver(true);
    };
    

    return (
        <div className="question-page">
            <h2>QUESTION {questionIndex}</h2>
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
            {!timeOver && <TimerAdv  timeLimit={getTimeLimit!} onTimeout={handleTimeOver} />
            }
            <Box width="20vw" >
            
                {answered === true && isLast &&  
                (<CustomLink to="/game/singleplayer/review">finish</CustomLink>) 
                }
                {timeOver && (<CustomLink to="/game/timetrial/review">finish</CustomLink>)}
            </Box >
        </div >
    );
}
export default QuestionPageTimeTrial;
