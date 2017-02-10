import React from "react"
import {Router, Route, IndexRoute} from 'react-router';

import App from "app"
import Login from "components/login"
import Timeout from "components/timeout"
import Top from "components/top"
import Trade from "components/trade"
import Asset from "components/asset"

let Routes = function() {
  return (
    <Route component={App} path="/">
      <IndexRoute component={Login} />
      <Route path="login" component={Login} />
      <Route path="timeout" component={Timeout} />
      <Route path="top" component={Top} />
      <Route path="trade" component={Trade} />
      <Route path="asset" component={Asset} />
      <Route path='*' component={Timeout}/>
    </Route>
  )
}
export default Routes()
