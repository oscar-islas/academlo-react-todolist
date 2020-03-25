import React from 'react';
import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import NavbarComponent from './components/navbar/navbar-component';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './views/404/404-view';
import Home from './views/home/home-view';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      tasks: [
        {
          id: 1,
          content: "Realizar la planeación para la clase",
          date: "23 de Marzo 2020",
          disabled: true        
        },
        {
          id: 2,
          content: "Lavar mi ropa",
          date: "23 de Marzo 2020",
          disabled: true
        },
        {
          id: 3,
          content: "Ordenar mi cuarto",
          date: "23 de Marzo 2020",
          disabled: true
        },
        {
          id: 4,
          content: "Pintar mi cuarto",
          date: "23 de Marzo 2020",
          disabled: true
        }
      ],
      addTask: false,
    }
    //Ligar los métodos al contexto actual
    this.editTask = this.editTask.bind(this);
    this.editText = this.editText.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTaskState = this.editTaskState.bind(this);
  }

  editTaskState(){    
    this.setState(state => ({ addTask: !state.addTask}));
  }

  //addTask = false
  //this.setState({addTask: !this.state.addTask}) => tomaría 200 ms en actualizar el estado
  //100ms 
  //addTask = false
  //150ms presionamos nuevamente el botón
  //this.setState({addTask: this.state.addTask}) => tomaría ms en actualizar el estado
  //200ms
  //addTask = true 
  //El resultado esperado de acuerdo a la interacción sería addTask = false

  editTask(id){
    //Obtener el objeto que coincida con el id de la tarea que deseamos modificar
    let taskObj = this.state.tasks.find( task => task.id === id);
    let taskIndex = this.state.tasks.findIndex( task => task.id === id);
    //Cambiar el estado de ese item
    taskObj.disabled = !taskObj.disabled;
    //Crear una copia del arreglo
    let taskArray = this.state.tasks;
    taskArray[taskIndex] = taskObj;
    //Guardar el nuevo estado
    this.setState({tasks: taskArray});    
  }

  editText(id, event){
    let taskObj = this.state.tasks.find( task => task.id === id);
    let taskIndex = this.state.tasks.findIndex( task => task.id === id);
    taskObj.content = event.target.value;

    let taskArray = this.state.tasks;
    taskArray[taskIndex] = taskObj;

    this.setState({tasks: taskArray});
  }

  deleteTask(id){
    //Obtener el indice del item que deseamos borrar
    let taskIndex = this.state.tasks.findIndex( task => task.id === id);
    //Crear una copía para poder manipular el arreglo
    let taskArray = this.state.tasks;
    //Borrar el elemento con el método splice
    taskArray.splice(taskIndex, 1);
    //Agregar el nuevo valor para el estado tasks
    this.setState({tasks: taskArray});
  }

  render(){
    return(
      <BrowserRouter>
        <Container>
          <Row>
            <Col md={3}>
              <NavbarComponent />
            </Col>
            <Col md={9} className="view-container">
              <Switch>
                <Route exact path='/'>            
                  <Home 
                    titulo="Todas"
                    addTaskState={this.state.addTask}
                    editTaskState={this.editTaskState}
                    tareas={this.state.tasks}
                    editFn={this.editTask}
                    editTextFn={this.editText}
                    deleteFn={this.deleteTask}
                  />
                </Route>
                <Route >
                  <NotFound />
                </Route>
              </Switch>         
            </Col>
          </Row>
        </Container>   
      </BrowserRouter>
    )
  }
}

export default App;
