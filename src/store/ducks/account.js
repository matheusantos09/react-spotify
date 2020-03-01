export const Types = {
    SET_TOKEN: 'account/SET_TOKEN',
    GET_TOKEN: 'account/GET_TOKEN',
}

const INITIAL_STATE = {
    token: null
}

function account(state = INITIAL_STATE, action) {

    switch (action.type) {
        case Types.SET_TOKEN:
            return {...state, token: action.payload.token}

        case Types.GET_TOKEN:
            return state

        default:
            return state;
    }
}

export default account