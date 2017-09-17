import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import 'typeface-fira-sans/index.css';
import './index.css';
import apolloClient from './lib/apollo-client';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
