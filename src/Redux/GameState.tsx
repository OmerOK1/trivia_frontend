import { number } from "yup";
import { GameModel } from "../Components/Models/GameModel";
import { QuestionModel } from "../Components/Models/QuestionModel";
import { type } from "os";

// Step 1 - Create AppState and manage the collection once and in a centralize place
// Define your initial state and GameState type
export interface GameState {
    game?: GameModel;
    question?: QuestionModel;
    questionIndex: number;
    isLastQuestion: boolean;
}

// Initialize the game property with an empty object conforming to GameModel
const initialState: GameState = {
    game: {} as GameModel,
    question: {} as QuestionModel,
    questionIndex: 0,
    isLastQuestion: false
};

// Step 2 - Define all possible actions for your application state
export enum GameActionType {
    SetGame = "setGame",
    CheckLastQuestion = "checkLastQuestion",
    SetNextQuestion = "setNextQuestion",
    IncrementIndex = "incrementIndex",
    SetQuestion = "setQuestion",
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface GameAction {
    type: GameActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action

export function setGameAction(
    game: GameModel
): GameAction {
    return {
        type: GameActionType.SetGame,
        payload: game
    };
}

export function setNextQuestionAction(): GameAction {
    return {
        type: GameActionType.SetNextQuestion
    }
}

export function checkLastQuestionAction(): GameAction {
    return {
        type: GameActionType.CheckLastQuestion
    }
}

export function setQuestionAction(
    question: QuestionModel
): GameAction {
    return {
        type: GameActionType.SetQuestion,
        payload: question
    };
}

export function incrementIndexAction() {
    return {
        type: GameActionType.IncrementIndex,
    }
}

// Step 5 - Reducer function perform the required action

export function GameReducer(
    currentState: GameState = initialState,
    action: GameAction
): GameState {
    const newState = { ...currentState };

    switch (action.type) {
        case GameActionType.SetGame:
            newState.game = action.payload;
            newState.question = newState.game?.questions?.at(0);
            newState.questionIndex = 1;
            newState.isLastQuestion = newState.game?.questionsPerRound === 1;
            break;
        case GameActionType.SetNextQuestion: //full state managemnet for next question transition. TODO: does not handle improper calls gracfully
            if (!newState.isLastQuestion) {
                newState.question = newState.game?.questions?.at(newState.questionIndex);
                newState.questionIndex++;
                newState.isLastQuestion = newState.questionIndex === newState.game?.questionsPerRound;
            }
            break;
        case GameActionType.CheckLastQuestion:
            newState.isLastQuestion = (newState.questionIndex === newState.game?.questionsPerRound);
            break;
        case GameActionType.SetQuestion:
            newState.question = action.payload;
            break;
        case GameActionType.IncrementIndex:
            newState.questionIndex++;
            break;

    }
    return newState;
}
