import React, {ChangeEvent, useState,KeyboardEvent} from "react";
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
}

export const TodoList = ({title, tasks, date, removeTask, changeFilter, addTask}: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState("")

    const changeTaskTitleHandler=(event:ChangeEvent<HTMLInputElement>)=> {
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskOnKeyUpHandler=(event:KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }
    const changeFilterTasksHandler=(filter:FilterValueType)=>{
        changeFilter(filter)
    }

    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle("")
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyUp={addTaskOnKeyUpHandler}/>
                <Button title="+" onClick={addTaskHandler}/>
            </div>
            {tasks.length === 0 ?
                <p>NO TASKS</p> :
                <ul>
                    {tasks.map(task => {
                        const removeTaskHandler=()=>{
                            removeTask(task.id)
                        }
                        return (


                            <li key={task.id}>
                                <input type="checkbox" defaultChecked={task.isDone}/> <span>{task.title}</span>
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