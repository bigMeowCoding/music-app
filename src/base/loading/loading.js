import React from "react";
import styles from './loading.module.scss'

export function Loading(props) {
    let {title = '正在载入...'} = props;
    return (
        <div className={styles.loading}>
            <img width="24" height="24" src="/images/loading.gif" alt=""/>
            <p className={styles.desc}>{title}</p>
        </div>
    )
}
