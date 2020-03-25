import React from 'react';
import './home-styles.css';
import {Row, Col, Button, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import ListItem from '../../components/list-item/list-item-component';

export default function Home(props){
    return(
        <div className="home-page">
            <h2>{props.titulo}</h2>
            { /* Agregar una nueva tarea */ }

            {
                props.addTaskState ? (
                    <Row className="contenedor-agregar-tarea">
                        { /* Botón regresar al estado original */ }
                        <Col md={1}>
                            <Button onClick={props.editTaskState}>
                                <FontAwesomeIcon icon={faTimes} />                        
                            </Button>                                                   
                        </Col>
                        <Col md={7}>
                            <Form.Control type="text" />                            
                        </Col>
                        <Col md={4}>
                            <Button onClick={() => console.log("Has guardado la tarea")}>
                                Guardar                        
                            </Button>
                        </Col>
                    </Row>
                ) : (
                    <Row className="contenedor-agregar-tarea">
                        { /* Botón para agregar una tarea */ }
                        <Col md={6}>
                            <Button onClick={props.editTaskState}>
                                <FontAwesomeIcon icon={faPlus} />                        
                            </Button>
                            <span className="btn-label">Agregar nueva tarea</span>
                        </Col>
                    </Row>
                )
            }
            
            {
                props.tareas.map( task => {
                    return(
                        <ListItem 
                            key={task.id}
                            id={task.id}
                            content={task.content}
                            date={task.date}
                            disable={task.disabled}
                            editFn={props.editFn}
                            editTextFn={props.editTextFn}
                            deleteFn={props.deleteFn}
                        />
                    )
                })
            }
        </div>
    )
}