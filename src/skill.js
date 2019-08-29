import React, { Component, Fragment } from 'react';
import './style.css';
import SkillItem from './skillItem';

class Skill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: 'node.js',
            list: ['html', 'css', 'javascript'],
        };
    }

    inputChange(event) {
        this.setState({
            inputValue: event.target.value
        }, () => {
            console.log(this.state.inputValue);
        });
    }

    addList() {
        this.setState({
            list: [...this.state.list, this.state.inputValue],
        });
    }

    deleteItem(index) {
        let list = this.state.list;
        list.splice(index, 1);
        this.setState({
            list: list,
        });
    }

    render() {
        return (
            <Fragment>
                <h1>Study Plan!</h1>
                <input className="input" type="text" value={this.state.inputValue} onChange={this.inputChange.bind(this)} />
                <button type="button" onClick={this.addList.bind(this)}>学习技能</button>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <SkillItem content={item} key={item + index} deleteItem={this.deleteItem.bind(this, index)} index={index} />
                            )
                        })
                    }
                </ul>
            </Fragment>
        );
    }
}

export default Skill;
