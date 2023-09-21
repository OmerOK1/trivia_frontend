import { connect } from "react-redux";
import { GameState } from "../../../../Redux/GameState";
import { UserAnswerModel } from "../../../../Models/UserAnswerModel";
import { QuestionModel } from "../../../../Models/QuestionModel";
import store from "../../../../Redux/Store";

function GameReview() {
    const game = store.getState().gameReducer.game;
    const userAnswers = store.getState().gameReducer.userAnswers;
    

    //const totalCorrectAnswers = userAnswers.filter((answer) => answer.isCorrect).length;

    console.log('userAnswers:', userAnswers);
    console.log('title:', game?.title);
    console.log('gameLength:', game?.questionsPerRound);
    console.log('questions:', game?.questions);



    return (
        <div className="game-review-page">
          <h1>{game?.title}</h1>
          <p>Total correct answers: {userAnswers.filter((answer)=>answer.isCorrect).length}/{game?.questionsPerRound}</p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {game?.questions?.map((question, index) => {
                // Find the user's answer for this question
                const userAnswer = userAnswers.find((answer) => answer.questionIndex === index);
                const isCorrect = userAnswer?.isCorrect || false;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{question.questionBody}</td>
                    <td>{isCorrect ? "✅" : "❌"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
}
export default GameReview;