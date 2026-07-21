import { SqliteError } from "better-sqlite3";
import { db } from "./db";
import { Model } from "./types";

export function getModels({
  search,
  category,
  sort,
}: {
  search?: string;
  category?: string;
  sort?: string;
}):
  | {
      ok: true;
      models: Model[];
    }
  | {
      ok: false;
      error: string;
    } {
  try {
    let query = `SELECT * FROM models`;
    const placeholders = [];
    if (search) {
      placeholders.push(`%${search}%`, `%${search}%`, `%${search}%`);
      query += ` WHERE (category LIKE ? OR name LIKE ? OR DESCRIPTION LIKE ?)`;
    }

    if (search && category) {
      query += ` AND`;
    }

    if (category) {
      placeholders.push(category);
      query += ` WHERE category=?`;
    }

    if (sort) {
      if (sort === "popular") {
        query += ` ORDER BY likes DESC`;
      }
      if (sort === "alpha") {
        query += ` ORDER BY name `;
      }
      if (sort === "recent") {
        query += ` ORDER BY dateAdded DESC`;
      }
    }

    const data = db.prepare(query).all(placeholders);
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

export function getModelsByCategorySlug(
  categorySlug: string,
  sort: string,
):
  | {
      ok: true;
      models: Model[];
    }
  | {
      ok: false;
      error: string;
    } {
  try {
    let query = `SELECT * FROM models WHERE category=?`;

    if (sort) {
      if (sort === "popular") {
        query += ` ORDER BY likes DESC`;
      }
      if (sort === "alpha") {
        query += ` ORDER BY name `;
      }
      if (sort === "recent") {
        query += ` ORDER BY dateAdded DESC`;
      }
    }

    const data = db.prepare(query).all([categorySlug]);
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
