import {createActions, createReducer} from "reduxsauce";

export const {Types, Creators} = createActions({
  fetchHistory: [],
  fetchHistorySaga: [],
  fetchHistorySuccess: ['history'],
  fetchHistoryError: []
})

const INITIAL_STATE = []

const fetchSuccess = (state = INITIAL_STATE, action) => {
  return action.history.items
}

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_HISTORY_SUCCESS]: fetchSuccess,
})