import type { Knex } from "knex";
import createUserTable from "../../models/user.model";

export async function up(knex: Knex): Promise<void> {
  return createUserTable(knex);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
