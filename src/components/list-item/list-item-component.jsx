import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ListItem(props){
    return (
        <Form className="form-flebox">
            { /* Checkbox */ }
            <Form.Group controlId="formBasicCheckbox" className="checkbox-form">
                <Form.Check type="checkbox" />
            </Form.Group>
            { /* Input type text */ }
            <Form.Group className="input-text-form">    
                <Form.Control type="text" onChange={(e) => props.editTextFn(props.id, e)} value={props.content} disabled={props.disable} />
                <Form.Text className="text-muted">
                    {props.date}
                </Form.Text>
            </Form.Group>
            { /* Buttons */ }
            <Form.Group className="save-btn-form">
                <Button variant="primary">Guardar</Button>               
            </Form.Group>
            <Form.Group className="option-btn-form">
                <Button variant="warning" onClick={() => props.editFn(props.id)}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </Button>
            </Form.Group>
            <Form.Group className="option-btn-form">
                <Button variant="danger">
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Form.Group>            
        </Form>
    )
}