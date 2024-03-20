import React from 'react'
import { Draggable } from "react-beautiful-dnd";

const Card = ({task, index}) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div className='cards'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {/* Your card content here */}
          <p className='bar'></p>
          <h3>{task.title}</h3>
          <p>staus: {task.completed ? "not-completed" : "in-progress"}</p>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  )
}

export default Card;
