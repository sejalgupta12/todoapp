import React, {useState, useEffect} from 'react'
import './todo.css'

const List = ({todoList,changeTodoList,action}) => {
  const [checkList,setCheckList] = useState([])
    const [checkCount,setcheckCount] = useState(0);

useEffect(() => {
    setCheckList(todoList)
},[todoList])


  const handleChange = (isChecked,index) => {
    let checkListData = checkList;
    checkListData[index].isChecked = isChecked;
    checkListData[index].isPendingStatus = isChecked ? action == "Pending" ? false : true : !checkListData[index].isPendingStatus;
    setCheckList(checkListData)
    const isCheckCount = isChecked ? checkCount +1 : checkCount - 1;
    setcheckCount(isCheckCount);
  }
  

  const saveData = () => {
      changeTodoList(checkList,action)
      setcheckCount(0)
  }

  return (
    <div className="pendinglist">
      <h2>{action} Task</h2>
      <div className="showItems">
        {checkList.map((list,index) => {
          return (
              <div className="eachItem" key={index}>
                  <div className="left-section">
                    <input
                      type="checkbox"
                      name="item"
                      value={list.isChecked}
                      checked={list.isChecked}
                      onChange={(e) => handleChange(e.target.checked,index)}
                    />
                    <label className='text'>{list.item}</label>
                  </div>
              </div>
          );
        })}
        </div>
        <div className="buttons">
        {checkList.length ?<button className='btn' onClick={saveData}>Mark as {action == "Pending" ? "Completed" : "Pending"} {checkCount ? `(${checkCount})` : null } </button>:null}
        </div>
        </div>
  )
}
export default List