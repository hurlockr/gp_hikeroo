import React, { useState } from "react"

const TrailForm = (props) => {
  const [trailRecord, setTrailRecord] = useState({
    trailName: "",
    trailLength: "",
    trailLocation: "",
    trailDescription: "",
    estimateTime: "",
  })

  const handleChange = (event) => {
    setTrailRecord({
      ...trailRecord,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addTrail(trailRecord)
  }

  return (
    <div className="trail-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="trailName">
          Trail Name:
          <input
            id="trialName"
            type="text"
            name="trailName"
            onChange={handleChange}
            value={trailRecord.trailName}
          />
        </label>
        <label htmlFor="trailLength">
          Trail Length:
          <input
            id="trialLength"
            type="text"
            name="trailLength"
            onChange={handleChange}
            value={trailRecord.trailLength}
          />
        </label>
        <label htmlFor="trailLocation">
          Trail Location:
          <input
            id="trialLocation"
            type="text"
            name="trailLocation"
            onChange={handleChange}
            value={trailRecord.trailLocation}
          />
        </label>
        <label htmlFor="trailDescription">
          Trail Description:
          <input
            id="trialDescription"
            type="text"
            name="trailDescription"
            onChange={handleChange}
            value={trailRecord.trailDescription}
          />
        </label>
        <label htmlFor="estimateTime">
          Estimated Time to Complete:
          <input
            id="estimateTime"
            type="text"
            name="estimateTime"
            onChange={handleChange}
            value={trailRecord.estimateTime}
          />
        </label>
        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default TrailForm
