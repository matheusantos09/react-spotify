import {combineReducers} from "redux";

import history from "../pages/Dashboard/ducks/history";
import player from "../pages/Dashboard/ducks/player";
import search from "../pages/Dashboard/ducks/search";
import musicDetails from "../pages/MusicDetails/ducks/music";

export default combineReducers({
  history,
  player,
  search,
  musicDetails
});
