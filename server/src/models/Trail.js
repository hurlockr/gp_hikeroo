const Model = require("./Model")

class Trail extends Model {
  static get tableName() {
    return "trails"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "length", "location"],
      properties: {
        name: { type: "string" },
        length: { type: ["string", "integer"] },
        description: { type: "string" },
        location: { type: "string" },
        estimateTime: { type: ["string", "integer"] },
      },
    }
  }
}
module.exports = Trail
