class ReviewSerializer {
  static async getSummary(review) {
    const allowedAttributes = ["id", "comment", "rating", "trailId", "userId"]

    let serializedReview = {}
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }
    return serializedReview
  }
}
export default ReviewSerializer
