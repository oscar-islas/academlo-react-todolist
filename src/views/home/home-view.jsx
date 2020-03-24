import React from 'react';
import './home-styles.css';
import ListItem from '../../components/list-item/list-item-component';

export default function Home(props){
    return(
        <div className="home-page">
            <h2>{props.titulo}</h2>
            {
                props.tareas.map( task => {
                    return(
                        <ListItem 
                            id={task.id}
                            content={task.content}
                            date={task.date}
                            disable={task.disabled}
                            editFn={props.editFn}
                            editTextFn={props.editTextFn}
                        />
                    )
                })
            }
        </div>
    )
}