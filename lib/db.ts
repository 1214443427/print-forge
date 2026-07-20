import Database from "better-sqlite3";
import type { Database as DatabaseType } from "better-sqlite3";
export const db = new Database("printforge.db");
db.pragma("journal_mode = WAL");
