import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {v1} from "uuid";
import { useRef } from 'react'


export type TasksType = {
    isDone: boolean;
    title: string;
    id: string
}
export type FilterValueType = "All" | "Active" | "Completed"

function App() {
    console.log("APP")
    let [tasks1, setTasks] = useState<TasksType[]>(
        [
            {id: v1(), title: "HTML\CSS", isDone: true},
            {id: v1(), title: "JAVA", isDone: false},
            {id: v1(), title: "1C", isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: 'React', isDone: true}
        ]) // const task2: Array<TasksType> = []


    const addTask=(title:string)=>{
        const newTask={
            id:v1(),
            title,
            isDone:false
        }
        const newTasks=[newTask,...tasks1]
        setTasks(newTasks)
    }

    let [filter, setFilter] =useState<FilterValueType>("All")
    const removeTask = (taskId: string) => {
        tasks1 = tasks1.filter((task => task.id!== taskId))
        setTasks(tasks1)
    }

   const changeFilter=(filter:FilterValueType)=>{
        setFilter(filter)
   }
    let tasksForTodolist = tasks1
    if(filter==="Active"){
        tasksForTodolist=tasks1.filter((task=>!task.isDone))
    }
    if(filter==="Completed"){
        tasksForTodolist=tasks1.filter((task=>task.isDone))
        // tasksForTodolist=tasks1.filter((task=>task.isDone==true))
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
        const newState = tasks1.map(t => (t.id == taskId ? { ...t, isDone: taskStatus } : t))
        setTasks(newState)
    }


    return (
        <>
            <TodoList
                title="What to lern"
                changeFilter={changeFilter}
                tasks={tasksForTodolist}
                date={"16.05.2024"}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />

        </>
    )
}

export default App;
