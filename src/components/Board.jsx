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
    console.log(done);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
    
        if (!destination || source.droppableId === destination.droppableId) return;
    
        const task = findItemById(draggableId, [...todo, ...progress, ...review, ...done]);
        setNewState(destination.droppableId, task);
        deletePreviousState(source.droppableId, draggableId);
    }
    
    function deletePreviousState(sourceDroppableId, taskId) {
        switch (sourceDroppableId) {
            case "1":
                setTodo(removeItemById(taskId, todo));
                break;
            case "2":
                setProgress(removeItemById(taskId, progress));
                break;
            case "3":
                setReview(removeItemById(taskId, review));
                break;
            case "4":
                setDone(removeItemById(taskId, done));
                break;
            default:
                break;
        }
    }
    

    function setNewState(destinationDroppableId,task){
        let updatedTask;
        switch (destinationDroppableId){
            case "1" : //TODO
                updatedTask = { ...task, completed: false, status: "not-completed"};
                setTodo([updatedTask,...todo]);
                break;
            case "2" : // PROGRESS
                updatedTask = { ...task, completed: false, status: "in-progress" };
                setProgress([updatedTask,...progress]);
                break;
            case "3" : //REVIEW
                updatedTask = { ...task, completed: false, status: "in-review" };
                setReview([updatedTask,...review]);
                break;
            case "4" : //DONE
                updatedTask = { ...task, completed: false, status: "done"};
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
    {/* <h2 style={{ textAlign: "center" }}>KANBAN BOARD</h2> */}
        <div style={{
            display : "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "1300px",
            margin: "0 auto",
            padding : "10px",
            gap : "10px",
            backgroundColor : "rgb(48,120,186)",
            marginTop : "20px"
        }}>
            <Column title={"TO DO"} setTasks={setTodo} tasks={todo} id={"1"} />
            <Column title={"IN PROGRESS"} setTask={setProgress} tasks={progress} id={"2"}/>
            <Column title={"REVIEW"} setTasks={setReview} tasks={review} id={"3"} />
            <Column title={"DONE"} setTasks={setDone} tasks={done} id={"4"}/>
        </div>
    </DragDropContext>
  )
}

export default Board