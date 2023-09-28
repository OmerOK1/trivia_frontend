import { Category } from "./Enums/Category";
import { Difficulty } from "./Enums/Difficulty";
import { LayoutEnum } from "./Enums/LayoutEnum";
import { QuestionModel } from "./QuestionModel";

export interface GameModel {
    id?: number;
    title?: string;
    category?: Category;
    difficulty?: Difficulty;
    questionsPerRound?: number;
    answerTimeLimit?: number;
    layout?: LayoutEnum;
    url?: string;
    questions?: QuestionModel[];
    isMultiplayer?: boolean;
}