import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType, TasksType} from "./App";
import {Button} from "./Button";
import {v1} from "uuid";
import {useRef} from 'react'


export type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    date?: string
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus:(taskId:string,taskStatus:boolean)=>void
    filter:FilterValueType
}

export const TodoList = ({title, tasks, date, removeTask, changeFilter, addTask, changeTaskStatus, filter}: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError]=useState<string|null>(null)//tut
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addTaskHandler()

        }
    }
    const changeFilterTasksHandler = (filter: FilterValueType) => {
        changeFilter(filter)
    }

    const addTaskHandler = () => {
        if(taskTitle.length<15&&taskTitle.trim()!==""){
        addTask(taskTitle.trim())
        setTaskTitle("")
        }else{
            debugger
            setError("Title is required")
        }
    }


    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: TasksType) => {//e: ChangeEvent<HT...
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(task.id, newStatusValue)
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className={error?"error":""}//tut
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button title="+" onClick={addTaskHandler} disabled={(!Boolean(taskTitle.trim( ))) || taskTitle.length>15 }/>
                {error&&<div className={"error-message"}>{error}</div>}
                {/*tut*/}
                {taskTitle.length>15&&<div>Recomended task title is 15 chartes</div>}
            </div>
            {tasks.length === 0 ?
                <p>NO TASKS</p> :
                <ul>
                    {tasks.map(task => {
                        const removeTaskHandler = () => {
                            removeTask(task.id)//got
                        }

                        return (

                            <li key={task.id} className={task.isDone?"is-done":""}>
                                <input type="checkbox"
                                       defaultChecked={task.isDone}
                                       onChange={(e) => changeTaskStatusHandler(e, task)}//как передать task?
                                />
                                <span>{task.title}</span>
                                {/*<Button title="x"/>*/}
                                <Button title="x" onClick={removeTaskHandler}/>
                            </li>
                        )
                    })}

                </ul>
            }


            <div>
                <Button className={filter==="All"?"active-filter":""} title="All" onClick={() => changeFilterTasksHandler("All")}/>
                <Button className={filter==="Active"?"active-filter":""} title={ "Active"} onClick={() => changeFilterTasksHandler("Active")}/>
                <Button className={filter==="Completed"?"active-filter":""} title={ "Completed"} onClick={() => changeFilterTasksHandler("Completed")}/>
            </div>
            <div>{date}</div>
        </div>
    )
}



// <Button className={filter===""?"active-filter":""} title={ "All"} onClick={() => changeFilterTasksHandler("All")}/>
// <Button className={filter===""?"active-filter":""} title={ "Active"} onClick={() => changeFilterTasksHandler("Active")}/>
// <Button className={filter===""?"active-filter":""} title={ "Completed"} onClick={() => changeFilterTasksHandler("Completed")}/>