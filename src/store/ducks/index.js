import {combineReducers} from "redux";

import account from "./account";
import history from "./history";
import player from "./player";
import search from "./search";

export default combineReducers({
    history,
    account,
    player,
    search
});
