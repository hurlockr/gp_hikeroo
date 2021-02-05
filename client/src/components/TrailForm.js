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
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Trail Name:
            <input
              class="textboxstyle"
              id="name"
              type="text"
              name="name"
              placeholder="Trail Name"
              onChange={handleChange}
              value={trailRecord.name}
            />
          </label>

          <label htmlFor="length">
            Trail Length:
            <input
              class="textboxstyle"
              id="length"
              type="text"
              name="length"
              placeholder="Trail Length"
              onChange={handleChange}
              value={trailRecord.length}
            />
          </label>

          <label htmlFor="location">
            Trail Location:
            <input
              class="textboxstyle"
              id="location"
              type="text"
              name="location"
              placeholder="Trail Location"
              onChange={handleChange}
              value={trailRecord.location}
            />
          </label>

          <label htmlFor="description">
            Trail Description:
            <input
              class="textboxstyle"
              id="description"
              type="text"
              name="description"
              placeholder="Trail Description"
              onChange={handleChange}
              value={trailRecord.description}
            />
          </label>

          <label htmlFor="estimateTime">
            Estimated Time to Complete:
            <input
              class="textboxstyle"
              id="estimateTime"
              type="text"
              name="estimateTime"
              placeholder="Estimated Time (in hours) to complete:"
              onChange={handleChange}
              value={trailRecord.estimateTime}
            />
          </label>

          <div>
            <input className="button" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default TrailForm
