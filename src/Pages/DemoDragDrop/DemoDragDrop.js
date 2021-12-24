import React from 'react'
import { useRef } from 'react';
import { useState } from 'react'
const defaultValue = [
    { id: 1, taskName: 'task1' },
    { id: 2, taskName: 'task2' },
    { id: 3, taskName: 'task3' },
    { id: 4, taskName: 'task4' },
    { id: 5, taskName: 'task5' },

]

export default function DemoDragDrop(props) {
    const [tastList, setTastList] = useState(defaultValue);
    const tagDrag = useRef({});
    const handleDragStart = (e, index, task) => {
        console.log(e.target);
        console.log(task);
        tagDrag.current = task;
    }
    const handleDragOver = (e) => {

    }
    const handleDragEnd = (e) => {

    }
    const handleDrop = (e) => {

    }
    const handleDragEnter = (e, taskDragEnter, index) => {

        let taskListUpdate = [...tastList];
        let indexDragTag = taskListUpdate.findIndex(task => task.id === tagDrag.current.id);
        let indexDragEnter = taskListUpdate.findIndex(task => task.id === taskDragEnter.id);
        let temp = taskListUpdate[indexDragTag];
        taskListUpdate[indexDragTag] = taskListUpdate[indexDragEnter];
        taskListUpdate[indexDragEnter] = temp;
      
        
        setTastList(taskListUpdate);

    }

    return (
        <div className='container'>
            <div className='text-center display-4' onDragOver={handleDragOver}>Task List</div>
            <div className="row">
                <div className="col-2"></div>

                <div className="bg-dark p-5 col-8">
                    {tastList.map((task, index) => {
                        return <div onDragStart={(e) => { handleDragStart(e, task, index) }}
                        onDragEnter={(e) => { handleDragEnter(e, task, index) }}
                        draggable='true'
                        key={index}
                        className='bg-success text-white m-1 p-3'>
                        {task.taskName}
                           
                        </div>
                    })}




                </div>
                <div className="col-2 bg-primary"  > </div>

            </div>
        </div>
    )
}
