import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';
import store from './store/index';
import { inputChangeAction, addItemAction, deleteItemAction } from './store/actionCreators';

// const data = [
//     '早8点开晨会，分配今天的开发工作',
//     '早9点和项目经理作开发需求讨论会',
//     '晚5:30对今日代码进行review'
// ]

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = store.getState();
        console.log(this.state);
        this.inputChange = this.inputChange.bind(this);
        this.storeChange = this.storeChange.bind(this);
        this.addItem = this.addItem.bind(this);
        //订阅者，订阅Redux状态（订阅者模式，一旦发布者发布新消息/更新，订阅者自动触发)
        store.subscribe(this.storeChange);
    }

    inputChange(e) {
        const action = inputChangeAction(e.target.value);
        store.dispatch(action);
    }

    addItem() {
        const action = addItemAction();
        store.dispatch(action);
    }

    deleteItem(index) {
        const action = deleteItemAction(index);

        store.dispatch(action);
    }

    // 发布者，
    storeChange() {
        this.setState(store.getState);
    }

    render() {
        return (
            <div style = {{ margin: '10px' }}>
                <div>
                    <Input
                        placeholder = {this.state.inputValue}
                        style = {{ width: '250px', marginRight: '10px' }}
                        onChange = {this.inputChange}
                    />
                    <Button
                        type ='primary'
                        onClick = {this.addItem}
                    >
                        增加事项
                    </Button>
                </div>
                <div style = {{ width: '300px', margin: '10px' }}>
                    <List
                        bordered
                        dataSource = {this.state.list}
                        renderItem = {(item,index) => (
                            <List.Item onClick = {this.deleteItem.bind(this, index)}>{item}</List.Item>
                        )}
                    ></List>
                </div>
            </div>
        );
    }
}

export default TodoList;
