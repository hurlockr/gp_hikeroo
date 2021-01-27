import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const TrailsPage = (props) => {
  const [trails, setTrails] = useState([])

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

  const trailListItems = trails.map((trailItem) => {
    return <li key={trailItem.id}>{trailItem.trailName}</li>
  })

  return (
    <div>
      <h1>All the amazing trails in Massachusetts</h1>
      <ul>{trailListItems}</ul>
    </div>
  )
}

export default TrailsPage
