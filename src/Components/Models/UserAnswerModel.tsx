export interface UserAnswerModel {
    questionIndex: number;
    answerText: string;
    isCorrect: boolean;
} // any changes need to be reflected in: Redux.GameState.tsx -> actions -> addUserAnswerAction()