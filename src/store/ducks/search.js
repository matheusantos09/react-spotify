import {createActions, createReducer} from "reduxsauce";

export const {Types, Creators} = createActions({
  fetchSearch: [],
  fetchSearchSaga: ['search'],
  fetchSearchSuccess: ['tracks'],
  fetchSearchError: [],
  showResult: ['show'],
  loading: [],
  addMusicQueue: ['uri'],
  playMusic: ['uri', 'trackNumber'],
})

const INITIAL_STATE = {
  searchResult: [],
  showResult: false,
  loading: false
}

const fetchSearchSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  searchResult: action.tracks
})

const showResult = (state = INITIAL_STATE, action) => ({
  ...state,
  showResult: action.show
})

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_SEARCH]: '',
  [Types.FETCH_SEARCH_SUCCESS]: fetchSearchSuccess,
  [Types.FETCH_SEARCH_ERROR]: '',
  [Types.SHOW_RESULT]: showResult,
  [Types.LOADING]: '',
})