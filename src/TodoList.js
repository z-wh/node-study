import React, { Component } from 'react';
import store from './store/index';
import { inputChangeAction, addItemAction, deleteItemAction, getTodoList } from './store/actionCreators';
import TodoListUI from './TodoListUI';

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
        const action = getTodoList();
        store.dispatch(action);
    }

    render() {
        return (
            <TodoListUI
                inputValue={this.state.inputValue}
                list={this.state.list}
                inputChange={this.inputChange}
                addItem={this.addItem}
                deleteItem={this.deleteItem}
            />
        );
    }
}

export default TodoList;
