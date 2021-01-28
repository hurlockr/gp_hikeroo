import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Trail } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const trailsRouter = new express.Router()

trailsRouter.get("/", async (req, res) => {
  try {
    const trails = await Trail.query()
    return res.status(200).json({ trails: trails })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

trailsRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  const { trailName, trailLength, trailLocation, trailDescription, estimateTime } = formInput
  // const { trailId } = req.params
  console.log(formInput)
  try {
    const newTrail = await Trail.query().insertAndFetch({
      trailName,
      trailLength,
      trailLocation,
      trailDescription,
      estimateTime,
    })
    return res.status(201).json({ trail: newTrail })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default trailsRouter
