import { GameModel } from "../Models/GameModel";
import { QuestionModel } from "../Models/QuestionModel";
import { UserAnswerModel } from "../Models/UserAnswerModel";


const getInitialStateFromLocalStorage = (): GameState => {
    const localState = localStorage.getItem("persistentState");
    if (localState) {
        try {
            // Parse the JSON data from local storage
            const parsedState = JSON.parse(localState);
            // Make sure it matches the structure of GameState
            if (isValidState(parsedState)) {
                return parsedState;
            }
        } catch (error) {
            // Handle any parsing errors
            console.error("Error accessing local state:", error);
        }
    }
    // If no valid state was found in local storage, return the default initial state
    return {
        game: {} as GameModel,
        question: {} as QuestionModel,
        questionIndex: 0,
        isLastQuestion: false,
        userAnswers: [] as UserAnswerModel[],
    };
};

const isValidState = (state: any): state is GameState => {
    return (
        typeof state === "object" &&
        "game" in state &&
        "question" in state &&
        "questionIndex" in state &&
        "isLastQuestion" in state &&
        "userAnswers" in state
    );
};



// Step 1 - Create AppState and manage the collection once and in a centralize place
// Define your initial state and GameState type
export interface GameState {
    game?: GameModel;
    question?: QuestionModel;
    questionIndex: number;
    isLastQuestion: boolean;
    userAnswers: UserAnswerModel[];
}

// Initialize the game property with an empty object conforming to GameModel
const initialState: GameState = getInitialStateFromLocalStorage();


// Step 2 - Define all possible actions for your application state
export enum GameActionType {
    SetGame = "setGame",
    CheckLastQuestion = "checkLastQuestion",
    SetNextQuestion = "setNextQuestion",
    IncrementIndex = "incrementIndex",
    SetQuestion = "setQuestion",
    AddUserAnswer = "addUserAnswer",
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

export function addUserAnswerAction(
    questionIndex: number,
    answerText: string,
    isCorrect: boolean
): GameAction {
    const userAnswer: UserAnswerModel = {
        questionIndex: questionIndex,
        answerText: answerText,
        isCorrect: isCorrect,
    };

    return {
        type: GameActionType.AddUserAnswer,
        payload: userAnswer
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
            newState.userAnswers = []
            break;
        case GameActionType.SetNextQuestion: //full state managemnet for next question transition. TODO: does not handle improper calls gracfully
            if (!newState.isLastQuestion) {
                newState.question = newState.game?.questions?.at(newState.questionIndex);
                newState.questionIndex++;
                newState.isLastQuestion = newState.questionIndex === newState.game?.questionsPerRound;
            }
            break;
        case GameActionType.AddUserAnswer:
            newState.userAnswers.push(action.payload);
            console.log(newState.userAnswers);
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
    localStorage.setItem("persistentState", JSON.stringify(newState));

    return newState;
}
