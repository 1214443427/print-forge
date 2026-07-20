import { db } from "../db";
import categories from "../data/categories.json";

function seedCategories() {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS categories(
            slug TEXT NOT NULL PRIMARY KEY,
            name TEXT NOT NULL
    );
    `,
  ).run();

  const insert = db.prepare(
    `INSERT OR REPLACE INTO categories (
            name,
            slug
        ) VALUES (@name, @slug)`,
  );

  const insertMany = db.transaction((categories) => {
    for (const category of categories) {
      insert.run(category);
    }
  });

  insertMany(categories);
  console.log("categories DB initialized.");
}

seedCategories();
