import { connect, connection, createConnection } from "mongoose";
import { Sequelize } from "sequelize";
import { LOCAL_ENV, PRODUCTION_ENV } from "../helpers/constants";


class ConnectionPostgres {

  static connection: any = null;

  static connect() {
    if (ConnectionPostgres.connection === null) {
      console.log("Creating new connection...");
      ConnectionPostgres.connection = new Sequelize('postgres://postgres:12345@localhost:5432/findmyhobby_development');
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