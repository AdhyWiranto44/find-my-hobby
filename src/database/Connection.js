const mongoose = require("mongoose");


class Connection {
    constructor() {
        mongoose.set("useCreateIndex", true);
    }

    connectToMongoDBAtlas() {
        return mongoose.connect(`mongodb+srv://find-my-hobby-admin:${process.env.DB_PASSWORD}@cluster0.k9fdy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});
    }

    connectToMongoDBLocal() {
        return mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});
    }
}


module.exports = Connection;