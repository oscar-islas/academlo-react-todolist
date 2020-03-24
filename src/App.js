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
      ]
    }
    //Ligar los métodos al contexto actual
    this.editTask = this.editTask.bind(this);
    this.editText = this.editText.bind(this);
  }

  editTask(id){
    let taskObj = this.state.tasks.find( task => task.id === id);
    let taskIndex = this.state.tasks.findIndex( task => task.id === id);
    taskObj.disabled = !taskObj.disabled;

    let taskArray = this.state.tasks;
    taskArray[taskIndex] = taskObj;

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
                    tareas={this.state.tasks}
                    editFn={this.editTask}
                    editTextFn={this.editText}
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
