import React from "react";
import {MusicList} from "../music-list/music-list";
import {connect} from "react-redux";

function Disc(props) {
    let {disc} = props;
    return <div>
        <MusicList title={disc.dissname} bgImage={disc.imgurl}/>
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
