import { connect, connection, createConnection } from "mongoose";
import { Sequelize } from "sequelize";
import { LOCAL_ENV, PRODUCTION_ENV } from "../helpers/constants";


class ConnectionPostgres {

  static connection: any = null;

  static connect() {
    if (ConnectionPostgres.connection === null) {
      console.log("Creating new connection...");

      if (process.env.NODE_ENV === "production") {
        ConnectionPostgres.connection = new Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false
            }
          }
        });
      } else {
        ConnectionPostgres.connection = new Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
      }
      
      console.log("New connetion created.");
    }

    return ConnectionPostgres.connection;
  }

  closeConnection() {
    return ConnectionPostgres.connection.closeConnection();
  }

  dropDatabase() {
    return ConnectionPostgres.connection.dropDatabase();
  }
}


export default ConnectionPostgres;