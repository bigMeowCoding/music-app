import {
    SET_CURRENT_INDEX,
    SET_FULL_SCREEN, SET_PLAY_MODE,
    SET_PLAYING_STATE,
    SET_PLAYLIST,
    SET_SEQUENCE_LIST,
    SET_SINGER
} from "./actionTypes";

export const setSinger = singer => {
    return {
        type: SET_SINGER,
        singer
    }
};

export const setSequenceList = function (songList) {
    return {
        type: SET_SEQUENCE_LIST,
        songList
    }
}
export const setPlayingMode = function (mode) {
    return {
        type: SET_PLAY_MODE,
        mode
    }
}
export const setPlayList = function (songList) {
    return {
        type: SET_PLAYLIST,
        songList
    }
}
export const setCurrentIndex = function (index) {
    return {
        type: SET_CURRENT_INDEX,
        index
    }
}
export const setFullScreen = function (fullScreen) {
    return {
        type: SET_FULL_SCREEN,
        fullScreen
    }
}
export const setPlayingState = function (isPlaying) {
    return {
        type: SET_PLAYING_STATE,
        isPlaying
    }
}


