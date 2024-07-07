import { Knex } from "knex";

const createUserTable = async (knex: Knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").notNullable();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").notNullable().unique();
    table.integer("balance").defaultTo(0);
    table.string("walletId").notNullable().unique();
    table.string("password").notNullable();
  });
};

export default createUserTable;
