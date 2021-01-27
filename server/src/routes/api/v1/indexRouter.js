import express from "express"

import { Trail } from "../../../models/index.js"

const indexRouter = new express.Router()

indexRouter.get('/', async (req, res) => {
  try {
    const trail = await Trail.query()
    return res.status(200).json({ trail: trail })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default indexRouter