import React from "react"
import { render } from "react-dom"
import { createStore, combineReducers, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

import reducer from 'reducers'
import App from 'container/app'
import Routes from "routes"

const middleware = routerMiddleware(hashHistory)
const store = createStore(
  combineReducers({
    reducer,
    routing: routerReducer,
  }),
  applyMiddleware(middleware)
)
const history = syncHistoryWithStore(hashHistory, store)

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

render(
  <Provider store={store}>
    <Router history={history}>
      {Routes}
    </Router>
  </Provider>,
  document.getElementById('app')
)
