import globals from "../Services/Globals";
import { GameModel } from "../Components/Models/GameModel";
import axios from "axios";


const customerURL = globals.urls.customer;

export async function addGameApi(game: GameModel) {
    return await axios.post<GameModel>(customerURL+"games", game)
}