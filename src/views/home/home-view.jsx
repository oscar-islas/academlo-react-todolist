import React from 'react';
import './home-styles.css';
import {Row, Col, Button, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import ListItem from '../../components/list-item/list-item-component';
import DatePicker, {registerLocale} from "react-datepicker";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
registerLocale('es', es)


export default function Home(props){
    return(
        <div className="home-page">
            <h2>{props.titulo}</h2>
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
                        {/* Datepicker */}
                        <Col md={2}>
                            <DatePicker
                                selected={props.selectedDate}   
                                dateFormat="dd/MM/yyyy"
                                showMonthDropdown
                                showYearDropdown   
                                locale="es"
                                onChange={props.handleNewDate}                       
                            />
                        </Col>
                        <Col md={2}>
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