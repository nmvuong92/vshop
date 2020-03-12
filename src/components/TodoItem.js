import React, {useContext} from 'react';
import TodoListContext from './../TodoListContext';
export default function TodoItem({id, title, handleShowEditForm}){
    const {TodoListState, TodoListDispatch}= useContext(TodoListContext);
    return (
        <>
            <li>{title} 
                <button type="button" onClick={(e)=>TodoListDispatch({type: 'DELETE', id: id})}>X</button>
                <button type="button" onClick={(e)=>handleShowEditForm(id, title)}>E</button>
            </li>
        </>
    );
}