import React, {useEffect, useMemo, useRef} from "react";
import './music-list.scss';
import {useHistory} from "react-router-dom";
import {Scroll} from "../../base/scroll/scroll";
import {SongList} from "../../base/song-list/song-list";

export function MusicList(props) {
    let {title, bgImage, songs} = props;
    const bgImageRef = useRef(),
        songListRef = useRef(),
        history = useHistory(), listenScroll = true, probeType = 3;
    useEffect(() => {
        if (bgImageRef.current) {
            bgImageRef.current.style = `background-image:url(${bgImage})`;
            if (songListRef.current) {
                songListRef.current.style.top = `${bgImageRef.current.clientHeight}px`;
            }
        }
    }, [bgImage])
    // useEffect(() => {
    //     this.imageHeight = this.$refs.bgImage.clientHeight
    //     // this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
    // }, [])

    function back() {
        history.goBack()
    }

    return (
        <div className="music-list">
            <div className="back" onClick={back}>
                <i className="icon-back"/>
            </div>
            <h1 className="title">
                {title}
            </h1>
            <div className="bg-image" ref={bgImageRef}>
                <div className="play-wrapper">
                    <div className="play">
                        <i className="icon-play"/>
                        <span className="text">随机播放全部</span>
                    </div>
                </div>
                <div className="filter"/>
            </div>
            <div className="list" ref={songListRef}>
                <Scroll data={songs} listenScroll={listenScroll} probeType={probeType}>
                    <div className="song-list-wrapper">
                        <SongList songs={songs}/>
                    </div>
                </Scroll>
            </div>

        </div>
    )
}
