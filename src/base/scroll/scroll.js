import * as React from "react";
import {Component, createRef} from "react";
import BScroll from 'better-scroll'

import styles from './Scroll.module.scss'

export class Scroll extends Component {
    constructor(props) {
        super(props);
        this.children = props.children;
        this.data= props.data;
        this.wrapperRef = createRef();
        this.probeType = props.probeType || 1;
        this.click = props.click || true;
        this.children = props.children;
    }

    componentDidMount() {
        this.initScroll();
    }

    initScroll() {
        if (!this.wrapperRef.current) {
            return
        }
        this.scroll = new BScroll(this.wrapperRef.current, {
            probeType: this.probeType,
            click: this.click
        })
    }

    refresh() {
        console.log('refresh')
        if (this.scroll) {
            this.scroll.refresh();
        }
    }

    render() {
        if(this.props.data !== this.data) {
            this.initScroll();
            this.data = this.props.data
        }
        return (
            <div className={styles.scrollWrapper} ref={this.wrapperRef}>
                {this.props.children}
            </div>
        )
    }


}
