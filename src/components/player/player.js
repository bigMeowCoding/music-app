import React, {useCallback, useEffect, useRef, useState} from "react";
import {Scroll} from "../../base/scroll/scroll";
import {connect} from "react-redux";
import './player.scss';
import {setCurrentIndex, setFullScreen, setPlayingState} from "../../redux/actions";

function Player(props) {
    let {
        playList, fullScreen, currentIndex, sequenceList,
        setFullScreen, setPlayingState,
        setCurrentIndex,
        playing
    } = props;
    let [songReady, setSongReady] = useState(false); // audio可以播放歌曲了
    const currentSong = sequenceList && sequenceList[currentIndex] || {};
    const audioRef = useRef();
    useEffect(() => {
        if (currentSong && audioRef.current && playing) {
            audioRef.current.play()
        }
    }, [currentSong]);
    useEffect(() => {
        if (audioRef.current) {
            if (playing) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [playing])

    function back() {
        setFullScreen(false);
    }

    function open() {
        setFullScreen(true);
    }

    function playSongIfPause() {
        if (!playing) {
            togglePlaying();
        }
    }

    function next() {
        if (!songReady) {
            return;
        }
        if (currentIndex === playList.length - 1) {
            setCurrentIndex(0)
        } else {
            setCurrentIndex(currentIndex + 1);
        }
        playSongIfPause();
        waitSongLoad();
    }

    function waitSongLoad() {
        setSongReady(false);
    }

    function prev() {
        if (!songReady) {
            return;
        }
        if (currentIndex === 0) {
            setCurrentIndex(playList.length - 1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
        playSongIfPause()
        waitSongLoad();
    }

    function togglePlaying(e) {
        setPlayingState(!playing);
        if (e) {
            e.stopPropagation();
        }
    }

    function canPlayHandle() {
        setSongReady(true);
    }

    function audioErrorHandle() {
        songReady = true;
    }

    if (playList && playList.length > 0) {
        return <div className="player">
            {fullScreen ? <div className="normal-player">
                    <div className="background">
                        <img width="100%" height="100%" src={currentSong.image} alt=""/>
                    </div>
                    <div className="top">
                        <div className="back">
                            <i className='icon-back' onClick={back}></i>
                        </div>
                        <h1 className="title">
                            {currentSong.name}
                        </h1>
                        <h2 className="subtitle">
                            {currentSong.singer}
                        </h2>
                    </div>
                    <div className="middle">
                        <div className="middle-l">
                            <div className="cd-wrapper">
                                <div className={`cd ${playing ? 'play' : 'play pause'}`}>
                                    <img className="image" src={currentSong.image}/>
                                </div>
                            </div>
                            <div className="playing-lyric-wrapper">
                                <div className="playing-lyric"></div>
                            </div>
                        </div>
                        <Scroll className="middle-r">
                            <div className="lyric-wrapper">
                                <div>
                                    <p className="text"></p>
                                </div>
                            </div>
                        </Scroll>
                    </div>
                    <div className="bottom">
                        <div className="dot-wrapper">
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                        <div className="progress-wrapper">
                            <span className="time time-l"></span>
                            <div className="progress-bar-wrapper">
                                {/*<progress-bar ></progress-bar>*/}
                            </div>
                            <span className="time time-r"></span>
                        </div>
                        <div className="operators">
                            <div className="icon i-left">
                                <i></i>
                            </div>

                            <div>{songReady}</div>
                            <div className={"icon i-left " + `${songReady ? '' : 'disable'}`}>
                                <i className='icon-prev' onClick={prev}></i>
                            </div>
                            <div className={"icon i-center " + `${songReady ? '' : 'disable'}`}>
                                <i onClick={togglePlaying} className={playing ? 'icon-pause' : 'icon-play'}></i>
                            </div>
                            <div className={"icon i-right " + `${songReady ? '' : 'disable'}`}>
                                <i className='icon-next ' onClick={next}></i>
                            </div>
                            <div className="icon i-right">
                                <i className="icon icon-not-favorite"></i>
                            </div>
                        </div>
                    </div>
                </div>
                : <div className="mini-player" onClick={open}>
                    <div className="icon">
                        <img className={`${playing ? 'play' : 'play pause'}`} src={currentSong.image} width="40"
                             height="40"/>
                    </div>
                    <div className="text">
                        <h2 className="name">
                            {currentSong.name}
                        </h2>
                        <p className="desc">
                            {currentSong.singer}
                        </p>
                    </div>
                    <div className="control">
                        <i onClick={togglePlaying} className={`${playing ? 'icon-pause-mini' : 'icon-play-mini'}`}></i>
                    </div>
                    <div className="control">
                        <i className="icon-playlist"></i>
                    </div>
                </div>
            }
            <audio ref={audioRef} src={currentSong.url} onError={audioErrorHandle} onCanPlay={canPlayHandle}/>
        </div>
    } else {
        return <></>
    }
}

const mapStateToProps = state => {
    const {playList, currentIndex, sequenceList, fullScreen, playing} = state.playSong;
    return {
        playList,
        currentIndex,
        sequenceList,
        fullScreen,
        playing
    };
};
export default connect(
    mapStateToProps,
    {
        setFullScreen,
        setPlayingState,
        setCurrentIndex
    }
)(Player)

