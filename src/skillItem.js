import React, { Component } from 'react';
import Proptypes from 'prop-types';

class SkillItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps() {
        console.log('child-componentWillReceiveProps---组件接收props');
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.student !== this.props.student) {
            return true;
        } else {
            return false;
        }
    }

    componentWillUnmount() {
        console.log('chilid-组件被删除');
    }

    handleClick() {
        this.props.deleteItem();
    }

    render() {
        console.log('child-render');
        return (
            <li onClick={this.handleClick}>{this.props.student}准备学习{ this.props.content }</li>
        );
    }
}

SkillItem.propTypes = {
    content: Proptypes.string,
    deleteItem: Proptypes.func,
    index: Proptypes.number,
    student: Proptypes.string.isRequired,
}

SkillItem.defaultProps = {
    student: '小明',
}

export default SkillItem;
