import * as types from '../actionTypes'

export default function (state = {}, action) {
    console.log(action)
    switch (action.type) {
        case types.SET_SINGER: {
            state.singer = action
            return state
        }
        default: {
            return state;
        }
    }
}

