import React from 'react';
import style from './style.module.css';

export default class Spinner extends React.Component {
    static defaultProps = {
        color: '#8C8C8C',
        size: 'small'
    }

    getSize = () => {
        const { size } = this.props;
        if (size === "large") {
            return {
                width: 36,
                height: 36
            }
        }

        return {
            width: 20,
            height: 20
        }
    }

    render() {
        const { color, center = true } = this.props;
        return (
            <div className={`${style.spinner}${center === true ? " " + style.center : ""}`} style={this.getSize()}>
                <div className={style.spinnerBlade} style={{ backgroundColor: color }}></div>
                <div className={style.spinnerBlade} style={{ backgroundColor: color }}></div>
                <div className={style.spinnerBlade} style={{ backgroundColor: color }}></div>
                <div className={style.spinnerBlade} style={{ backgroundColor: color }}></div>
                <div className={style.spinnerBlade} style={{ backgroundColor: color }}></div>
                <div className={style.spinnerBlade} style={{ backgroundColor: color }}></div>
                <div className={style.spinnerBlade} style={{ backgroundColor: color }}></div>
                <div className={style.spinnerBlade} style={{ backgroundColor: color }}></div>
                <div className={style.spinnerBlade} style={{ backgroundColor: color }}></div>
                <div className={style.spinnerBlade} style={{ backgroundColor: color }}></div>
                <div className={style.spinnerBlade} style={{ backgroundColor: color }}></div>
                <div className={style.spinnerBlade} style={{ backgroundColor: color }}></div>
            </div>
        );
    }
}