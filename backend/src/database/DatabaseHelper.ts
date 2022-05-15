import Connection from "./Connection";

class DatabaseHelper {

  static connection: any = null;

  static getConnection() {
    if (DatabaseHelper.connection === null) {
      console.log("Creating new connection...");
      DatabaseHelper.connection = new Connection();
      console.log("New connetion created.");
    }

    return DatabaseHelper.connection;
  }

}


export default DatabaseHelper;