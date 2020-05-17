import React, {useEffect, useMemo, useState} from "react";
import {connect} from "react-redux";
import {getSingerDetail} from "../../api/singer";
import {ERR_OK} from "../../api/config";
import {useHistory} from "react-router-dom";
import {createSong, processSongsUrl} from "../../common/js/song";
import {setCurrentIndex, setFullScreen, setPlayingState, setPlayList, setSequenceList} from "../../redux/actions";
import {MusicList} from "../music-list/music-list";

function SingerDetail(props) {
    let {singer} = props;

    let history = useHistory();

    let [songs, setSongs] = useState([]);
    let {title, bgImage} = useMemo(() => {
        if (!singer || !singer.id) {
            history.push('/singerList');
            return {
                title: '',
                bgImage: ''
            }
        }
        return {
            title: singer.name,
            bgImage: singer.avatar
        }
    }, [singer])
    useEffect(() => {
        if (!singer || !singer.id) {
            history.push('/singerList');
            return
        }
        getSingerDetail(singer.id).then((res) => {
            if (res.code === ERR_OK) {
                processSongsUrl(_normalizeSongs(res.data.list)).then((songs) => {
                    setSongs(songs);
                }, (error) => {
                    console.error(error)
                });
            }
        })
    }, []);

    function _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
            let {musicData} = item
            if (musicData.songid && musicData.albummid) {
                ret.push(createSong(musicData))
            }
        })
        return ret
    }

    function selectSongItem(song, index) {
        props.setCurrentIndex(index);
        props.setSequenceList(songs);
        props.setPlayList(songs);
        props.setPlayingState(true);
        props.setFullScreen(true);
    }

    return <div>
        <MusicList title={title} bgImage={bgImage} songs={songs} selectSongItem={selectSongItem}/>
    </div>
}

const mapStateToProps = state => {
    return {
        singer: state.singerDetail.singer
    };
};

export default connect(mapStateToProps, {
    setPlayList,
    setSequenceList,
    setCurrentIndex,
    setFullScreen,
    setPlayingState
})(SingerDetail);
