import React, {useEffect, useState} from "react";
import {MusicList} from "../music-list/music-list";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {getSongList} from "../../api/recommend";
import {createSong, processSongsUrl} from "../../common/js/song";
import {ERR_OK} from "../../api/config";

function Disc(props) {
    let {disc} = props;
    let history = useHistory();
    let [songs,setSongs]= useState([]);
    function _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
            if (musicData.songid && musicData.albummid) {
                ret.push(createSong(musicData))
            }
        })
        return ret
    }
    useEffect(() => {
        if (!disc.dissid) {
            history.push('/recommend')
            return
        }
        getSongList(disc.dissid).then((res) => {
            if (res.code === ERR_OK) {

                processSongsUrl(_normalizeSongs(res.cdlist[0].songlist)).then((songs) => {
                    setSongs(songs)
                });
            }
        })
    },[])
    return <div>
        <MusicList title={disc.dissname} bgImage={disc.imgurl} songs={songs}/>
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
)(Disc);
