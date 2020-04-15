import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import DatePicker, {registerLocale} from "react-datepicker";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
registerLocale('es', es)

export default function ListItem(props){
    return (
        <Form className={`form-flebox ${props.completed ? 'task-completed' : '' }`}>
            { /* Checkbox */ }
            <Form.Group controlId="formBasicCheckbox" className="checkbox-form">
                <Form.Check type="checkbox" onChange={(event) => props.completeTask(event, props.id)} checked={props.completed} />
            </Form.Group>
            { /* Input type text */ }
            <Form.Group className="input-text-form">    
                <Form.Control type="text" onChange={(e) => props.editTextFn(props.id, e)} value={props.content} disabled={props.disable} />
                <Form.Text className="text-muted">
                    {props.date}
                </Form.Text>
            </Form.Group>
            <Form.Group className="input-datepicker-form">
                <DatePicker
                    selected={props.dateObj}   
                    dateFormat="dd/MM/yyyy"
                    showMonthDropdown
                    showYearDropdown   
                    locale="es"  
                    disabled={props.disable}
                    onChange={(date) => props.handleEditDate(date, props.id)}   
                />                
            </Form.Group>
            { /* Buttons */ }
            <Form.Group className="save-btn-form">
                {
                    //Expresión ternaria
                    props.disable ? <div></div> : <Button variant="primary" onClick={() => props.updateTask(props.id)}>
                        <FontAwesomeIcon icon={faSave} />
                    </Button>                    
                }
            </Form.Group>
            { /* Botón de editar */ }
            <Form.Group className="option-btn-form">
                <Button variant="warning" onClick={() => props.editFn(props.id)}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </Button>
            </Form.Group>
            { /* Botón de borrar */}
            <Form.Group className="option-btn-form" onClick={() => props.deleteFn(props.id)}>
                <Button variant="danger">
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Form.Group>            
        </Form>
    )
}