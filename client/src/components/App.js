import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import getCurrentUser from "../services/getCurrentUser"
import "../assets/scss/main.scss"
import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import TrailShowPage from "./TrailShowPage"
import TrailsPage from "./TrailsPage"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user)
      })
      .catch(() => {
        setCurrentUser(null)
      })
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <h2>Hello from Trails</h2>
        </Route>
        <Route exact path="/trails">
          <TrailsPage user={currentUser} />
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/trails/:id">
          <TrailShowPage user={currentUser} />
        </Route>
      </Switch>
    </Router>
  )
}

export default hot(App)
