import * as React from "react";
import {useEffect, useState} from "react";
import {getRecommend} from "../../api/recommend";
import {ERR_OK} from "../../api/config";
import {Slider} from "../../base/slider/slider";

export function Recommend() {
    let [recommends, setRecommends] = useState([]);

    function _getRecommend() {
        getRecommend().then((res) => {
            if (res.code === ERR_OK) {
                console.log('rec')
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
        <div>
            {
                recommends.length ?
                    <Slider>
                        {
                            recommends.map((item) => {
                                return (
                                    <div>
                                        <a href={item.linkUrl}>
                                            <img className="needsclick" src={item.picUrl}/>
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </Slider> : null
            }
        </div>
    )
}
