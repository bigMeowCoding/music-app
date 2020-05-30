import React, {useEffect, useMemo, useRef, useState} from "react";
import './music-list.scss';
import {useHistory} from "react-router-dom";
import {Scroll} from "../../base/scroll/scroll";
import {SongList} from "../../base/song-list/song-list";
import {prefixStyle} from "../../common/js/dom";
import {Loading} from "../../base/loading/loading";

const RESERVED_HEIGHT = 40
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')

export function MusicList(props) {
    let {
        title, bgImage, songs,
        selectSongItem,
        randomPlayAll
    } = props;
    let [scrollY, setScrollY] = useState(0);
    let [minTranslateY, setMinTranslateY] = useState(0);
    const bgImageRef = useRef(),
        songListRef = useRef(),
        playBtnRef = useRef(),
        layerRef = useRef(),
        maskRef = useRef(),
        history = useHistory(), listenScroll = true, probeType = 3;
    useEffect(() => {
        if (bgImageRef.current) {
            const bgImageHeight = bgImageRef.current.clientHeight;
            bgImageRef.current.style = `background-image:url(${bgImage})`;
            setMinTranslateY(-1 * bgImageHeight + RESERVED_HEIGHT);
            if (songListRef.current) {
                songListRef.current.style.top = `${bgImageHeight}px`;
            }
        }
    }, [bgImage])
    useEffect(() => {
        let translateY = Math.max(minTranslateY, scrollY), zIndex = 0;
        const layerEle = layerRef.current, bgEle = bgImageRef.current, playBtnEle = playBtnRef.current;
        if (layerEle) {
            layerEle.style[transform] = `translate3d(0,${translateY}px,0)`
        }
        if (scrollY > 0) {
            zIndex = 10;
        }
        if (bgEle) {
            const percent = Math.abs(scrollY / bgEle.clientHeight);
            let scale = 1, blur = 0;
            if (scrollY > 0) {
                scale = 1 + percent
            } else {
                blur = Math.min(20, percent * 20)
            }
            if (scrollY < minTranslateY) {
                zIndex = 10;
                bgEle.style.height = `${RESERVED_HEIGHT}px`;
                bgEle.style.paddingTop = 0;
                if (playBtnEle) {
                    playBtnEle.style.display = 'none';
                }
            } else {
                bgEle.style.height = 0;
                bgEle.style.paddingTop = '70%';
                if (playBtnEle) {
                    playBtnEle.style.display = '';
                }
            }
            bgEle.style.zIndex = zIndex;
            bgEle.style[transform] = `scale(${scale})`
            maskRef.current.style[backdrop] = `blur(${blur}px)`
        }

    }, [scrollY])

    function back() {
        history.goBack()
    }

    function getScrollPos(pos) {
        setScrollY(pos.y);
    }

    function randomClickHandle() {
        randomPlayAll(songs);
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
                    <div className="play" ref={playBtnRef} onClick={randomClickHandle}>
                        <i className="icon-play"/>
                        <span className="text">随机播放全部</span>
                    </div>
                </div>
                <div className="filter" ref={maskRef}/>
            </div>
            <div className="bg-layer" ref={layerRef}/>
            <div className="list" ref={songListRef}>
                <Scroll data={songs}
                        getPos={getScrollPos}
                        listenScroll={listenScroll} probeType={probeType}>
                    <div className="song-list-wrapper">
                        <SongList songs={songs} selectSongItem={selectSongItem}/>
                    </div>
                    {
                        !songs.length ? <div className="loading-container">
                            <Loading/>
                        </div> : null
                    }

                </Scroll>
            </div>

        </div>
    )
}

