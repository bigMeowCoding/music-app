import * as React from "react";

import {Scroll} from "../scroll/scroll";
import './listview.scss'

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
                                                <img className="avatar" src={item.avatar}/>
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
