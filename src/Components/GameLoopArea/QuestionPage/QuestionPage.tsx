import { useState } from "react";
import store from "../../../Redux/Store";
import CustomButton from "../../Button/CustomButton";

function QuestionPage() {
    const question = store.getState().gameReducer.question;
    const [buttonColor, setButtonColor] = useState<string>("gray")
    function handleAnswerChoice(answer?: string) {
        if (answer === question?.correctAnswer) {
            setButtonColor("menu-button-green");
        } else {
            setButtonColor("menu-button-red");
        }
    };
    return (
        <div className="question-page">
            <h1>{question?.questionBody}</h1>
            <CustomButton className="menu-button-gray" name={question?.option1} onClick={() => handleAnswerChoice(question?.option1)}></CustomButton>
            <CustomButton className="menu-button-gray" name={question?.option2}></CustomButton>
            <CustomButton className="menu-button-gray" name={question?.option3}></CustomButton>
            <CustomButton className="menu-button-gray" name={question?.option4}></CustomButton>
        </div>
    );
}

export default QuestionPage;