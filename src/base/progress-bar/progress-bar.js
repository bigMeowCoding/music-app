import React, {useEffect, useRef} from "react";
import './progress-bar.scss';
import {prefixStyle} from "../../common/js/dom";

const transform = prefixStyle('transform');

export function ProgressBar(props) {
    let {percent} = props;
    const progressBtnWidth = 16
    const progressBarRef = useRef(), progressRef = useRef(), progressBtnRef = useRef();
    useEffect(() => {
        if (percent >= 0 && progressBarRef.current) {
            const barWidth = progressBarRef.current.clientWidth - progressBtnWidth, offsetWidth = percent * barWidth;
            console.log(barWidth)
            _offset(offsetWidth);

        }
    }, [percent]);

    function _offset(offsetWidth) {
        if (progressRef.current && progressBtnRef.current) {
            progressRef.current.style.width = offsetWidth + 'px';
            progressBtnRef.current.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
        }
    }

    return (
        <div className='progress-bar' ref={progressBarRef}>
            <div className="bar-inner">
                <div className="progress" ref={progressRef}></div>
                <div className="progress-btn-wrapper">
                    <div className="progress-btn" ref={progressBtnRef}></div>
                </div>
            </div>
        </div>
    )
}
