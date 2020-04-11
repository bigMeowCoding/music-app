import * as React from "react";
import {useEffect} from "react";
import {addClass} from "../../common/js/dom";
import './slider.scss'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide);

export function Slider(props) {
    const {children, loop} = props;
    const sliderRef = React.createRef(), sliderGroupRef = React.createRef();
    let slider = null;

    function _initSliderWidth() {
        if (sliderRef.current && sliderGroupRef.current) {
            const group = sliderGroupRef.current, slider = sliderRef.current, children = group.children;
            let width = 0, sliderWidth = slider.clientWidth;
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
    }

    useEffect(() => {
        _initSliderWidth();
        console.log(loop)
        setTimeout(() => {
            slider = new BScroll(sliderRef.current, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                slide: {
                    loop,
                    threshold: 100
                },
                snapThreshold: 0.3,
                snapSpeed: 400,
                click:true
            })

            slider.on('scroll', (page) => {
                console.log(page)
            })
            slider.on('beforeScrollStart', () => {
                console.log('scrolling is ready to bootstrap')
            })
        })

    }, []);
    return (
        <div className="slider" ref={sliderRef}>
            <div className="slider-group" ref={sliderGroupRef}>
                {children}
            </div>
            <button onClick={
                ()=> {
                    slider.scrollBy(
                    100)
                }
            }>sdf</button>

            <div className="dots">
                dots
            </div>
        </div>
    )
}
