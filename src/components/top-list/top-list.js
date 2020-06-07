import React, {useEffect, useState} from "react";
import {MusicList} from "../music-list/music-list";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {getSongList} from "../../api/recommend";
import {createSong, processSongsUrl} from "../../common/js/song";
import {ERR_OK} from "../../api/config";
import {getMusicList} from "../../api/rank";

function TopList(props) {
    let {topList} = props;
    let history = useHistory();
    let [songs, setSongs] = useState([]);

    function _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
            const musicData = item.data
            if (musicData.songid && musicData.albummid) {
                ret.push(createSong(musicData))
            }
        })
        return ret
    }

    function _getMusicList() {
        if (!topList.id) {
            history.push('/rank')
            return
        }
        getMusicList(topList.id).then((res) => {
            if (res.code === ERR_OK) {
                setSongs(_normalizeSongs(res.songlist))
            }
        })
    }

    useEffect(() => {
        _getMusicList();
    }, [])
    return <div>
        <MusicList rank={true} title={topList.topTitle} bgImage={songs && songs[0]?.image} songs={songs}/>
    </div>
}

const mapStateToProps = state => {
    let {playSong} = state;
    return {
        ...playSong
    };
};
export default connect(
    mapStateToProps,
    {}
)(TopList);
