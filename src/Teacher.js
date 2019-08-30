import React, { Component } from 'react';

class Teacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }

    handleToggle() {
        this.setState({
            isShow: this.state.isShow ? false : true,
        })
    }

    render() {
        return (
            <div>
                <div className={this.state.isShow ? 'show' : 'hide'}>超级名师孙悟空</div>
                <div><button onClick={this.handleToggle.bind(this)}>喊老师出来</button></div>
            </div>
         );
    }
}

export default Teacher;
