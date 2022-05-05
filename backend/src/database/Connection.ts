import { connect, connection, createConnection } from "mongoose";
import { LOCAL_ENV, PRODUCTION_ENV } from "../helpers/constants";


class Connection {
  localConnectionURI: string = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`;
  cloudConnectionURI: string = `mongodb+srv://find-my-hobby-admin:${process.env.DB_PASSWORD}@cluster0.k9fdy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

  constructor() {
    this.connect();
  }

  connect() {
    switch(process.env.ENVIRONMENT) {
      case LOCAL_ENV:
        return connect(this.localConnectionURI);
      case PRODUCTION_ENV:
        return connect(this.cloudConnectionURI);
      default:
        return connect(this.localConnectionURI);
    }
  }

  createConnection() {
    switch(process.env.ENVIRONMENT) {
      case LOCAL_ENV:
        return createConnection(this.localConnectionURI);
      case PRODUCTION_ENV:
        return createConnection(this.cloudConnectionURI);
      default:
        return createConnection(this.localConnectionURI);
    }
  }

  dropDatabase() {
    return connection.dropDatabase();
  }

  closeConnection() {
    return connection.close();
  }
}


export default Connection;