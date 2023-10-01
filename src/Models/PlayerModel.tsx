import { UserAnswerModel } from "./UserAnswerModel";

export interface PlayerModel {
    playerId?: string;
    name?: string;
    answers?: UserAnswerModel[];
}