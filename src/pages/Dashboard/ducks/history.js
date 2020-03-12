import {createActions, createReducer} from "reduxsauce";

export const {Types, Creators} = createActions({
  fetchHistory: [],
  fetchHistorySaga: [],
  historySearchSaga: ['search'],
  historySearch: ['search'],
  fetchHistorySuccess: ['history'],
  fetchHistoryError: []
})

const INITIAL_STATE = {
  history: [],
  historyFiltered: []
}

const fetchSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    history: action.history.items,
    historyFiltered: action.history.items,
  }
}

const historySearch = (state = INITIAL_STATE, action) => {

  if (!action.search.length) {
    return {
      ...state,
      historyFiltered: state.history
    }
  }

  if (typeof state.history === 'undefined') {
    return {
      ...state,
      historyFiltered: state.history
    }
  }

  return {
    ...state,
    historyFiltered: state.history.filter(item => item.track.name.includes(action.search))
  }
}

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_HISTORY_SUCCESS]: fetchSuccess,
  [Types.HISTORY_SEARCH]: historySearch,
})