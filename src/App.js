import React from 'react';
import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import NavbarComponent from './components/navbar/navbar-component';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './views/404/404-view';
import Home from './views/home/home-view';
import CompletedView from './views/completed/completed-view';
import NextWeekView from './views/nextweek/nextweek-view';
import TodayView from './views/today/today-view';
import {firestore} from './firebase/firebase-config-utils';

class App extends React.Component{
  constructor(){
    super();

    this.state = {
      tasks: [],
      backupTasks: [],
      addTask: false,
      newTask: "",
      selectedDate: new Date()
    }
  }

  componentDidMount(){
    //Este método se va a ejecutar cuando se haya montado el componente (App)
    this.obtenerTareas(resultado => {             
      let taskArrayDate = resultado.map( tarea => {
        //Convertir la fecha (timestamp unix) a GMT
        tarea.date = new Date(tarea.date.seconds * 1000);
        return tarea;
      });
      this.setState({tasks: taskArrayDate});
    });
  }

  obtenerTareas(callback){
    firestore.collection("tasks")
      .onSnapshot(function(collection) {   
        //El método onSnapshot se ejecutará cada vez que haya un cambio en la coleccion tasks de firestore
        let arrayTasks = []; //Aquí guardaremos los documentos 
        collection.forEach( doc => {
          //Colocar cada uno de los documentos que obtenga de la base de datos                
          arrayTasks.push(doc.data());
        });
        //Llamaremos a una función de tipo callback después de la respuesta de la base de datos
        callback(arrayTasks);         
    });   
  }

  //Método para actualizar el estado para agregar un item(tarea)
  editTaskState = () => {    
    this.setState(state => ({ addTask: !state.addTask}));
  }

  //Método para habilitar o deshabilitar la edición de un item(tarea)
  editTask = id => {
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

  //Método para editar el contenido del item(tarea)
  editText = (id, event) => {
    //Buscar el objeto respecto al id que obtenemos en el método
    let taskObj = this.state.tasks.find( task => task.id === id);
    //Buscar el indice donde se encuentra el elemento que queremos modificar
    let taskIndex = this.state.tasks.findIndex( task => task.id === id);
    //Modificar el contenido de la tarea
    taskObj.content = event.target.value;
    let taskArray = this.state.tasks;
    taskArray[taskIndex] = taskObj;
    //Actualizar el estado con el arreglo que fue modificado
    this.setState({tasks: taskArray, backupTasks: taskArray});
  }

  //Método para poder modificar el valor del input para agregar una tarea
  newTaskText = (evento) => {
    this.setState({newTask: evento.target.value});
  }

  //Método para agregar una tarea a firebase
  addTask = async () => {    
    if(this.state.newTask.length > 0){
      //Agregar una tarea a la base de datos con el id del documento que se va agregar
      try{
        let refNewTask = await firestore.collection('tasks').doc(); 
        let respuesta = await refNewTask.set({
          id: refNewTask.id,
          content: this.state.newTask,
          date: this.state.selectedDate,
          disabled: true,
          completed: false
        });
        console.log(respuesta);
      }catch(error){
        console.log("No se ha podido agregar la tarea: ", error.message);
      }
      this.setState({newTask: ""});      
    }    
  }

  //Método para buscar y filtrar las tareas
  searchTask = (evento) => {
    let taskArray = this.state.backupTasks;
    taskArray = taskArray.filter( task => task.content.includes(evento.target.value));
    this.setState({tasks: taskArray});
  }

  //Método para borrar la tarea de la base de datos firestore
  deleteTask = id => {
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

  handleNewDate = (date) => {
    //Actualizaré la fecha del estado conforme la fecha seleccionada en el componente datepicker
    this.setState({selectedDate: date});
  }

  handleEditDate = (date, id) => {    
    console.log(id);
    //Buscar el id dentro del arreglo tareas para poder modificar la fecha
    let taskObj = this.state.tasks.find( task => task.id === id);
    //Buscar el indice donde se encuentra el elemento que coincida con el id
    let taskIndex = this.state.tasks.findIndex( task => task.id === id);
    //Modificar la fecha con la fecha que recibimos
    taskObj.date = date;
    //Usamos un arreglo temporal para poder modificar el objeto en el indice que obtuvimos previamente
    let taskArray = this.state.tasks;
    taskArray[taskIndex] = taskObj;

    this.setState({tasks: taskArray, backupTasks: taskArray});
  }

  updateTask = id => {
    //Creamos la referencia hacía la base de datos
    let taskRef = firestore.collection('tasks').doc(id);
    //Obtener el objeto que coincida con el id que recibimos 
    let taskObj = this.state.tasks.find( task => task.id === id);
    //Actualizar el estado para volver a deshabilitar el input
    taskObj.disabled = true;
    //Usar una transacción para comprobar que el documento exista
    //Si existe el documento entonces lo actualizaremos en la base de datos
    firestore.runTransaction(function(transaction) {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(taskRef).then(function(sfDoc) {
          if (!sfDoc.exists) {
            throw new Error("Document does not exist!");
          }                  
          transaction.update(taskRef, taskObj);
      });
    }).then(function() {
        console.log("Transaction successfully committed!");
    }).catch(function(error) {
        console.log("Transaction failed: ", error);
    });
  }

  completeTask = (event, id) => {
    //Obtener el objeto que coincida con el id que recibimos como parametro
    let taskObj = this.state.tasks.find( task => task.id === id);
    taskObj.completed = event.target.checked;

    //Crear la referencia hacía el documento que queremos actualizar
    let taskRef = firestore.collection('tasks').doc(id);
    //Usar una transacción para comprobar que el documento exista
    //Si existe el documento entonces lo actualizaremos en la base de datos
    firestore.runTransaction(function(transaction) {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(taskRef).then(function(sfDoc) {
          if (!sfDoc.exists) {
            throw new Error("Document does not exist!");
          }                  
          transaction.update(taskRef, taskObj);
      });
    }).then(function() {
        console.log("Transaction successfully committed!");
    }).catch(function(error) {
        console.log("Transaction failed: ", error);
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
                    handleNewDate={this.handleNewDate}
                    selectedDate={this.state.selectedDate}
                    handleEditDate={this.handleEditDate}
                    updateTask={this.updateTask}
                    completeTask={this.completeTask}
                  />
                </Route>
                <Route path='/hoy'>
                  <TodayView 
                    titulo="Tareas para hoy"
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
                    handleNewDate={this.handleNewDate}
                    selectedDate={this.state.selectedDate}
                    handleEditDate={this.handleEditDate}
                  />
                </Route>
                <Route path='/completadas'>
                  <CompletedView 
                    titulo="Tareas Completas"
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
                    handleNewDate={this.handleNewDate}
                    selectedDate={this.state.selectedDate}
                    handleEditDate={this.handleEditDate}
                  />
                </Route>
                <Route path='/proxima-semana'>
                  <NextWeekView 
                    titulo="Tareas para la próxima semana"
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
                    handleNewDate={this.handleNewDate}
                    selectedDate={this.state.selectedDate}
                    handleEditDate={this.handleEditDate}
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
