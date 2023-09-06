import { useState } from "react";
import store from "../../../Redux/Store";
import CustomButton from "../../Button/CustomButton";
import { log } from "console";
import { QuestionModel } from "../../Models/QuestionModel";
import { setNextQuestionAction } from "../../../Redux/GameState";





function QuestionPage() {
    //const question = store.getState().gameReducer.question;
    const [questionUseState, setQuestionUseState] = useState<QuestionModel>(store.getState().gameReducer.question!)
    //const [answer, setAnswer] = useState<string>("");
    const [buttonColor, setButtonColor] = useState<string>("menu-button-gray");
    const [answered, setAnswered] = useState<boolean>(false);
    const [inTimeout, setInTimeout] = useState(false);

    function handleNextQuestion() {
        if (inTimeout) {return;}
        setInTimeout(true);
        setAnswered(false);
        setButtonColor("menu-button-gray")
        store.dispatch(setNextQuestionAction());
        setQuestionUseState(store.getState().gameReducer.question!);
        setTimeout(() => setInTimeout(false), 1500);

    }

    
    function handleAnswerChoice(chosenAnswer?: string) {
        console.log("answer: ", chosenAnswer)
        if (chosenAnswer === questionUseState?.correctAnswer) {
            setButtonColor("menu-button-green");
        } else {
            setButtonColor("menu-button-red");
        }
        setAnswered(true);
    };
    return (
        <div className="question-page">
            <h1>{questionUseState?.questionBody}</h1>
            <CustomButton className={buttonColor} name={questionUseState?.option1} handleClick={() => handleAnswerChoice(questionUseState?.option1)} />
            <CustomButton className={buttonColor} name={questionUseState?.option2} handleClick={() => handleAnswerChoice(questionUseState?.option2)} />
            <CustomButton className={buttonColor} name={questionUseState?.option3} handleClick={() => handleAnswerChoice(questionUseState?.option3)} />
            <CustomButton className={buttonColor} name={questionUseState?.option4} handleClick={() => handleAnswerChoice(questionUseState?.option4)} />
            {answered === true && <CustomButton className="menu-button-gray" name="Continue" handleClick={()=> handleNextQuestion()} ></ CustomButton>}
        </div>
    );
}

export default QuestionPage;