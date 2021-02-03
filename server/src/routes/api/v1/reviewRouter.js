import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Review } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const reviewRouter = new express.Router()

reviewRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  const { comment, rating, trailId } = formInput

  try {
    const newReview = await Review.query().insertAndFetch({
      comment,
      rating,
      trailId,
      userId: 1,
    })

    return res.status(201).json({ newReview: newReview })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})

export default reviewRouter
