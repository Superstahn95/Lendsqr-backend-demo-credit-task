import knex from "knex";
import config from "./knexfile";

const environment = process.env.NODE_ENV as string;

const db = knex(config[environment]);

export default db;
