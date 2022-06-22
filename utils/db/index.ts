// import "reflect-metadata";
// import { DataSource } from "typeorm";
// import { User } from "./entity/user";

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "postgres",
//   password: "admin",
//   database: "postgres",
//   entities: [User],
//   synchronize: true,
//   logging: false,
// })

// // to initialize initial connection with the database, register all entities
// // and "synchronize" database schema, call "initialize()" method of a newly created database
// // once in your application bootstrap
// AppDataSource.initialize()
//   .then(() => {
//     // here you can start to work with your database
//   })
//   .catch((error) => console.log(error));

// db.js
import { Pool } from "pg";
import SQL from "sql-template-strings";

let conn: Pool | undefined;

if (!conn) {
  conn = new Pool({
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
  });
}

export const sqlQuery = async (queryStr: string) => {
  try {
    console.log({ queryStr });
    const res = await conn?.query(SQL([queryStr]));
    console.log({ records: res?.rows });
    // if (!res?.rows.length) {
    //   throw new Error('Empty record!');
    // }
    return res; 
  } catch(error) {
    console.error({ error });
    throw new Error('SQL error!');
  }
};
