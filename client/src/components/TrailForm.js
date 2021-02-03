import React, { useState } from "react"

const TrailForm = (props) => {
  const [trailRecord, setTrailRecord] = useState({
    name: "",
    length: "",
    location: "",
    description: "",
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
    clearForm()
  }

  const clearForm = () => {
    setTrailRecord({
      name: "",
      length: "",
      location: "",
      description: "",
      estimateTime: "",
    })
  }

  return (
    <div className="trail-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Trail Name:
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={trailRecord.name}
          />
        </label>

        <label htmlFor="length">
          Trail Length:
          <input
            id="length"
            type="text"
            name="length"
            onChange={handleChange}
            value={trailRecord.length}
          />
        </label>

        <label htmlFor="location">
          Trail Location:
          <input
            id="location"
            type="text"
            name="location"
            onChange={handleChange}
            value={trailRecord.location}
          />
        </label>

        <label htmlFor="description">
          Trail Description:
          <input
            id="description"
            type="text"
            name="description"
            onChange={handleChange}
            value={trailRecord.description}
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
