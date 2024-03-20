import React from 'react'
import { Draggable } from "react-beautiful-dnd";

const Card = ({task, index}) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {/* Your card content here */}
          {task.title}
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  )
}

export default Card;
