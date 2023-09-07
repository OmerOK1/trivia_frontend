import { useState } from "react";
import store from "../../../Redux/Store";
import CustomButton from "../../Button/CustomButton";
import { QuestionModel } from "../../Models/QuestionModel";
import { setNextQuestionAction } from "../../../Redux/GameState";


export function QuestionPage() {
    const [currentQuestion, setCurrentQuestion] = useState<QuestionModel>(store.getState().gameReducer.question!);
    const [buttonColors, setButtonColors] = useState<{
        button1: string;
        button2: string;
        button3: string;
        button4: string;
    }>({
        button1: "menu-button-gray",
        button2: "menu-button-gray",
        button3: "menu-button-gray",
        button4: "menu-button-gray",
    });

    const [answered, setAnswered] = useState(false);
    const [inTimeout, setInTimeout] = useState(false);

    function handleNextQuestion() {
        if (inTimeout) return;

        setInTimeout(true);
        setAnswered(false);
        setButtonColors({
            button1: "menu-button-gray",
            button2: "menu-button-gray",
            button3: "menu-button-gray",
            button4: "menu-button-gray",
        });

        store.dispatch(setNextQuestionAction());
        setCurrentQuestion(store.getState().gameReducer.question!);

        setTimeout(() => setInTimeout(false), 1500);
    }

    function handleAnswerChoice(answerNumber: number) {
        if (answered) return;
        if (![1, 2, 3, 4].includes(answerNumber)) return;

        setAnswered(true);

        const correctNumber = correctAnswerNumber();
        const isCorrect = answerNumber === correctNumber;

        setButtonColors((prevColors) => ({
            ...prevColors, 
            [`button${answerNumber}`]: "menu-button-red",
            [`button${correctNumber}`]: isCorrect ? "menu-button-green" : "menu-button-blue",
        }));
    }

    function correctAnswerNumber(): number {
        const correctAnswer = currentQuestion.correctAnswer;
        if (currentQuestion.option1 === correctAnswer) return 1;
        if (currentQuestion.option2 === correctAnswer) return 2;
        if (currentQuestion.option3 === correctAnswer) return 3;
        return 4;
    }

    return (
        <div className="question-page">
            <h1>{currentQuestion?.questionBody}</h1>
            {Array.from({ length: 4 }, (_, index) => (
                <CustomButton
                    key={index}
                    className={buttonColors[`button${index + 1}` as keyof typeof buttonColors]}
                    name={currentQuestion?.[`option${index + 1}` as keyof QuestionModel]}
                    handleClick={() => handleAnswerChoice(index + 1)}
                />
            ))}
            {answered === true && (
                <CustomButton className="menu-button-gray" name="Continue" handleClick={() => handleNextQuestion()} />
            )}
        </div>
    );
}
export default QuestionPage