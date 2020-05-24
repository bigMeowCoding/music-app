import React, {useEffect, useRef, useState} from "react";
import './progress-bar.scss';
import {prefixStyle} from "../../common/js/dom";

const transform = prefixStyle('transform');

export function ProgressBar(props) {
    let {percent, progressBarChang} = props;
    const progressBtnWidth = 16
    const progressBarRef = useRef(), progressRef = useRef(), progressBtnRef = useRef();
    const [touch, setTouch] = useState({});
    useEffect(() => {
        if (percent >= 0 && progressBarRef.current && !touch.initiated) {
            const barWidth = progressBarRef.current.clientWidth - progressBtnWidth, offsetWidth = percent * barWidth;
            _offset(offsetWidth);
        }
    }, [percent]);

    function _offset(offsetWidth) {
        if (progressRef.current && progressBtnRef.current) {
            progressRef.current.style.width = offsetWidth + 'px';
            progressBtnRef.current.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
        }
    }

    function touchStartHandle(e) {
        setTouch({
            initiated: true,
            startX: e.touches[0].pageX,
            left: progressRef.current.clientWidth
        })
    }

    function _getPercent() {
        const barWidth = progressBarRef.current.clientWidth - progressBtnWidth
        return progressRef.current.clientWidth / barWidth
    }

    function touchEndHandle() {
        setTouch({
            ...touch,
            initiated: false
        })
        if (typeof progressBarChang === 'function') {
            progressBarChang(_getPercent())
        }
    }

    function touchMoveHandle(e) {
        if (!touch.initiated) {
            return
        }
        const deltaX = e.touches[0].pageX - touch.startX,
            offsetWidth = Math.min(progressBarRef.current.clientWidth - progressBtnWidth, Math.max(0, touch.left + deltaX));
        _offset(offsetWidth);
    }

    return (
        <div className='progress-bar' ref={progressBarRef}>
            <div className="bar-inner">
                <div className="progress" ref={progressRef}></div>
                <div className="progress-btn-wrapper" onTouchStart={touchStartHandle}
                     onTouchMove={touchMoveHandle} onTouchEnd={touchEndHandle}
                >
                    <div className="progress-btn" ref={progressBtnRef}></div>
                </div>
            </div>
        </div>
    )
}
