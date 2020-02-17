import React from 'react';
import logo from './logo.svg';
import './App.css';
import Poll from "./components/poll";



class App extends React.Component{

  render(){
    return (
      <div className="App">
        <Poll />
      </div>
    );
  }
}



export default App;
