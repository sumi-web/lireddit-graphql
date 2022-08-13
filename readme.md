<!-- MIGRATIONS Guide-->

// manually have to write query when using this command
Create migration-> typeorm-ts-node-commonjs migration:create ./src/migrations/{your_file_name}
// automatically generate a migration when you change your model
Generate migration-> typeorm-ts-node-commonjs migration:generate ./src/migrations/{your_file_name} -d ./src/config/database.ts
Run migration-> typeorm-ts-node-commonjs migration:run -d src/config/{your_data_source}
