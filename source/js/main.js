import React from "react"
import { render } from "react-dom"
import { Route } from 'react-router-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import createHistory from 'history/createHashHistory'

import createRootReducer from 'reducers'

const history = createHistory()
const store = createStore(
  createRootReducer(history),
  {},
  compose(
    applyMiddleware(
      routerMiddleware(history),
    ),
  ),
)

import App from 'container/app'
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
