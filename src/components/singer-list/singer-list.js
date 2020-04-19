import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {getSingerList} from "../../api/singer";
import {ERR_OK} from "../../api/config";
import Singer from "../../common/js/Singer";
import {ListView} from "../../base/listview/listview";
import './singer-list.scss';
import { useHistory } from "react-router-dom";
import {setSinger} from "../../redux/actions";
import {connect} from "react-redux";

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

 function SingerList(props) {
    let history = useHistory();
    let {setSinger} = props
    let [singers, setSingers] = useState([]);
    function _getSingerList() {
        getSingerList().then((res) => {
            if (res.code === ERR_OK) {
                setSingers(normalizeSingerList(res.data.list));
            }
        })
    }

    function normalizeSingerList(list) {
        let map = {
            hot: {
                title: HOT_NAME,
                items: []
            }
        }
        list.forEach((item, index) => {
            if (index < HOT_SINGER_LEN) {
                map.hot.items.push(new Singer({
                    name: item.Fsinger_name,
                    id: item.Fsinger_mid
                }))
            }
            const key = item.Findex
            if (!map[key]) {
                map[key] = {
                    title: key,
                    items: []
                }
            }
            map[key].items.push(new Singer({
                name: item.Fsinger_name,
                id: item.Fsinger_mid
            }))
        })
        // 为了得到有序列表，我们需要处理 map
        let ret = []
        let hot = []
        for (let key in map) {
            let val = map[key]
            if (val.title.match(/[a-zA-Z]/)) {
                ret.push(val)
            } else if (val.title === HOT_NAME) {
                hot.push(val)
            }
        }
        ret.sort((a, b) => {
            return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
    }
    useEffect(() => {
        _getSingerList();
    }, [])
    function selectItem(singer) {
        setSinger(singer)
        history.push(`/singerList/${singer.id}`)
    }
    return (
        <div className='singer-list'>
            <ListView data={singers} selectItem = {selectItem}/>
        </div>
    )
}


export default connect(
    null,
    { setSinger }
)(SingerList);
