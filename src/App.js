import React from 'react';
import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import NavbarComponent from './components/navbar/navbar-component';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './views/404/404-view';
import Home from './views/home/home-view';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Row>
          <Col md={3}>
            <NavbarComponent />
          </Col>
          <Col md={9} className="view-container">
            <Switch>
              <Route exact path='/'>            
                <Home />
              </Route>
              <Route >
                <NotFound />
              </Route>
            </Switch>         
          </Col>
        </Row>
      </Container>   
    </BrowserRouter> 
  );
}

export default App;
