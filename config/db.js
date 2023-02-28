const mongoose = require("mongoose")


const connection =mongoose.connect("mongodb+srv://vivek:bhatt@cluster0.5ri9tl1.mongodb.net/mock12?retryWrites=true&w=majority")

module.exports={
    connection
}