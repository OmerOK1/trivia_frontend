import { Category } from "./Enums/Category";
import { Difficulty } from "./Enums/Difficulty";
import { LayoutEnum } from "./Enums/LayoutEnum";

// export class GameModel{
//     public id?: number;
//     public title?: string;
//     public category?: Category;
//     public difficulty ?: Difficulty;
//     public questionsPerRound ?: number;
//     public layout ?: LayoutEnum;
//     public url ?: string;



//     public constructor(id?: number, title?: string, category?: Category, difficulty?: Difficulty, questionsPerRound?: number, layout?: LayoutEnum, url?: string) {
//         this.id = id;
//         this.title = title;
//         this.category = category;
//         this.difficulty = difficulty;
//         this.questionsPerRound = questionsPerRound;
//         this.layout = layout;
//         this.url = url;
//     }
// }
export interface GameModel {
    id?: number;
    title?: string;
    category?: Category;
    difficulty?: Difficulty;
    questionsPerRound?: number;
    answerTimeLimit?: number;
    layout?: LayoutEnum;
    url?: string;
}