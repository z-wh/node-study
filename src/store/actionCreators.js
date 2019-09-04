import { INPUT_CHANGE, ADD_ITEM, DELETE_ITEM } from "./actionTypes";

export const inputChangeAction = (value) => ({
    type: INPUT_CHANGE,
    inputValue: value,
});

export const addItemAction = () => ({
    type: ADD_ITEM,
});

export const deleteItemAction = (index) => ({
    type: DELETE_ITEM,
    index,
})
