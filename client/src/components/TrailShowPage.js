import React, { useState, useEffect } from "react"

const TrailShowPage = (props) => {
  const [trail, setTrail] = useState({})

  const getTrail = async () => {
    const id = props.match.params.id
    try {
      const response = await fetch(`/api/v1/trails/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setTrail(body.trail)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getTrail()
  }, [])

  return (
    <div>
      <ul>
        <li>Name: {trail.name}</li>
        <li>Length of Trail: {trail.length}</li>
        <li>Description: {trail.description}</li>
        <li>Location: {trail.location}</li>
        <li>Estimate Time: {trail.estimateTime}</li>
      </ul>
    </div>
  )
}

export default TrailShowPage
