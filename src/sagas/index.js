import {all} from 'redux-saga/effects'
import Dashboard from "../pages/Dashboard/ducks";

export default function* rootSaga() {
  return yield all([
    Dashboard()
  ])
}