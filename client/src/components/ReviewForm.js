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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          comment:
          <input
            type="text"
            name="comment"
            onChange={handleInputChange}
            value={newReview.comment}
          />
        </label>

        <label>
          rating:
          <input type="text" name="rating" onChange={handleInputChange} value={newReview.rating} />
        </label>
        <div>
          <input className="button" type="submit" value="submit" />
        </div>
      </form>
    </div>
  )
}
export default ReviewForm
