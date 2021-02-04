import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ReviewForm from "./ReviewForm"
import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const TrailShowPage = (props) => {
  const [trail, setTrail] = useState({
    reviews: [],
  })
  const { id } = useParams()

  const [errors, setErrors] = useState([])

  const getTrail = async () => {
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

  const postReview = async (newReviewData) => {
    const reviewDataTrailId = { ...newReviewData, trailId: id, userId: props.user.id }

    try {
      const response = await fetch(`/api/v1/trails/${id}/reviews`, {
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
        debugger
        setTrail({
          ...trail,
          reviews: [...trail.reviews, body.newReview],
        })
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
