import * as React from "react";
import {useEffect, useState} from "react";

import {getDiscList, getRecommend} from "../../api/recommend";
import {ERR_OK} from "../../api/config";
import {Slider} from "../../base/slider/slider";
import './recommend.scss'

export function Recommend() {
    let [recommends, setRecommends] = useState([]);
    let [discList, setDiscList] = useState([]);

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

    useEffect(() => {
        if (!recommends || !recommends.length) {
            _getRecommend();
            _getDiscList();
        }

    }, []);
    return (
        <div className='recommend'>
            <div className="recommend-content">
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
                                                        <img className="needsclick" src={item.picUrl}/>
                                                    </a>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                            : null
                    }
                </div>
                <div className="recommend-list">
                    <h1 className="list-title">
                        热门歌单推荐
                    </h1>
                    <ul>
                        {
                            discList.map((item, index) => {
                                return (
                                    <li key={index} className="item">
                                        <div className="icon">
                                            <img src={item.imgurl} alt=""/>
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
        </div>
    )
}
