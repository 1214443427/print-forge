import { SqliteError } from "better-sqlite3";
import { db } from "./db";
import { Category } from "./types";

export function getCategories():
  | {
      ok: true;
      categories: Category[];
    }
  | {
      ok: false;
      error: string;
    } {
  try {
    const categories = db
      .prepare(
        `
            SELECT * FROM categories
            `,
      )
      .all();

    return {
      ok: true,
      categories: categories as Category[],
    };
  } catch (error) {
    if (error instanceof SqliteError) {
      return {
        ok: false,
        error: error.message,
      };
    }
    throw error;
  }
}

export function getCategoryBySlug(slug: string):
  | {
      ok: true;
      category: Category;
    }
  | {
      ok: false;
      error: string;
    } {
  try {
    const category = db
      .prepare(
        `
            SELECT * FROM categories WHERE slug=?
            `,
      )
      .get(slug);

    console.log("logging", category, slug);

    return {
      ok: true,
      category: category as Category,
    };
  } catch (error) {
    if (error instanceof SqliteError) {
      return {
        ok: false,
        error: error.message,
      };
    }
    throw error;
  }
}
