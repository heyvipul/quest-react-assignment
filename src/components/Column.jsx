import React, { useState } from 'react'
import { Droppable } from "react-beautiful-dnd";
import Card from './Card';

const Column = ({title,tasks,id,setTasks}) => {

    const [showPopup, setShowPopup] = useState(false);
    const [cardTitle, setCardTitle] = useState('');
    const [cardStatus, setCardStatus] = useState('');

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const addCard = () => {
        const newTask = {
          id: Math.random().toString(36).substr(2, 9),
          title: cardTitle,
          status: cardStatus || undefined,
          completed: false 
        };
        setTasks([...tasks, newTask]);
        setCardTitle('');
        setCardStatus('');
        togglePopup();
      };

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
            <span onClick={togglePopup}>+</span>
            <p onClick={togglePopup}>Add a card</p>
        </div>
        {
            showPopup && (
                <form onSubmit={addCard} className='popop'>
                    <label>Title:</label>
                    <input type="text" 
                    value={cardTitle}
                    onChange={(e)=>setCardTitle(e.target.value)}
                    placeholder='enter title'/><br />
                    <label>Status:</label>
                    <input type="text" 
                    value={cardStatus}
                    onChange={(e)=>setCardStatus(e.target.value)}
                    placeholder='enter status' /><br />
                    <button>submit</button>
                    <span style={{cursor : "pointer",marginTop:"10px"}} onClick={togglePopup}>clear</span>
                </form>
            )
        }
    </div>
  )
}

export default Column