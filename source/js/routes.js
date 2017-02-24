import React from "react"
import {Router, Route, IndexRoute} from 'react-router';

import App from "container/app"
import Login from "container/login"
import Timeout from "container/timeout"
import Top from "container/top"
import Trade from "container/trade"
import Asset from "container/asset"

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Top} />
    <Route path="login" component={Login} />
    <Route path="timeout" component={Timeout} />
    <Route path="top" component={Top} />
    <Route path="trade" component={Trade} />
    <Route path="asset" component={Asset} />
    <Route path='*' component={Timeout}/>
  </Route>
)
