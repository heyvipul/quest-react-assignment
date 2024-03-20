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

    console.log(task.status);
    console.log(task.completed);

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
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  )
}

export default Card;
