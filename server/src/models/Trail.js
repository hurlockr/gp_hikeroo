const Model = require("./Model")

class Trail extends Model {
    static get tableName(){
        return "trails"
    }

    static get jsonSchema(){
        return {
            type: "object",
            required: ["trailName", "trailLength", "trailLocation"],
            properties: {
                trailName: {type: "string"},
                trailLength: {type: ["string", "integer"]},
                trailDescription: {type: "string"},
                trailLocation: {type: "string"},
                estimateTime: {type: ["string", "integer"]}
            }
        }
    }
}
module.exports = Trail