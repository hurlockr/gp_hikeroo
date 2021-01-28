import express from "express"

import { Trail } from "../../../models/index.js"

const trailsRouter = new express.Router()

trailsRouter.get("/", async (req, res) => {
  try {
    const trails = await Trail.query()
    return res.status(200).json({ trails: trails })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

trailsRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const trail = await Trail.query().findById(id)
    if (trail) {
      res.status(200).json({ trail: trail })
    } else {
      res.status(404)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default trailsRouter
