import * as React from "react";
import {Component, createRef} from "react";
import BScroll from 'better-scroll'

import styles from './Scroll.module.scss'

export class Scroll extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = createRef();
        this.children = props.children;
        this.data = props.data;
        this.probeType = props.probeType || 1;
        this.click = props.click || true;
        this.children = props.children;
        this.listenScroll = !!props.listenScroll;
        this.getPos = props.getPos;
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
        if (this.listenScroll && typeof this.getPos === 'function') {
            this.scroll.on('scroll', (pos) => {
                this.getPos(pos);
            })
        }
    }

    scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    }

    scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }

    refresh() {
        if (this.scroll) {
            this.scroll.refresh();
        }
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true
    }

    render() {
        // console.log(this.props.data)
        if (this.props.data !== this.data) {
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
