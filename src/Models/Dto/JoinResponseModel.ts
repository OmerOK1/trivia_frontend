import { GameModel } from "../GameModel";
import { PlayerModel } from "../PlayerModel";

export interface JoinResponseModel{
    game: GameModel;
    player: PlayerModel;
}