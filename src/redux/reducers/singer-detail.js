import * as types from '../actionTypes'

export default function (state = {}, action) {
    switch (action.type) {
        case types.SET_SINGER: {
            state.singer = action.singer
            return state
        }
        default: {
            return state;
        }
    }
}

