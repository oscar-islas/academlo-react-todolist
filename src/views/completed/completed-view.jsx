import React from 'react';
import ListItem from '../../components/list-item/list-item-component';

export default function CompletedView(props){
    return(
        <div className="home-page">
            <h2>{props.titulo}</h2>     

            {
                props.tareas.filter( task => {
                    return task.completed === true
                }).map( task => {
                    //Declarar una cadena de texto que representará la fecha de la tarea
                    let dateString = task.date.toDateString();

                    return(
                        <ListItem 
                            key={task.id}
                            id={task.id}
                            content={task.content}
                            date={dateString}
                            dateObj={task.date}
                            disable={task.disabled}
                            completed={task.completed}
                            editFn={props.editFn}
                            editTextFn={props.editTextFn}
                            deleteFn={props.deleteFn}
                            handleEditDate={props.handleEditDate}
                            updateTask={props.updateTask}
                            completeTask={props.completeTask}
                        />
                    )
                })
            }
        </div>
    )
}