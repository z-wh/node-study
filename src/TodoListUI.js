import React from 'react';
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';

const TodoListUI = (props) => {
        return (
            <div style={{ margin: '10px' }}>
                <div>
                    <Input
                        placeholder={props.inputValue}
                        style={{ width: '250px', marginRight: '10px' }}
                        onChange={props.inputChange}
                    />
                    <Button
                        type='primary'
                        onClick={props.addItem}
                    >
                        增加事项
                    </Button>
                </div>
                <div style={{ width: '300px', margin: '10px' }}>
                    <List
                        bordered
                        dataSource={props.list}
                        renderItem={(item, index) => (
                            <List.Item onClick={() => props.deleteItem(index)}>{item}</List.Item>
                        )}
                    ></List>
                </div>
            </div>
        )
}

export default TodoListUI;
