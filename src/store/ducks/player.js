export const Types = {
    FETCH_MUSIC: 'music/FETCH',
    FETCH_MUSIC_SUCCESS: 'music/FETCH_SUCCESS',
    FETCH_MUSIC_ERROR: 'music/FETCH_ERROR',
}

export const fetchPlayerSuccess = music => {
    return {
        type: Types.FETCH_MUSIC_SUCCESS,
        payload: {
            music
        }
    }
}

export const fetchPlayerError = () => {
    return {
        type: Types.FETCH_MUSIC_ERROR
    }
}


const INITIAL_STATE = {
    music: {}
}

const playerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.FETCH_MUSIC_SUCCESS:
            return {
                ...state,
                music: action.payload.music
            }

        default:
            return state

    }
}

export default playerReducer