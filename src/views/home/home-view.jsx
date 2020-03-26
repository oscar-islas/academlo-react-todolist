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
                /* 
                4. Utilizar el método onChange para el input y pasarle 
                el método que le corresponde
                Nota: props.nombreAtributo
                
                5. Utilizar el método onClick para el botón y pasarle 
                el método que le corresponde  
                
                */
            }

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
                            <Form.Control type="text" onChange={props.newTaskTextFn} value={props.newTaskText} />                            
                        </Col>
                        <Col md={4}>
                            <Button onClick={props.addTaskFn}>
                                Guardar                        
                            </Button>
                        </Col>
                    </Row>
                ) : (
                    <Row className="contenedor-agregar-tarea">
                        { /* Botón para agregar una tarea */ }
                        <Col md={8}>
                            <Button onClick={props.editTaskState}>
                                <FontAwesomeIcon icon={faPlus} />                        
                            </Button>
                            <span className="btn-label">Agregar nueva tarea</span>                            
                        </Col>
                        <Col md={4}>
                            <Form.Control type="text" placeholder="Busca tu tarea" onChange={props.searchTaskFn} />                            
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