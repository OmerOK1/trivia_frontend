import { combineReducers, createStore } from "redux";
import { GameReducer } from "./GameState";

const reducers = combineReducers({gameReducer: GameReducer});
const store = createStore(reducers)

export default store;
