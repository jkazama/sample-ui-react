// for React Routing
import React from "react"
import ReactDOM from "react-dom"
import Router from "react-router"
import Routes from "routes"

Router.run(Routes, function(Handler, state) {
  ReactDOM.render(<Handler />, document.getElementById('app'))
})
