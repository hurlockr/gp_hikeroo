import React, { useState } from "react"
import FormError from "../layout/FormError"
import config from "../../config"

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  })

  const [errors, setErrors] = useState({})

  const [shouldRedirect, setShouldRedirect] = useState(false)

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

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      }
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      }
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        }
      }
    }

    setErrors(newErrors)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    validateInput(userPayload)
    if (Object.keys(errors).length === 0) {
      fetch("/api/v1/users", {
        method: "post",
        body: JSON.stringify(userPayload),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => {
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
    location.href = "/"
  }

  return (
    <div className="form trail-bg-img grid-container">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Email
            <input
              className="textboxstyle"
              type="text"
              name="email"
              placeholder="Email"
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
          <label>
            Password Confirmation
            <input
              className="textboxstyle"
              type="password"
              name="passwordConfirmation"
              placeholder="Password Confirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div>
          <input type="submit" className="button-group" value="Register" />
        </div>
      </form>
    </div>
  )
}

export default RegistrationForm
