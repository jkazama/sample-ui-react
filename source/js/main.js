// for React Routing
let Router = ReactRouter
import Routes from "routes"

Router.run(Routes, function(Handler, state) {
  ReactDOM.render(<Handler />, document.getElementById('app'))
})
