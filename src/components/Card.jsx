import React from 'react'
import { Draggable } from "react-beautiful-dnd";

const Card = ({task, index}) => {

    const getBackgroundColor = (status) => {
        switch (status) {
            case 'not-completed':
                return 'red';
            case 'in-progress':
                return 'yellow';
            case 'in-review':
                return 'rgb(235, 153, 2)';
            case 'done':
                return 'green';
            default:
                return 'black'; // Default background color
        }
    };

  return (
    <Draggable draggableId={task?.id?.toString() || ""} index={index}>
      {(provided, snapshot) => (
        <div className='cards'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {/* Your card content here */}
          <p className='bar' style={{ backgroundColor: getBackgroundColor(task.status === undefined ? (task.completed ? 'not-completed' : 'in-progress') : task.status) }}></p>


          <h3>{task.title}</h3>
          <p>staus: {task.status ? task.status : task.completed ? "not-completed" : "in-progress"}</p>

          <div className='icons'>
            <svg className='bars' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
            </svg>
            <svg className='comment' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
           </svg>
           {"2"}
          </div>

          
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  )
}

export default Card;
