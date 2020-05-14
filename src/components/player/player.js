import React from "react";
import {Scroll} from "../../base/scroll/scroll";
import {connect} from "react-redux";
import './player.scss';
import {setFullScreen} from "../../redux/actions";

function Player(props) {
    let {playList, fullScreen, currentIndex, sequenceList, setFullScreen} = props;
    const currentSong = (sequenceList && sequenceList[currentIndex]) || {};
    function back() {
        setFullScreen(false);
    }

    function open() {
        setFullScreen(true);
    }

    if (playList && playList.length > 0) {
        return <div className="player">
            {fullScreen ? <div className="normal-player">
                    <div className="background">
                        <img width="100%" height="100%" src={currentSong.image} alt=""/>
                    </div>
                    <div className="top">
                        <div className="back">
                            <i className="icon-back" onClick={back}></i>
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
                                <div className="cd">
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
                            <div className="icon i-left">
                                <i className="icon-prev"></i>
                            </div>
                            <div className="icon i-center">
                                <i></i>
                            </div>
                            <div className="icon i-right">
                                <i></i>
                            </div>
                            <div className="icon i-right">
                                <i className="icon icon-not-favorite"></i>
                            </div>
                        </div>
                    </div>
                </div>
                : <div className="mini-player" onClick={open}>
                    <div className="icon">
                        <img src={currentSong.image} width="40" height="40"/>
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
                        <i className="icon-mini"></i>
                    </div>
                    <div className="control">
                        <i className="icon-playlist"></i>
                    </div>
                </div>
            }
        </div>
    } else {
        return <></>
    }
}

const mapStateToProps = state => {
    const {playList, currentIndex, sequenceList, fullScreen} = state.playSong;
    return {
        playList,
        currentIndex,
        sequenceList,
        fullScreen
    };
};
export default connect(
    mapStateToProps,
    {
        setFullScreen
    }
)(Player)

