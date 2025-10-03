import React from 'react';
import ReactDOM from 'react-dom';

import style from './style.module.css';

export default class ModalBase extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.el.className = props.className || style.modal;
    }

    componentDidMount() {
        document.body.appendChild(this.el);
    }

    componentWillUnmount() {
        document.body.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}