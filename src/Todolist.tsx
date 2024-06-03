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
}

export const TodoList = ({title, tasks, date, removeTask, changeFilter, addTask, changeTaskStatus}: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState("")

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }
    const changeFilterTasksHandler = (filter: FilterValueType) => {
        changeFilter(filter)
    }

    const addTaskHandler = () => {
        if(taskTitle.length<15){
        addTask(taskTitle)
        }
        setTaskTitle("")
    }

    // const users: Array<{
    //     name_2: string
    // }> = [
    //     {
    //         name_2: 'Alex'
    //     }
    // ]

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: TasksType) => {//e: ChangeEvent<HT...
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(task.id, newStatusValue)
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button title="+" onClick={addTaskHandler} disabled={(!Boolean(taskTitle.trim( ))) || taskTitle.length>15 }/>
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

                            <li key={task.id}>
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
                <Button title="All" onClick={() => changeFilterTasksHandler("All")}/>
                <Button title="Active" onClick={() => changeFilterTasksHandler("Active")}/>
                <Button title="Completed" onClick={() => changeFilterTasksHandler("Completed")}/>
            </div>
            <div>{date}</div>
        </div>
    )
}