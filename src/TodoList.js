import React, { Component } from 'react';
import store from './store/index';
import { inputChangeAction, addItemAction, deleteItemAction, getListAction } from './store/actionCreators';
import TodoListUI from './TodoListUI';
import axios from 'axios';

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = store.getState();
        console.log(this.state);
        this.inputChange = this.inputChange.bind(this);
        this.storeChange = this.storeChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
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

    componentDidMount() {
        axios.post(
            'https://www.easy-mock.com/mock/5d68e07d0c885f74263b5035/react16-demo/upload'
        ).then((resp) => {
            console.log(resp);
            let data = resp.data;
            const action = getListAction(data);
            store.dispatch(action);
        });
    }

    render() {
        return (
            <TodoListUI
                inputValue = {this.state.inputValue}
                list = {this.state.list}
                inputChange = {this.inputChange}
                addItem = {this.addItem}
                deleteItem = {this.deleteItem}
            />
        );
    }
}

export default TodoList;
