import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
//Custom Pages
import PollPage from './views/PollPage';
import PollsPage from './views/PollsPage.jsx';


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
