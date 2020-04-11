import * as React from "react";

import {Link} from 'react-router-dom';

import './tab.scss';
import {useState} from "react";

export function Tab() {
    let menuConfig = [
        {
            label: '推荐',
            path: '/recommend',
            type: 'recommend'
        },
        {
            label: '歌手',
            path: '/singer',
            type: 'singer'
        },
        {
            label: '排行',
            path: '/rank',
            type: 'rank'
        },
        {
            label: '搜索',
            path: '/search',
            type: 'search'
        }
    ];
    const [selectedMenu, setSelectedMenu] = useState(menuConfig[0])

    function selectMenu(menuItem) {
        setSelectedMenu(menuItem)
    }

    return (
        <div className="tab">
            {
                menuConfig.map((config) => {
                    return <li key={config.type}
                               className={`tab-item${selectedMenu && selectedMenu.type === config.type ? ' selected' : ''}`}
                               onClick={(e) => selectMenu(config)}>
                        <Link to={config.path}>
                            <span className="tab-link">{config.label}</span>
                        </Link>
                    </li>
                })
            }
        </div>
    )
}

