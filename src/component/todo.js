import React, {useState,useEffect} from 'react'
import './todo.css'
import List from './list';

const getLocalStorageData = (state) => {
    let listData = JSON.parse(localStorage.getItem(state+'TodoList'));
    listData = listData ? listData : [];
    return listData;
}

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [pendingTodoList, setPendingTodoList] = useState(getLocalStorageData("pending"));
    const [completedTodoList, setCompletedTodoList] = useState(getLocalStorageData("completed"));

    const addItems = () => {
        const itemToAdd= {
            item:inputData.trim(),
            isPendingStatus:true,
            isChecked:false
        }
        setPendingTodoList([...pendingTodoList,itemToAdd]);
        setInputData("");
    }
    

    useEffect(() => {
        localStorage.setItem('pendingTodoList',JSON.stringify(pendingTodoList))
    },[pendingTodoList])

    useEffect(() => {
        localStorage.setItem('completedTodoList',JSON.stringify(completedTodoList))
    },[completedTodoList])


    const changeTodoList = (lists,action)=>{
        let pendingLists = [], completedList = [];
        lists.map(list => {
            list.isChecked = false;
            if(list.isPendingStatus){
                pendingLists.push(list);
            }else{
                completedList.push(list);
            } 
            return list;
        });
        if(action == "Pending"){
            setCompletedTodoList([...completedTodoList,...completedList]);
            setPendingTodoList(pendingLists);
        }else{
            setCompletedTodoList(completedList);
            setPendingTodoList([...pendingTodoList,...pendingLists]);
        }
    }

    return (
        <div className="main">
            <div className="todo">
            <div>
                <input className="addTodo" type="text" placeholder='add item...' value={inputData} onChange = {(e) => setInputData(e.target.value)} />
                <i class="fa fa-solid fa-plus" title="add item" onClick={inputData && addItems}></i>
            </div>
                <List todoList={pendingTodoList} changeTodoList={changeTodoList} action="Pending" />
                <List todoList= {completedTodoList} changeTodoList={changeTodoList} action="Completed" />
            </div>
        </div>
    )
}

export default Todo