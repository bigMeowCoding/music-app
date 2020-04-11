import * as React from "react";
import {useEffect, useState} from "react";

import {getRecommend} from "../../api/recommend";
import {ERR_OK} from "../../api/config";
import {Slider} from "../../base/slider/slider";
import './recommend.scss'

export function Recommend() {
    let [recommends, setRecommends] = useState([]);

    function _getRecommend() {
        getRecommend().then((res) => {
            if (res.code === ERR_OK) {
                setRecommends(res.data.slider);
            }
        }, (error) => {
            console.error(error);
        })
    }

    useEffect(() => {
        if (!recommends || !recommends.length) {
            _getRecommend();
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

            </div>
        </div>
    )
}
