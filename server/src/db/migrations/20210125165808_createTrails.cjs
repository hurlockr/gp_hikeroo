/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("trails", (table) => {
    table.bigIncrements("id").primary()
    table.string("trailName").notNullable()
    table.integer("trailLength").notNullable()
    table.text("trailDescription")
    table.string("trailLocation").notNullable()
    table.integer("estimateTime")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("trails")
}
