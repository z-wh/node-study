import React from 'react';
import { connect } from 'react-redux';
import { inputChangeAction, addItemAction, deleteItemAction } from './store/actionCreators';

const TodoList = (props) => {
    let { inputValue, inputChange, addItem, list, deleteItem } = props;
    return (
        <div>
            <div>
                <input value={inputValue} onChange={inputChange} />
                <button onClick={addItem}>提交</button>
            </div>
            <ul>
                {
                    list.map((item, index) => {
                        return (
                            <li key={index} onClick={deleteItem.bind(this, index)}>{item}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const stateToProps = (state) => {
    return {
        inputValue: state.inputValue,
        list: state.list,
    }
}

const dispatchToProps = (dispatch) => {
    return {
        inputChange(e) {
            let action = inputChangeAction(e.target.value);
            dispatch(action);
        },
        addItem() {
            let action = addItemAction();
            dispatch(action);
        },
        deleteItem(index) {
            let action = deleteItemAction(index);
            dispatch(action);
        }
    }
}

export default connect(stateToProps, dispatchToProps)(TodoList);
