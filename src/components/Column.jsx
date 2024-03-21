import React from 'react'
import { Droppable } from "react-beautiful-dnd";
import Card from './Card';

const Column = ({title,tasks,id}) => {


  return (
    <div className='container'>
    <div className='title-div'>
        <h3 className='title'>{title}</h3>
        <span>...</span>
    </div>

    <Droppable droppableId={id?.toString() || ""}>
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
        <div className='add-card'>
            <span>+</span>
            <p onClick={()=>console.log(id)}>Add a card</p>
        </div>
    </div>
  )
}

export default Column