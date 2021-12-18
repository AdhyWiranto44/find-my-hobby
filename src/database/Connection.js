const mongoose = require("mongoose");


class Connection {
    connectToMongoDBAtlas() {
        return mongoose.connect(`mongodb+srv://find-my-hobby-admin:${process.env.DB_PASSWORD}@cluster0.k9fdy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
    }

    connectToMongoDBLocal() {
        return mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
    }
}


module.exports = Connection;