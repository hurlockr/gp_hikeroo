import React, { useState } from "react"
import config from "../../config"
import FormError from "../layout/FormError"

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" })
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState({})

  const validateInput = (payload) => {
    setErrors({})
    const { email, password, passwordConfirmation } = payload
    const emailRegexp = config.validation.email.regexp
    let newErrors = {}
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      }
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      }
    }

    setErrors(newErrors)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    validateInput(userPayload)
    if (Object.keys(errors).length === 0) {
      fetch("/api/v1/user-sessions", {
        method: "post",
        body: JSON.stringify(userPayload),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then(() => {
            setShouldRedirect(true)
          })
        } else {
          const errorMessage = `${resp.status} (${resp.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      })
    }
  }
  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  if (shouldRedirect) {
    location.href = "/trails"
  }

  return (
    <div className="form trail-bg-img-signin grid-container">
      <h1>Sign In</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Email
            <input
              className="textboxstyle"
              type="text"
              name="email"
              placeholder="Email address"
              value={userPayload.email}
              onChange={onInputChange}
            />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              className="textboxstyle"
              type="password"
              name="password"
              placeholder="Password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Sign In" />
        </div>
      </form>
    </div>
  )
}

export default SignInForm
