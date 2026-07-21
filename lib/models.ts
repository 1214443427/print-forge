import { SqliteError } from "better-sqlite3";
import { db } from "./db";
import { Model } from "./types";

export function getModels():
  | {
      ok: true;
      models: Model[];
    }
  | {
      ok: false;
      error: string;
    } {
  try {
    const data = db
      .prepare(
        `
            SELECT * FROM models
            `,
      )
      .all();
    return {
      ok: true,
      models: data as Model[],
    };
  } catch (error) {
    if (error instanceof SqliteError) {
      return { ok: false, error: error.message };
    }
    throw error;
  }
}

export function getModelsByCategorySlug(categorySlug: string):
  | {
      ok: true;
      models: Model[];
    }
  | {
      ok: false;
      error: string;
    } {
  try {
    const data = db
      .prepare(
        `
            SELECT * FROM models WHERE category=?
            `,
      )
      .all([categorySlug]);
    return {
      ok: true,
      models: data as Model[],
    };
  } catch (error) {
    if (error instanceof SqliteError) {
      return { ok: false, error: error.message };
    }
    throw error;
  }
}

export function getModelBySlug(slug: string):
  | {
      ok: true;
      model: Model;
    }
  | {
      ok: false;
      error: string;
    } {
  try {
    const id = Number(slug);
    const data = db
      .prepare(
        `
            SELECT * FROM models WHERE id=?
            `,
      )
      .get(id);
    return {
      ok: true,
      model: data as Model,
    };
  } catch (error) {
    if (error instanceof SqliteError) {
      return { ok: false, error: error.message };
    }
    throw error;
  }
}
