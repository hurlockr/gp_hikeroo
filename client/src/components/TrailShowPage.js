import React, { useState, useEffect } from "react"

const TrailShowPage = (props) => {
  const [trail, setTrail] = useState({
    reviews: [],
  })

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

  const getReviews = trail.reviews.map((review) => {
    return (
      <ul>
        <p>Comment: {review.comment}</p>
        <p>Rating: {review.rating}</p>
      </ul>
    )
  })

  return (
    <div>
      <ul>
        <li>Name: {trail.trailName}</li>
        <li>Length of Trail: {trail.trailLength}</li>
        <li>Description: {trail.trailDescription}</li>
        <li>Location: {trail.trailLocation}</li>
        <li>Estimate Time: {trail.estimateTime}</li>
      </ul>
      <div>{getReviews}</div>
    </div>
  )
}

export default TrailShowPage
