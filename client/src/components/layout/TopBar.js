import React from "react"
import { Link } from "react-router-dom"
import SignOutButton from "../authentication/SignOutButton"

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button-group">
        Sign Up
      </Link>
    </li>,
  ]

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ]

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <div>
          <Link to="/">Hikeroo Home</Link>
        </div>
        <div>
          <Link to="/trails">Trails</Link>
        </div>
      </div>
      <div className="top-logo"></div>
      <div className="top-bar-right">
        <div className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</div>
      </div>
    </div>
  )
}

export default TopBar
