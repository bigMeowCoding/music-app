import React from "react";
import {Scroll} from "../../base/scroll/scroll";
import {connect} from "react-redux";
import './player.scss';

function Player(props) {
    let {playList, currentIndex, sequenceList} = props;
    const currentSong = sequenceList[currentIndex] || {};
    console.log(currentSong)
    if (playList.length > 0) {
        return <div className="player">
            <div className="normal-player">
                <div className="background">
                    <img width="100%" height="100%" src={currentSong.image} alt=""/>
                </div>
                <div className="top">
                    <div className="back">
                        <i className="icon-back"></i>
                    </div>
                    <h1 className="title"></h1>
                    <h2 className="subtitle"></h2>
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
                                <p
                                    className="text"
                                ></p>
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
            <div className="mini-player">
                <div className="icon">
                    <img width="40" height="40"/>
                </div>
                <div className="text">
                    <h2 className="name"></h2>
                    <p className="desc"></p>
                </div>
                <div className="control">
                    <i className="icon-mini"></i>
                </div>
                <div className="control">
                    <i className="icon-playlist"></i>
                </div>
            </div>
        </div>
    } else {
        return <></>
    }
}

const mapStateToProps = state => {

    const playList = (state.playSong && state.playSong.playList) || [];
    const currentIndex = (state.playSong && state.playSong.currentIndex) || -1;
    const sequenceList = (state.playSong && state.playSong.sequenceList) || [];

    return {
        playList,
        currentIndex,
        sequenceList
    };
};
export default connect(
    mapStateToProps,
    null
)(Player)

