import * as React from "react";

import {Scroll} from "../scroll/scroll";
import './listview.scss'
import LazyLoad from "react-lazy-load";
import {createRef, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {getData} from "../../common/js/dom";
import {Loading} from "../loading/loading";

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30

export function ListView(props) {
    let timer = null;
    const {data} = props, scrollRef = useRef(), fixedTitleRef = useRef();
    let [touch, setTouch] = useState({});
    let [diff, setDiff] = useState(-1);
    let [currentScrollY, setScrollY] = useState(-1);
    let [currentIndex, setCurrentIndex] = useState(-1);
    let [listHeight, setListHeight] = useState([])
    const listGroupRefs = useMemo(() => {
        return data.map(() => {
            return createRef();
        })
    }, [data]);
    const shortcutList = useMemo(() => {
        return data.map((group) => {
            return group.title.substr(0, 1)
        })
    }, [data]);
    useEffect(() => {
        computeListHeight()
    }, [data])
    const fixedTitle = useMemo(() => {
        return data && data[currentIndex] && data[currentIndex].title
    }, [currentIndex]);
    useEffect(() => {
        if (fixedTitleRef.current) {
            let fixedTop = (diff > 0 && diff < TITLE_HEIGHT) ? diff - TITLE_HEIGHT : 0
            fixedTitleRef.current.style.transform = `translate3d(0,${fixedTop}px,0)`
        }
    }, [diff]);

    function computeCurrentIndex() {
        // 当滚动到顶部，newY>0
        if (currentScrollY > 0) {
            setCurrentIndex(0)
            return
        }
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
            let height1 = listHeight[i]
            let height2 = listHeight[i + 1]
            if (-currentScrollY >= height1 && -currentScrollY < height2) {
                setCurrentIndex(i);
                setDiff(height2 + currentScrollY)
                return
            }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        setCurrentIndex(listHeight.length - 2)
    }

    useEffect(() => {
        computeCurrentIndex();
    }, [currentScrollY])

    function computeListHeight() {
        const arr = []
        let height = 0
        arr.push(height)
        for (let i = 0; i < listGroupRefs.length; i++) {
            let item = listGroupRefs[i].current
            if (!item) {
                break;
            }
            height += item.clientHeight
            arr.push(height)
        }
        setListHeight(arr)
    }


    function onShortcutTouchStart(e) {
        e.stopPropagation();
        e.preventDefault()
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        setTouch({
            y1: firstTouch.pageY,
            anchorIndex
        })
        _scrollTo(anchorIndex);

    }

    function onShortcutTouchMove(e) {
        e.stopPropagation();
        e.preventDefault()
        let firstTouch = e.touches[0]
        touch.y2 = firstTouch.pageY
        let delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(touch.anchorIndex) + delta
        _scrollTo(anchorIndex);
    }

    function _scrollTo(index) {
        if (!index && index !== 0) {
            return
        }
        // if (index < 0) {
        //     index = 0
        // } else if (index > this.listHeight.length - 2) {
        //     index = this.listHeight.length - 2
        // }
        // this.scrollY = -this.listHeight[index]
        scrollRef.current.scrollToElement(listGroupRefs[index].current, 0)
    }


    const getPos = (pos) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            setScrollY(pos.y)

        }, 20);
    }


    return (
        <Scroll data={data} ref={scrollRef} probeType={3}
                getPos={getPos}
                listenScroll={true}>
            <article className='list-view'>
                {
                    data.map((group, index) => {
                        return (
                            <section className="list-group" key={index} ref={listGroupRefs[index]}>
                                <h2 className="list-group-title">{group.title}</h2>
                                <ul>
                                    {group.items.map((item) => {
                                        return (
                                            <li className="list-group-item"
                                                key={item.id}>
                                                {/*<LazyLoad>*/}
                                                <img className="avatar" src={item.avatar}/>
                                                {/*</LazyLoad>*/}
                                                <span className="name">{item.name}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </section>
                        )
                    })
                }
            </article>

            <div className="list-shortcut" onTouchStart={onShortcutTouchStart}
                 onTouchMove={onShortcutTouchMove}>
                <ul>
                    {
                        shortcutList.map((item, index) => {
                            return <li
                                key={index}
                                data-index={index} className={`item${index === currentIndex ? ' current' : ''}`}>
                                {item}
                            </li>
                        })
                    }
                </ul>
            </div>
            {
                fixedTitle ? <div className="list-fixed" ref={fixedTitleRef}>
                    <div className="fixed-title">{fixedTitle} </div>
                </div> : null
            }
            {
                !data.length ? <div className="loading-container">
                    <Loading/>
                </div> : null
            }

        </Scroll>
    )
}
