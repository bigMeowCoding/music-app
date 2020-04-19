import React, {useEffect, useMemo, useRef} from "react";
import './music-list.scss';
import {useHistory} from "react-router-dom";

export function MusicList(props) {
    let {title, bgImage} = props;
    const bgImageRef = useRef(), history = useHistory();
    useEffect(() => {
        if (bgImageRef.current) {
            bgImageRef.current.style = `background-image:url(${bgImage})`
            console.log(bgImageRef.current)

        }
    }, [bgImage])
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
            </div>
        </div>
    )
}
