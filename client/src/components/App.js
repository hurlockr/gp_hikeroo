import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import getCurrentUser from "../services/getCurrentUser"
import "../assets/scss/components/App.scss"
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
          <div className="index">
            <div className="index-navigation">
              <h2>Time for testing</h2>
            </div>
            <div className="index-splash">
            </div>
            <h2>Hello from Trails</h2>
          </div>
        </Route>
        <Route exact path="/trails" component={TrailsPage} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/trails/:id" component={TrailShowPage} />
      </Switch>
    </Router>
  )
}

export default hot(App)
