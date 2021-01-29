const Model = require("./Model")

class Trail extends Model {
  static get tableName() {
    return "trails"
  }

  static get relationMappings() {
    const { Review, User } = require("./index")

    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "trails.id",
          to: "reviews.trailId",
        },
      },

      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "trails.id",
          through: {
            from: "reviews.trailId",
            to: "reviews.userId",
          },
          to: "users.id",
        },
      },
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["trailName", "trailLength", "trailLocation"],
      properties: {
        trailName: { type: "string" },
        trailLength: { type: ["string", "integer"] },
        trailDescription: { type: "string" },
        trailLocation: { type: "string" },
        estimateTime: { type: ["string", "integer"] },
      },
    }
  }
}
module.exports = Trail
