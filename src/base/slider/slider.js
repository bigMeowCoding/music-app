import * as React from "react";
import {useEffect} from "react";
import {addClass} from "../../common/js/dom";
import './slider.scss'
export function Slider(props) {
    const {children, loop} = props;
    const sliderRef = React.createRef(), sliderGroupRef = React.createRef();


    useEffect(() => {
        if (sliderRef.current && sliderGroupRef.current) {
            const group = sliderGroupRef.current, slider = sliderRef.current, children = group.children;
            let width = 0, sliderWidth = slider.clientWidth;
            console.log(sliderWidth)
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                addClass(child, 'slider-item');
                child.style.width = sliderWidth + 'px';
                width += sliderWidth;
            }
            if (loop) {
                width += 2 * sliderWidth;
            }
            group.style.width = width + 'px'
        }
    }, []);
    return (
        <div className="slider" ref={sliderRef}>
            <div className="slider-group" ref={sliderGroupRef}>
                {children}
            </div>
            <div className="dots">
                dots
            </div>
        </div>
    )
}
