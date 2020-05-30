import React, {useEffect, useMemo, useState} from "react";
import {connect} from "react-redux";
import {getSingerDetail} from "../../api/singer";
import {ERR_OK} from "../../api/config";
import {useHistory} from "react-router-dom";
import {createSong, processSongsUrl} from "../../common/js/song";
import {
    setCurrentIndex,
    setFullScreen,
    setPlayingMode,
    setPlayingState,
    setPlayList,
    setSequenceList
} from "../../redux/actions";
import {MusicList} from "../music-list/music-list";
import {playMode} from "../../common/js/config";
import {shuffle} from "../../common/js/utils";

function SingerDetail(props) {
    let {singer, mode} = props;

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
    function findIndex(list, song) {
        return list.findIndex((item) => {
            return item.id === song.id
        })
    }
    function selectSongItem(song, index) {
        props.setSequenceList(songs);
        if (mode === playMode.random) {
            const randomList = shuffle(songs)
            props.setPlayList(randomList);
            props.setCurrentIndex(findIndex(randomList, songs[index]));
        } else {
            props.setPlayList(songs);
            props.setCurrentIndex(index);
        }
        props.setPlayingState(true);
        props.setFullScreen(true);
    }

    function randomPlayAll(songList) {
        props.setPlayingMode(playMode.random);
        props.setSequenceList(songList);
        props.setPlayList(shuffle(songList));
        props.setCurrentIndex(0);
        props.setPlayingState(true);
        props.setFullScreen(true);
    }

    return <div>
        <MusicList title={title} bgImage={bgImage}
                   randomPlayAll={randomPlayAll}
                   songs={songs} selectSongItem={selectSongItem}/>
    </div>
}

const mapStateToProps = state => {
    return {
        singer: state.singerDetail.singer,
        mode: state.playSong.mode
    };
};

export default connect(mapStateToProps, {
    setPlayList,
    setSequenceList,
    setCurrentIndex,
    setFullScreen,
    setPlayingState,
    setPlayingMode
})(SingerDetail);
