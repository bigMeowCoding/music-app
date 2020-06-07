import React from "react";
import './song-list.scss'

export function SongList(props) {
    let {songs, rank, selectSongItem} = props;

    function getDesc(song) {
        return `${song.singer}·${song.album}`
    }

    function getRankCls(index) {
        if (index <= 2) {
            return `icon icon${index}`
        } else {
            return 'text'
        }
    }

    function getRankText(index) {
        if (index > 2) {
            return index + 1
        }
    }

    console.log(rank)
    return (
        <div className="song-list">
            <ul>
                {
                    songs.map((song, index) => {
                        return <li className="item" onClick={() => {
                            if (typeof selectSongItem === 'function') {
                                selectSongItem(song, index);
                            }
                        }} key={index}>
                            {rank}
                            {
                                rank ? <div className="rank">
                            <span className={getRankCls(index)}>
                                {getRankText(index)}
                            </span>
                                </div> : null
                            }
                            <div className="content">
                                <h2 className="name">{song.name}</h2>
                                <p className="desc">{getDesc(song)}</p>
                            </div>
                        </li>
                    })
                }

            </ul>
        </div>
    )
}


