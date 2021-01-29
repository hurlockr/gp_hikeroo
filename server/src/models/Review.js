const Model = require("./Model")

class Review extends Model {
  static get tableName() {
    return "reviews"
  }

  static get relationMappings() {
    const { Trail, User } = require("./index")

    return {
      trails: {
        relation: Model.BelongsToOneRelation,
        modelClass: Trail,
        join: {
          from: "reviews.trailId",
          to: "trails.id",
        },
      },

      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "reviews.userId",
          to: "users.id",
        },
      },
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["comment", "rating"],
      properties: {
        comment: { type: "string" },
        rating: { type: ["string", "integer"] },
        trailId: { type: ["string", "integer"] },
        userId: { type: ["string", "integer"] },
      },
    }
  }
}

module.exports = Review
