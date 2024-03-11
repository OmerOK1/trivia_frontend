import { Category } from "./Enums/Category";
import { Difficulty } from "./Enums/Difficulty";
import { GameMode } from "./Enums/GameMode";
import { LayoutEnum } from "./Enums/LayoutEnum";
import { PlayerModel } from "./PlayerModel";
import { QuestionModel } from "./QuestionModel";

export interface ExpandedGameFormModel {
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
    players?: PlayerModel[];
    gameMode?: GameMode;
    lives?: number;
    bonusTime?: number;
}