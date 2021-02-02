import ReviewSerializer from "./ReviewSerializer.js"

class TrailSerializer {
  static async getSummary(trail) {
    const allowedAttributes = ["id", "name", "length", "description", "location", "estimateTime"]

    let serializedTrail = {}
    for (const attribute of allowedAttributes) {
      serializedTrail[attribute] = trail[attribute]
    }
    const relatedReviews = await trail.$relatedQuery("reviews")
    const serializedReviews = await Promise.all(
      relatedReviews.map((review) => ReviewSerializer.getSummary(review))
    )
    serializedTrail.reviews = serializedReviews
    debugger
    return serializedTrail
  }
}

export default TrailSerializer
