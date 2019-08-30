import React, { Component, Fragment } from 'react';
import './style.css';
import SkillItem from './SkillItem';
import axios from 'axios';
import Teacher from './Teacher';

class Skill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: 'node.js',
            list: ['html', 'css', 'javascript'],
        };
    }

    componentWillMount() {
        console.log('1-componentWillMount---组件将被加载。。。。');
    }

    componentDidMount() {
        console.log('2-componentDidMount---组件加载完毕。。。。');
        axios.post('https://www.easy-mock.com/mock/5d68e07d0c885f74263b5035/react16-demo/upload')
            .then((resp) => {
                console.log('获取到数据' + JSON.stringify(resp));
                this.setState({
                    list: resp.data.data,
                })
            })
            .catch((err) => console.log(err));
    }

    shouldComponentUpdate() {
        console.log('3-shouldComponentUpdate---组件是否更新。。。。');
        return true;
    }

    componentWillUpdate() {
        console.log('4-componentWillUpdate---组件将被更新。。。。');
    }

    componentDidUpdate() {
        console.log('5-componentDidUpdate---组件更新完成。。。。');
    }

    inputChange() {
        this.setState({
            inputValue: this.input.value
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
        console.log('render---开始渲染。。。。')
        return (
            <Fragment>
                <h1>Study Plan!</h1>
                <input
                    className="input"
                    type="text"
                    value={this.state.inputValue}
                    onChange={this.inputChange.bind(this)}
                    ref={(input) => { this.input = input }}
                />
                <button type="button" onClick={this.addList.bind(this)}>学习技能</button>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <SkillItem
                                    content={item}
                                    key={item + index}
                                    deleteItem={this.deleteItem.bind(this, index)}
                                    index={index}
                                />
                            )
                        })
                    }
                </ul>
                <Teacher/>
            </Fragment>
        );
    }
}

export default Skill;
