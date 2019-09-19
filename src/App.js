import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home';
import NavBar from './components/navBar';
import GroupList from './components/groups/GroupList';
import EditGroup from './components/groups/EditGroup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Home}></Route>
          <Route path='/groups' exact={true} component={GroupList}></Route>
          <Route path='/groups/new' exact={true} component={EditGroup}></Route>
          <Route path='/groups/:id' exact={true} component={EditGroup}></Route>
          <Route path="/primer" render = {()=> (<div><NavBar></NavBar> <p>Primer generisanja html u navigacinom baru </p> </div>)}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
