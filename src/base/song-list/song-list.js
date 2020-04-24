import React from "react";
import './song-list.scss'

export function SongList(props) {
    let {songs,selectSongItem} = props;

    function getDesc(song) {
        return `${song.singer}·${song.album}`
    }

    return (
        <div className="song-list">
            <ul>
                {
                    songs.map((song, index) => {
                        return <li className="item" onClick={() => {
                            if(typeof selectSongItem === 'function') {
                                selectSongItem(item, index);
                            }
                        }} key={index}>
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
