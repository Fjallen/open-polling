import React from 'react';
import logo from './logo.svg';
import './App.css';
import Poll from "./components/poll";
import {Route, Switch} from 'react-router-dom'
import PollPage from './views/pollPage';

class App extends React.Component{

  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={()=>(
            <div>
              <h1>Home</h1>
            </div>
          )}/>
          <Route path="/poll/:pollId" component={PollPage}/>
        </Switch>
      </div>
    );
  }
}



export default App;
