import {combineReducers} from "redux";
import singerDetail from "./singer-detail";
import playSong from './play-song';

export default combineReducers({singerDetail, playSong});
