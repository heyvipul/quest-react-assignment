import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { tasks } from "../api/mockdata";


const Board = () => {
    // console.log(tasks);
    const [todo, setTodo] = useState([]);
    const [progress, setProgress] = useState([]);
    const [review, setReview] = useState([]);
    const [done, setDone] = useState([]);

    useEffect(()=>{
      setTodo(tasks.filter((task)=> task.completed))
      setProgress(tasks.filter((task)=>!task.completed))
    },[])

    console.log(todo);
    console.log(progress);

    const handleDragEnd = (result) =>{
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

        deletePreviousState(source.droppableId);

        const task = findItemById(draggableId,[...todo,...progress,...review,...done])
        setNewState(destination.droppableId,task)
    }

    function deletePreviousState(sourceDroppableId, taskId) {
        switch(sourceDroppableId){
            case "1" :
                setTodo(removeItemById(taskId,todo));
                break;
            case "2" :
                setProgress(removeItemById(taskId,progress));
                break;
            case "3" : 
                setReview(removeItemById(taskId,review));
                break;
            case "4" : 
                setDone(removeItemById(taskId,done))    
        }

    }

    function setNewState(destinationDroppableId,task){
        let updatedTask;
        switch (destinationDroppableId){
            case "1" : //TODO
                updatedTask = {...task,completed:false};
                setTodo([updatedTask,...todo]);
                break;
            case "2" : // PROGRESS
                updatedTask = {...task,completed:false};
                setProgress([updatedTask,...progress]);
                break;
            case "3" : //REVIEW
                updatedTask = {...task,completed:true};
                setReview([updatedTask,...review]);
                break;
            case "4" : //DONE
                updatedTask = {...task,completed:true};
                setDone([updatedTask,...done]);
                break;
        }
    }

    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

  return (
    <DragDropContext onDragEnd={handleDragEnd} >
    <h2 style={{ textAlign: "center" }}>KANBAN BOARD</h2>
        <div style={{
            display : "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "1100px",
            margin: "0 auto",
            border : "1px solid red",
            gap : "10px",
        }}>
            <Column title={"TO DO"} tasks={todo} id={"1"} />
            <Column title={"IN PROGRESS"} tasks={progress} id={"2"}/>
            <Column title={"REVIEW"} tasks={review} id={"3"} />
            <Column title={"DONE"} tasks={done} id={"4"}/>
        </div>
    </DragDropContext>
  )
}

export default Board