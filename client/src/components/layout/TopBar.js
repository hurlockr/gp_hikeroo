import React from "react"
import { Link } from "react-router-dom"
import SignOutButton from "../authentication/SignOutButton"

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
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
      <div className="top-bar-left ">
        <Link to="/">
          <button class="hollow button button-home">Home</button>
        </Link>
        <Link to="/trails">
          <button class="hollow button">Trails</button>
        </Link>
        <Link to="/reviews">
          <button class="hollow button">Reviews</button>
        </Link>
      </div>
      <div className="top-bar-right">
        <div className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</div>
      </div>
    </div>
  )
}

export default TopBar
