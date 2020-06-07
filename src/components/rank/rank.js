import * as React from "react";
import {useEffect, useState} from "react";
import {ERR_OK} from "../../api/config";
import {getTopList} from "../../api/rank";
import {Scroll} from "../../base/scroll/scroll";
import {Loading} from "../../base/loading/loading";
import {useHistory} from "react-router-dom";

import styles from './rank.module.scss'
import {connect} from "react-redux";
import {setTopList} from "../../redux/actions";

function Rank(props) {
    const [topList, setTopList] = useState([]);
    let history = useHistory();
    let setTopListAction = props.setTopList;

    function _getTopList() {
        getTopList().then((res) => {
            if (res.code === ERR_OK) {
                setTopList(res.data.topList);
            }
        })
    }

    useEffect(() => {
        _getTopList()
    }, [])

    function selectItem(item) {
        history.push(`/rank/${item.id}`);
        setTopListAction(item);
    }

    return (
        <div className={styles.rank}>

            <div className={styles.toplist}>
                <Scroll>
                    <ul>

                        {
                            topList.map((item) => {
                                return <li className={styles.item} onClick={() => {
                                    selectItem(item)
                                }
                                }>
                                    <div className={styles.icon}>
                                        <img src={item.picUrl} width="100" height="100"/>
                                    </div>
                                    <ul className={styles.songlist}>
                                        {
                                            item.songList.map((songItem, index) => {
                                                    return <li className={styles.song}>
                                                        <span>{index + 1}</span>
                                                        <span>
                                                            {songItem.songname}-{songItem.singername}
                                                         </span>
                                                    </li>
                                                }
                                            )
                                        }

                                    </ul>
                                </li>
                            })
                        }

                    </ul>
                    {

                        !topList.length ?
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


export default connect(null,
    {
        setTopList
    }
)
(Rank);
