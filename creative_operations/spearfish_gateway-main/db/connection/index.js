'use strict'

const { connect, mongoose } = require('mongoose');
const createDefaultCategories = require('../setup/createDefaultCategories');

class DBConnection {
    constructor(args) {
        this.uri = process.env.DB_URI;
        this.args = {
            autoIndex: false, // Don't build indexes
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ...args
        };
        this.connection = this.establishConnection();
    }

    /**
     * @method establishConnection
     * @description connect to the mongo db database
     * @returns {*} connection to the database
     */
    establishConnection() {
        connect(this.uri, this.args);
        return mongoose.connection
    }

    handleCallBacks() {
        this.connection.on("open", () => console.log("mongoose is connected"))
            .on("close", () => console.log("mongoose is disconnected"))
            .on("error", (error) => console.log(error))
    }

    async setUpDefaultCategories() {
        await createDefaultCategories();
    }
}

module.exports = DBConnection;
