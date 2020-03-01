import {combineReducers} from "redux";

import history from "./history";
import player from "./player";
import search from "./search";

export default combineReducers({
    history,
    player,
    search
});
