import express from "express"

import { Trail } from "../../../models/index.js"

const indexRouter = new express.Router()

indexRouter.get('/', async (req, res) => {
  try {
    const trails = await Trail.query()
    return res.status(200).json({ trails: trails })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default indexRouter