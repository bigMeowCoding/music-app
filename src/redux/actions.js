import {SET_SINGER} from "./actionTypes";
export const setSinger = singer => {
    return {
        type:SET_SINGER,
        singer
    }
};
