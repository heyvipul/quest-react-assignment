import React from 'react'
import { Droppable } from "react-beautiful-dnd";
import Card from './Card';

const Column = ({title,tasks,id}) => {



  return (
    <div className='container'>
    <h3 className='title'>{title}</h3>

    <Droppable droppableId={id}>
        {(provided,snapshot) => (
            <div className='taskList' 
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}>

            {tasks?.map((task,index) =>(
                <Card key={index} index={index} task={task}/>
            ))}
                {provided.placeholder}

            </div>
        )}

    </Droppable>
    </div>
  )
}

export default Column