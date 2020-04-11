import * as React from "react";
import {Link} from 'react-router-dom';

export function Tab() {
    return (
        <div className="tab">
            <li className="tab-item">
                <Link to='/recommend'>
                    <span className="tab-link">推荐</span>
                </Link>
            </li>
            <li className="tab-item">
                <Link to="/singer">
                    <span className="tab-link">歌手</span>
                </Link>
            </li>
            <li className="tab-item">
                <Link to="/rank">
                    <span className="tab-link">排行</span>
                </Link>
            </li>
            <li className="tab-item">
                <Link to="/search">
                    <span className="tab-link">搜索</span>
                </Link>
            </li>
        </div>
    )
}

