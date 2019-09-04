import { INPUT_CHANGE, ADD_ITEM, DELETE_ITEM } from "./actionTypes";

const defaultState = {
    inputValue: '请输入。。。。',
    list: [
        '9:00 研发部会议',
        '12:00 中午吃饭休息',
        '16:00 游泳健身',
    ],
}

const reducer = (state = defaultState, action) => {
    if (action.type === INPUT_CHANGE) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.inputValue;
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

    return state;
}

export default reducer;
