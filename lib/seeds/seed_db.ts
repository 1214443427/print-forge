import Database from "better-sqlite3";

export const db = new Database("printforge.db");
db.pragma("journal_mode = DELETE");
