import { db } from "../db";
import models from "../data/models.json";

function seedModels() {
  db.prepare(
    `
        CREATE TABLE IF NOT EXISTS models(
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        likes INTEGER NOT NULL DEFAULT 0,
        image TEXT NOT NULL,
        category TEXT NOT NULL,
        dateAdded DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `,
  ).run();

  const insert = db.prepare(`
    INSERT OR REPLACE INTO models (
        id,
        name,
        description,
        likes,
        image,
        category,
        dateAdded
    ) VALUES (@id, @name, @description, @likes, @image, @category, @dateAdded)
 `);

  const insertMany = db.transaction((models) => {
    for (const model of models) {
      insert.run(model);
    }
  });

  insertMany(models);
  console.log("models DB initialized.");
}

seedModels();
