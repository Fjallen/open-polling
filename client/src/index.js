import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//Using boostrap react
import 'bootstrap/dist/css/bootstrap.min.css';
//React Router
import { BrowserRouter as Router } from 'react-router-dom'
//Apollo GQL Setup
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks'
const client = new ApolloClient({
    uri: 'http://localhost:4000',
  });


ReactDOM.render((
<Router>
  <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
  ), document.getElementById('root'));


serviceWorker.unregister();
