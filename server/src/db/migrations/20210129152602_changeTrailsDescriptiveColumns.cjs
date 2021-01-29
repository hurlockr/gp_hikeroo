/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("trails", (table) => {
    table.renameColumn("trailName", "name")
    table.renameColumn("trailLength", "length")
    table.renameColumn("trailDescription", "description")
    table.renameColumn("trailLocation", "location")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.table("trails", (table) => {
    table.renameColumn("name", "trailName")
    table.renameColumn("length", "trailLength")
    table.renameColumn("description", "trailDescription")
    table.renameColumn("location", "trailLocation")
  })
}
