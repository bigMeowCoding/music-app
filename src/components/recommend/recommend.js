import * as React from "react";
import {useEffect, useRef, useState} from "react";

import LazyLoad from 'react-lazy-load';

import {getDiscList, getRecommend} from "../../api/recommend";
import {ERR_OK} from "../../api/config";
import {Slider} from "../../base/slider/slider";
import './recommend.scss'
import {Scroll} from "../../base/scroll/scroll";
import {Loading} from "../../base/loading/loading";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {setDisc} from "../../redux/actions";

function Recommend(props) {
    let {setDisc} = props;
    let [recommends, setRecommends] = useState([]);
    let [discList, setDiscList] = useState([]);
    const scrollRef = useRef();
    let history = useHistory()
    useEffect(() => {
        _getRecommend();
        _getDiscList();
    }, []);
    let carouselIsNotLoaded = true;

    function _getRecommend() {
        getRecommend().then((res) => {
            if (res.code === ERR_OK) {
                setRecommends(res.data.slider);
            }
        }, (error) => {
            console.error(error);
        })
    }

    function _getDiscList() {
        getDiscList().then((res) => {
            if (res.code === ERR_OK) {
                setDiscList(res.data.list);
            }
        })
    }


    function carouselLoaded() {
        const scroll = scrollRef.current;
        if (scroll && carouselIsNotLoaded) {
            scroll.refresh();
            carouselIsNotLoaded = false;
        }
    }

    function selectItem(discItem) {
        history.push(`/recommend/${discItem.dissid}`);
        setDisc(discItem);
    }

    return (
        <div className='recommend'>
            <div className="recommend-content">

                <Scroll data={discList} ref={scrollRef}>

                    <div>
                        {
                            recommends.length ?
                                <div className='slider-wrapper'>
                                    <Slider loop={true} autoplay={true}>
                                        {
                                            recommends.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <a href={item.linkUrl}>
                                                            <img onLoad={carouselLoaded} className="needsclick"
                                                                 src={item.picUrl}/>
                                                        </a>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Slider>
                                </div>
                                : null
                        }
                        <div className="recommend-list">
                            <h1 className="list-title">
                                热门歌单推荐
                            </h1>
                            <ul>

                                {
                                    discList.map((item, index) => {
                                        return (
                                            <li key={index} className="item" onClick={() => {
                                                selectItem(item)
                                            }}>
                                                <div className="icon">
                                                    <LazyLoad>
                                                        <img src={item.imgurl} alt=""/>
                                                    </LazyLoad>
                                                </div>
                                                <div className="text">
                                                    <h2 className="name">
                                                        {item.creator.name}
                                                    </h2>
                                                    <p className="desc">
                                                        {item.dissname}
                                                    </p>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    {

                        !discList.length ?
                            <div className="loading-container">
                                <Loading></Loading>
                            </div>
                            : null

                    }


                </Scroll>

            </div>

        </div>
    )
}


export default connect(
    null,
    {setDisc}
)(Recommend);
