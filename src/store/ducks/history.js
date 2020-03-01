export const Types = {
  FETCH_HISTORY: 'history/ADD',
  FETCH_HISTORY_SUCCESS: 'history/FETCH_SUCCESS',
  FETCH_HISTORY_ERROR: 'history/FETCH_ERROR',
}

export const fetchHistorySuccess = history => {
  return {
    type: Types.FETCH_HISTORY_SUCCESS,
    payload: {
      history
    }
  }
}

export const fetchHistoryError = () => {
  return {
    type: Types.FETCH_HISTORY_ERROR
  }
}

const INITIAL_STATE = []

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.FETCH_HISTORY_SUCCESS:
      return action.payload.history

    default:
      return state

  }
}

export default reducer