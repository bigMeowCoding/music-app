import * as React from "react";

import {Scroll} from "../scroll/scroll";
import './listview.scss'
import LazyLoad from "react-lazy-load";

export function ListView(props) {
    const {data} = props;
    console.log(data)
    return (
        <Scroll data={data} >
            <article className='list-view'>
                {
                    data.map((group, index) => {
                        return (
                            <section className="list-group" key={index}>
                                <h2 className="list-group-title">{group.title}</h2>
                                <ul>
                                    {group.items.map((item) => {

                                        return (
                                            <li className="list-group-item" key={item.id}>
                                                <LazyLoad>
                                                    <img className="avatar" src={item.avatar}/>
                                                </LazyLoad>
                                                <span className="name">{item.name}</span>
                                            </li>)
                                    })}
                                </ul>
                            </section>
                        )
                    })
                }
            </article>


        </Scroll>
    )
};
