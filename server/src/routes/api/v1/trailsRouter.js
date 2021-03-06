import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Trail } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import TrailSerializer from "../../serializers/TrailSerializer.js"
import trailReviewRouter from "./trailReviewRouter.js"

const trailsRouter = new express.Router()

trailsRouter.use("/:id/reviews", trailReviewRouter)

trailsRouter.get("/", async (req, res) => {
  try {
    const trails = await Trail.query()
    const serializedTrails = []
    for (const trail of trails) {
      const serializedTrail = await TrailSerializer.getSummary(trail)
      serializedTrails.push(serializedTrail)
    }
    return res.status(200).json({ trails: serializedTrails })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

trailsRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const trail = await Trail.query().findById(id)
    const serializedTrail = await TrailSerializer.getSummary(trail)
    if (trail) {
      res.status(200).json({ trail: serializedTrail })
    } else {
      res.status(404)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

trailsRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  const { name, length, location, description, estimateTime } = formInput

  try {
    const newTrail = await Trail.query().insertAndFetch({
      name,
      length,
      location,
      description,
      estimateTime,
    })
    return res.status(201).json({ trail: newTrail })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})

export default trailsRouter
