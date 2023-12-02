const fs = require('fs');
const path = require('path');

function createMigrationFile(name) {
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
  const fileName = `${timestamp}_${name}.mjs`;
  const filePath = path.join(__dirname, '../services/migrations/', fileName);

  const fileContent = `import { Kysely } from 'kysely'

/**
 * @param {Kysely<any>} db
 * @return {Promise<void>}
 */
export async function up(db) {
  // Migration code
}

/**
 * @param {Kysely<any>} db
 * @return {Promise<void>}
 */
export async function down(db) {
  // Migration code
}`;

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error('Error creating file:', err);
    } else {
      console.log(`File ${fileName} created successfully at ${filePath}`);
    }
  });
}

// Example usage: node createMigrationFile.js MigrationName
const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Please provide a name for the migration.');
} else {
  createMigrationFile(migrationName);
}
