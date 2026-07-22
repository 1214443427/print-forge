import { SqliteError } from "better-sqlite3";
import { db } from "./db";
import { Model } from "./types";

export function getModels({
  search,
  category,
  sort,
  page,
  modelsPerPage = 4,
}: {
  search?: string;
  category?: string;
  sort?: string;
  page: number;
  modelsPerPage?: number;
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
      placeholders.push(`%${search}%`, `%${search}%`);
      query += ` WHERE ( name LIKE ? OR DESCRIPTION LIKE ?)`;

      if (category) {
        placeholders.push(category);
        query += ` AND category=?`;
      }
    } else if (category) {
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

    console.log(page);

    query += ` LIMIT ${modelsPerPage}`;
    const offset = (page - 1) * modelsPerPage;
    query += ` OFFSET ${offset}`;

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

export function getModelsCount({
  search,
  category,
}: {
  search?: string;
  category?: string;
}):
  | {
      ok: true;
      count: number;
    }
  | {
      ok: false;
      error: string;
    } {
  let query = `SELECT COUNT(*) AS count FROM models`;
  const placeholders = [];
  if (search || category) {
    const where = [];
    if (search) {
      where.push(`(name LIKE ? OR description LIKE ?)`);
      placeholders.push(`%${search}%`, `%${search}%`);
    }
    if (category) {
      where.push(`category=?`);
      placeholders.push(category);
    }
    query += " WHERE ";
    query += where.join(" AND ");
  }
  try {
    const result = db.prepare(query).get(placeholders) as { count: number };
    return {
      ok: true,
      count: result.count,
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
