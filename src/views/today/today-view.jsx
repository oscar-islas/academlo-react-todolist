import React from 'react';
import ListItem from '../../components/list-item/list-item-component';

export default function TodayView(props){
    return(
        <div className="home-page">
            <h2 className="page-title">{props.titulo}</h2>
            {
                props.tareas.filter( task => {
                    //Comparar las fechas sin el tiempo
                    let taskDate = task.date;
                    taskDate.setHours(0,0,0,0);

                    let today = new Date();
                    today.setHours(0,0,0,0);
                    //Comparar las fechas con unix timestamp                    
                    return taskDate.getTime() === today.getTime();
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
                            editFn={props.editFn}
                            editTextFn={props.editTextFn}
                            deleteFn={props.deleteFn}
                            handleEditDate={props.handleEditDate}
                        />
                    )
                })
            }
        </div>
    )
}