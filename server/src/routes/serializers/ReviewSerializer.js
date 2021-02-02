import UserSerializer from "./UserSerializer.js"

class ReviewSerializer {
  static async getSummary(review) {
    const allowedAttributes = ["id", "comment", "rating"]

    let serializedReview = {}
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }
    const relatedUser = await review.$relatedQuery("user")
    const serializedUser = UserSerializer.getSummary(relatedUser)
    serializedReview.user = serializedUser
    return serializedReview
  }
}
export default ReviewSerializer
