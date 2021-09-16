import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import { Provider } from 'react-redux';
import store from './utils/store';

import home from "./pages/home";
import detail from "./pages/detail";
import nomatch from "./pages/nomatch";
import login from "./pages/login";
import signup from "./pages/signup";
import Nav from "./components/nav";
import success from "./pages/success";
import orderhistory from "./pages/orderhistory";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Provider store={store}>
            <Nav />
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
              <Route exact path="/success" component={success} />
              <Route exact path="/orderHistory" component={orderhistory} />
              <Route exact path="./products/:id" component={detail} />
              <Route component={nomatch} />
            </Switch>
          </Provider>
        </div>
      </Router>
    </ApolloProvider>

  );
}

export default App;