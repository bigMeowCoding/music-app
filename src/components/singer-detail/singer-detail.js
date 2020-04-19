import React from "react";
import {connect} from "react-redux";

function SingerDetail() {
    return <div>
        detail
    </div>
}

const mapStateToProps = state => {
    console.log(state)
    return {state};
};
export default connect(mapStateToProps)(SingerDetail);
