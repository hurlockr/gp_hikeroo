import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
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
          <div>
            <div className="bg-img">
              <div className="bg-container">
                <div className="bg-text">
                  <h1 className="app-header">HIKEROO</h1>
                  <h2>All the best trails in Massachusetts</h2>
                  <Link to="/trails">
                    <a className="button large expanded">Let's Go Outside!</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
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
