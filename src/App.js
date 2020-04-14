import React from 'react';
import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import NavbarComponent from './components/navbar/navbar-component';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './views/404/404-view';
import Home from './views/home/home-view';
import {firestore} from './firebase/firebase-config-utils';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      tasks: [],
      backupTasks: [],
      addTask: false,
      newTask: "",
      today: new Date()
    }
    //Ligar los métodos al contexto actual
    this.editTask = this.editTask.bind(this);
    this.editText = this.editText.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTaskState = this.editTaskState.bind(this);
  }

  componentDidMount(){
    this.obtenerTareas((resultado) => {      
      this.setState({tasks: resultado});
    });
  }

  obtenerTareas(callback){
    firestore.collection("tasks")
      .onSnapshot(function(collection) {          
        let arrayTasks = [];     
        collection.forEach( doc => {
          //Colocar cada uno de los documentos que obtenga de la base de datos                
          arrayTasks.push(doc.data());
        });
        callback(arrayTasks);         
    });   
  }

  editTaskState(){    
    this.setState(state => ({ addTask: !state.addTask}));
  }

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
    this.setState({tasks: taskArray, backupTasks: taskArray});    
  }

  editText(id, event){
    let taskObj = this.state.tasks.find( task => task.id === id);
    let taskIndex = this.state.tasks.findIndex( task => task.id === id);
    taskObj.content = event.target.value;

    let taskArray = this.state.tasks;
    taskArray[taskIndex] = taskObj;

    this.setState({tasks: taskArray, backupTasks: taskArray});
  }

  newTaskText = (evento) => {
    this.setState({newTask: evento.target.value});
  }

  addTask = async () => {    
    if(this.state.newTask.length > 0){
      //Agregar una tarea a la base de datos con el id del documento que se va agregar
      try{
        let refNewTask = await firestore.collection('tasks').doc(); 
        let respuesta = await refNewTask.set({
          id: refNewTask.id,
          content: this.state.newTask,
          date: "23 de Marzo 2020",
          disabled: true
        });
      }catch(error){
        console.log("No se ha podido agregar la tarea: ", error.message);
      }

      this.setState({newTask: ""}, () => {
        this.setState();
      });
      
    }    
  }

  searchTask = (evento) => {
    let taskArray = this.state.backupTasks;
    taskArray = taskArray.filter( task => task.content.includes(evento.target.value));
    this.setState({tasks: taskArray});
  }

  deleteTask(id){
    //Obtener el indice del item que deseamos borrar
    let taskIndex = this.state.tasks.findIndex( task => task.id === id);
    //Crear una copía para poder manipular el arreglo
    let taskArray = this.state.tasks;
    //Borrar el elemento con el método splice
    taskArray.splice(taskIndex, 1);
    //Borrar la tarea en la base de datos
    firestore.collection('tasks').doc(id).delete().then(function() {
      console.log("Se ha borrado la tarea en la base de datos");
    }).catch(function(error) {
      console.error("Hubo un error al borrar la tarea: ", error.message);
    });
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
                    addTaskFn={this.addTask}
                    newTaskTextFn={this.newTaskText}
                    newTaskText={this.state.newTask}
                    editFn={this.editTask}
                    editTextFn={this.editText}
                    searchTaskFn={this.searchTask}
                    deleteFn={this.deleteTask}
                    todayDate={this.state.today}
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
