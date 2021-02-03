import React, { useState, useEffect } from "react"
import ReviewForm from "./ReviewForm"
import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const TrailShowPage = (props) => {
  const [trail, setTrail] = useState({
    reviews: [],
  })
  const [newReview, setNewReview] = useState({})
  const [errors, setErrors] = useState([])

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
  }, [newReview])

  const postReview = async (newReviewData) => {
    const trailId = props.match.params.id
    const reviewDataTrailId = { ...newReviewData, trailId: trailId }

    try {
      const response = await fetch("/api/v1/reviews", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(reviewDataTrailId),
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
        setNewReview(body)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const getReviews = trail.reviews.map((review) => {
    return (
      <ul key={review.id}>
        <li>Comment: {review.comment}</li>
        <li>Rating: {review.rating}</li>
      </ul>
    )
  })

  return (
    <div>
      <ul>
        <li>Name: {trail.name}</li>
        <li>Length of Trail: {trail.length}</li>
        <li>Description: {trail.description}</li>
        <li>Location: {trail.location}</li>
        <li>Estimate Time: {trail.estimateTime}</li>
      </ul>
      <div>
        <ErrorList errors={errors} />
        <ReviewForm postReview={postReview} />
        {getReviews}
      </div>
    </div>
  )
}

export default TrailShowPage
