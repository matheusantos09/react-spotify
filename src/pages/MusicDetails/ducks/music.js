import {createActions, createReducer} from "reduxsauce";

export const {Types, Creators} = createActions({
  fetchMusicById: [],
  fetchMusicByIdSaga: ['id'],
  fetchMusicSuccess: ['music'],
  fetchMusicError: [],
})

const INITIAL_STATE = {
  item: {
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
  loading: true
}

const fetchSuccess = (state = INITIAL_STATE, action) => ({
  item: action.music,
  loading: false
})

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_MUSIC_SUCCESS]: fetchSuccess
})