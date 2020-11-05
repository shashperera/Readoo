import React, { Component } from "react";
import Modal from "./components/Modal";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, Add, Contact } from "./components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, NavDropdown, FormControl, Form } from 'react-bootstrap';


class App extends Component {
  render() {
    return ( 

      <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/add" exact component={() => <Add />} />
        </Switch>
      </Router>
    </div>
   
    );
  }
}
export default App;