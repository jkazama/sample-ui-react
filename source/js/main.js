import React from "react"
import { render } from "react-dom"
import { Route } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import reducer from 'reducers'

const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    reducer,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import App from 'container/app'
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
