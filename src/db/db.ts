import knex from "knex";
import config from "./knexfile";

const environment = process.env.NODE_ENV as string;
console.log(environment);

const db = knex(config["development"]);

export default db;
