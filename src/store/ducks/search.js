export const Types = {
  FETCH_SEARCH: 'search/FETCH',
  FETCH_SEARCH_SUCCESS: 'search/FETCH_SUCCESS',
  FETCH_SEARCH_ERROR: 'search/FETCH_ERROR',
  SHOW_RESULT: 'search/SHOW_RESULT',
  LOADING: 'search/LOADING',
}

export const fetchSearchSuccess = search => {
  return {
    type: Types.FETCH_SEARCH_SUCCESS,
    payload: {
      search
    }
  }
}

export const fetchSearchError = () => {
  return {
    type: Types.FETCH_SEARCH_ERROR
  }
}

export const showResult = show => {
  return {
    type: Types.SHOW_RESULT,
    payload: {
      show
    }
  }
}

export const loading = loading => {
  return {
    type: Types.LOADING,
    payload: {
      loading
    }
  }
}

const INITIAL_STATE = {
  searchResult: [],
  showResult: false,
  loading: false
}

function reducer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case Types.FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        searchResult: action.payload.search
      }

    case Types.SHOW_RESULT:
      return {
        ...state,
        showResult: action.payload.show
      }

    case Types.LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }

    default:
      return state;
  }
}

export default reducer