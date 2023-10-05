import globals from "../Services/Globals";
import { GameModel } from "../Models/GameModel";
import axios from "axios";
import { PlayerModel } from "../Models/PlayerModel";
import { JoinResponseModel } from "../Models/Dto/JoinResponseModel";
import { number } from "yup";


const customerURL = globals.urls.customer;

export async function addGameApi(game: GameModel) {
    return await axios.post<GameModel>(customerURL+"games", game);
}

export async function getGameApi(gameId: number) {
    return await axios.get<GameModel>(customerURL+"games/getone",{ params: {id: gameId}});
}

export async function updatePlayerApi(player: PlayerModel, gameId: number) {
    return await axios.put<PlayerModel>(customerURL+"games/update", player, {params: {id: gameId}});
}

export async function joinGameApi(gameId: number) {
    return await axios.get<JoinResponseModel>(customerURL+"games/join", {params: {gameId}});
}

