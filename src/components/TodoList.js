import React, {useReducer, useContext, useState} from 'react';
import TodoItem from './TodoItem';
import TodoListContext from './../TodoListContext';
import {Modal, Button, InputGroup, input, Form, Col} from 'react-bootstrap';

const TodoListReducer = (state, action) => {
    switch(action.type){
        case 'ADD':
            state.TodoList.push(action.TodoItem);
            return state;
        case 'EDIT':
            const indexUpdate = state.TodoList.findIndex(x=>x.id === action.TodoItem.id);
            state.TodoList[indexUpdate].title = action.TodoItem.title; //update data
            return state;     
        case 'DELETE':
            console.log('DELETE', action.id);
            return {...state, TodoList: state.TodoList.filter((item)=>{
                return item.id !== action.id;
            })}
        default:
            console.log('DEFAULT');
            return {...state};
    }
}

const makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
export default function TodoList(){
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [mode, setMode] = useState({mode:""});

    const initialState = {
        TodoList: [
           { id: makeid(10), title: "todo 1"},
           { id: makeid(10), title: "todo 2"},
           { id: makeid(10), title: "todo 3"},
        ]
    };
    const [TodoListState, TodoListDispatch] = useReducer(TodoListReducer, initialState);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSaveChanges = () => {
        if('ADD' === mode.mode){
            TodoListDispatch({type: 'ADD', TodoItem: {id: makeid(10), title}});
        }else if('EDIT' === mode.mode){
            TodoListDispatch({type: 'EDIT', TodoItem: {id: mode.id, title}});
        }
        setShow(false);
    }
    const handleShowAddForm = (id) => {
        console.log('show Add man!', id);
        setMode({mode: 'ADD'});
        handleShow();
        setTitle('');
    }
    const handleShowEditForm = (id, title) => {
        console.log('show Edit man!', id);
        setMode({mode: 'EDIT',  id, title});
        setTitle(title);
        handleShow();
    }
    return (
        <TodoListContext.Provider value={{TodoListState, TodoListDispatch}}>
            <>
                <h2>TodoList</h2>
                <Button variant="primary" onClick={handleShowAddForm}>
                    ADD NEW
                </Button>
                <ul>
                    {TodoListState.TodoList.map((item)=>(
                        <TodoItem key={item.id} {...item} handleShowEditForm = {handleShowEditForm}/>
                    ))}
                </ul>             
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{mode.mode}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Row>
                                <Form.Label column="lg" lg={3}>Input title:</Form.Label>
                                <Col>
                                    <Form.Control size="lg" 
                                    type="text" 
                                    placeholder="Input Title" 
                                    value={title}
                                    onChange={(e)=>setTitle(e.target.value)}/>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </TodoListContext.Provider>
    );
}