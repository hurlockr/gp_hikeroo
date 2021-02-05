import React, { useState } from "react"

const ReviewForm = ({ postReview }) => {
  const [newReview, setNewReview] = useState({
    comment: "",
    rating: "",
  })

  const handleInputChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postReview(newReview)
    clearForm()
  }

  const clearForm = () => {
    setNewReview({
      comment: "",
      rating: "",
    })
  }

  return (
    <div className="review-form textboxclass">
      <form onSubmit={handleSubmit}>
        <label>
          <p>Comment:</p>
          <input
            type="text"
            name="comment"
            placeholder="Your Comments About This Trail:"
            onChange={handleInputChange}
            value={newReview.comment}
          />
        </label>

        <label>
          <p>Rating:</p>
          <input
            type="text"
            name="rating"
            placeholder="Your Rating:"
            onChange={handleInputChange}
            value={newReview.rating}
          />
        </label>
        <div>
          <input className="button" type="submit" value="Post Review" />
        </div>
      </form>
    </div>
  )
}
export default ReviewForm
