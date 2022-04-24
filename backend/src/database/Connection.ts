import { connect } from "mongoose";


class Connection {

  connect() {
    switch(process.env.ENVIRONMENT) {
      case "local":
        return connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
      case "production":
        return connect(`mongodb+srv://find-my-hobby-admin:${process.env.DB_PASSWORD}@cluster0.k9fdy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
      default:
        return connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
    }
  }
}


export default Connection;