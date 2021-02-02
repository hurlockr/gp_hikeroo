import UserSerializer from "./UserSerializer.js"

class ReviewSerializer {
  static async getSummary(review) {
    const allowedAttributes = ["id", "comment", "rating"]

    let serializedReview = {}
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }
    const relatedUser = await user.$relatedQuery("users")
    const serializedReviews = relatedUser.map((user) => UserSerializer.getSummary(user))
    serializedUser.reviews = serializedReviews
    return serializedReview
  }
}
export default ReviewSerializer
