import {createActions, createReducer} from "reduxsauce";

export const {Types, Creators} = createActions({
  fetchMusic: [],
  fetchMusicSaga: [],
  fetchMusicSuccess: ['music'],
  fetchMusicError: [],
  fetchPlayPauseMusicSaga: ['play_pause', 'music'],
  fetchStepBackwardSaga: [],
  fetchStepForwardSaga: [],
})

const INITIAL_STATE = {
  music: {
    uri: '',
    progress_ms: 0,
    item: {
      duration_ms: 0,
      name: '',
      album: {
        images: [
          {
            url: ''
          },
          {
            url: ''
          },
          {
            url: ''
          }
        ]
      },
      artists: [
        {
          name: ''
        }
      ],
    },
    is_playing: false
  },
  controls: {
    isPlaying: false
  }
}

const fetchSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  music: action.music,
  controls: {
    isPlaying: action.music.is_playing,
  }
})

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_MUSIC_SUCCESS]: fetchSuccess
})