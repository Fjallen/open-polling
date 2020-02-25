import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
//Custom Pages
import PollPage from './views/PollPage';
import PollsPage from './views/PollsPage.jsx';
import AddPollPage from './views/AddPollPage';
import TestPage from './components/AddPollForm/TestPoll';

class App extends React.Component{

  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={AddPollPage}/>
          <Route path="/poll/:pollId" component={PollPage}/>
          <Route path="/test" component={TestPage}/>
        </Switch>
      </div>
    );
  }
}



export default App;
