import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import ReviewForm from "./ReviewForm"
import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const TrailShowPage = (props) => {
  const userStatus = props.user

  const [trail, setTrail] = useState({
    reviews: [],
  })
  const { id } = useParams()

  const [errors, setErrors] = useState([])
  const [loginStatus, setLoginStatus] = useState(true)

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
    if (!userStatus) {
      setLoginStatus(false)
    } else {
      try {
        const response = await fetch(`/api/v1/trails/${id}/reviews`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(newReviewData),
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
          setTrail({
            ...trail,
            reviews: [...trail.reviews, body.newReview],
          })
        }
      } catch (error) {
        console.error(`Error in fetch: ${error.message}`)
      }
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

  let loginStatusError = ""

  if (!loginStatus) {
    loginStatusError = (
      <div>
        <p>
          <p>To Post a Review:</p>
          <Link to="/users/new">Register </Link>
          <Link to="/user-sessions/new">Sign In</Link>
        </p>
      </div>
    )
  }

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
        {loginStatusError}
        <ReviewForm postReview={postReview} userStatus={userStatus} />
        {getReviews}
      </div>
    </div>
  )
}

export default TrailShowPage
