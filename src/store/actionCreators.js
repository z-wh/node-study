import { INPUT_CHANGE, ADD_ITEM, DELETE_ITEM, GET_LIST } from './actionTypes';

export const inputChangeAction = (value) => ({
    type: INPUT_CHANGE,
    value,
});

export const addItemAction = () => ({
    type: ADD_ITEM,
});

export const deleteItemAction = (index) => ({
    type: DELETE_ITEM,
    index,
});

export const getListAction = (data) => ({
    type: GET_LIST,
    data,
})
