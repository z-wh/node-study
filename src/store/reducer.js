import { INPUT_CHANGE, ADD_ITEM, DELETE_ITEM, GET_LIST } from './actionTypes';

const defaultState = {
    inputValue: '请输入。。。事项',
    list: []
};

export default (state = defaultState, action) => {
    if (action.type === INPUT_CHANGE) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }

    if (action.type === ADD_ITEM) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue = '';
        return newState;
    }

    if (action.type === DELETE_ITEM) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.index, 1);
        return newState;
    }

    if (action.type === GET_LIST) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.list = action.data;
        return newState;
    }
    return state;
}
