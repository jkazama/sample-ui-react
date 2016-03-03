import React from "react"
import Router from "react-router"
let {Route, DefaultRoute, NotFoundRoute} = Router

import App from "app"
import Login from "components/login"
import Timeout from "components/timeout"
import Top from "components/top"
import Trade from "components/trade"
import Asset from "components/asset"

let Routes = function() {
  return (
    <Route handler={App} path="/">
      <Route name="login" handler={Login} />
      <Route name="timeout" handler={Timeout} />
      <Route name="top" handler={Top} />
      <Route name="trade" handler={Trade} />
      <Route name="asset" handler={Asset} />
      <DefaultRoute handler={Login} />
      <NotFoundRoute handler={Timeout}/>
    </Route>
  )
}
export default Routes()
