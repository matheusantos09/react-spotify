import {all} from 'redux-saga/effects'
import Dashboard from "../pages/Dashboard/ducks";
import Music from "../pages/MusicDetails/ducks";

export default function* rootSaga() {
  return yield all([
    Dashboard(),
    Music()
  ])
}