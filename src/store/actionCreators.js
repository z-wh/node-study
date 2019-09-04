import { INPUT_CHANGE, ADD_ITEM, DELETE_ITEM, GET_LIST } from './actionTypes';
import axios from 'axios';

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

export const getTodoList = () => {
    return (dispatch) => {
        axios.post(
            'https://www.easy-mock.com/mock/5d68e07d0c885f74263b5035/react16-demo/upload'
        ).then((resp) => {
            let data = resp.data.data.list;
            console.log(data);
            let action = getListAction(data);
            dispatch(action);
        })
    }
}
