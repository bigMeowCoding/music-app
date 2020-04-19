import React, {useEffect, useMemo, useState} from "react";
import {connect} from "react-redux";
import {getSingerDetail} from "../../api/singer";
import {ERR_OK} from "../../api/config";
import {useHistory} from "react-router-dom";
import {createSong} from "../../common/js/song";
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
                setSongs(_normalizeSongs(res.data.list));
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

    return <div>
        <MusicList title={title} bgImage={bgImage} songs={songs}/>
    </div>
}

const mapStateToProps = state => {
    return {
        singer: state.singerDetail.singer
    };
};

export default connect(mapStateToProps)(SingerDetail);
