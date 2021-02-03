import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import TrailForm from "./TrailForm"
import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const TrailsPage = (props) => {
  const [trails, setTrails] = useState([])
  const [errors, setErrors] = useState([])

  const getTrails = async () => {
    try {
      const response = await fetch("/api/v1/trails")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setTrails(body.trails)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getTrails()
  }, [])

  const addTrail = async (trailPayload) => {
    try {
      const response = await fetch("/api/v1/trails", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(trailPayload),
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        const body = await response.json()
        const updatedTrails = trails.concat(body.trail)
        setTrails(updatedTrails)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  const trailListItems = trails.map((trailItem) => {
    return (
      <li key={trailItem.id}>
        <Link to={`/trails/${trailItem.id}`}>{trailItem.name}</Link>
      </li>
    )
  })

  return (
    <div>
      <h1>All the amazing trails in Massachusetts</h1>
      <ErrorList errors={errors} />
      <TrailForm addTrail={addTrail} />
      <ul>{trailListItems}</ul>
    </div>
  )
}

export default TrailsPage
