import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {addClass} from "../../common/js/dom";
import './slider.scss'
import BScroll from 'better-scroll'

export function Slider(props) {
    let {children, loop, interval, autoplay} = props;
    const sliderRef = useRef(), sliderGroupRef = useRef();
    let [pageIndex, setPageIndex] = useState(0);
    let [picNumber, setPicNumber] = useState(0);
    let slider = null;
    let autoplayTimer = null;
    let resizeTimer = null
    window.addEventListener('resize', () => {
        if (resizeTimer) {
            clearTimeout(resizeTimer);
        }
        resizeTimer = setTimeout(() => {
            if (sliderRef.current && sliderGroupRef.current && slider) {
                initSliderWidth(true)
                slider.refresh();
            }
        }, 20)
    })


    function initSliderWidth(isResize) {
        if (sliderRef.current && sliderGroupRef.current) {
            const group = sliderGroupRef.current, slider = sliderRef.current, children = group.children;
            if(!isResize) {
                setPicNumber(children.length);
            }
            let width = 0, sliderWidth = slider.clientWidth;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                addClass(child, 'slider-item');
                child.style.width = sliderWidth + 'px';
                width += sliderWidth;
            }
            if (loop && !isResize) {
                width += 2 * sliderWidth;
            }
            group.style.width = width + 'px'
        }
    }

    function initBetterScroll() {
        if (sliderRef.current && sliderGroupRef.current) {
            slider = new BScroll(sliderRef.current, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: {
                    loop,
                    threshold: 100
                },
                snapThreshold: 0.3,
                snapSpeed: 400,
                click: true
            })
            slider.on('scrollEnd', () => {
                let pageIndex = slider.getCurrentPage().pageX;
                setPageIndex(pageIndex);
                if (autoplay) {
                    clearTimeout(autoplayTimer);
                    goToNextPage();
                }
            })
        }
    }

    function goToNextPage() {
        if (!slider) {
            return;
        }
        if (!interval) {
            interval = 3000;
        }
        if (autoplayTimer) {
            clearTimeout(autoplayTimer);
        }
        autoplayTimer = setTimeout(() => {
            slider.next();
        }, interval)
    }

    useEffect(() => {
        initSliderWidth();
        initBetterScroll();
        if (autoplay) {
            goToNextPage();
        }
    }, []);
    return (
        <div className="slider" id='slider' ref={sliderRef}>
            <div className="slider-group" id='slider-group' ref={sliderGroupRef}>
                {children}
            </div>
            <div className="dots">
                {
                    Array.from(new Array(picNumber)).map((item, index) => {
                        return <span key={index} className={`dot${pageIndex === index ? ' active' : ''}`}></span>
                    })

                }

            </div>
        </div>
    )
}
