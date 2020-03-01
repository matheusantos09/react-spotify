import {createActions, createReducer} from "reduxsauce";

export const {Types, Creators} = createActions({
  fetchMusic: [],
  fetchMusicSaga: [],
  fetchMusicSuccess: ['music'],
  fetchMusicError: [],
})

const INITIAL_STATE = {
  music: {}
}

const fetchSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  music: action.music
})

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_MUSIC_SUCCESS]: fetchSuccess
})