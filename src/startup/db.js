const mongoose = require("mongoose");
const logger = require("./logging")();

module.exports = () => {
   mongoose
     .connect(process.env.MONGODB_URL, {
       useUnifiedTopology: true,
       useNewUrlParser: true,
       useCreateIndex: true,
       useFindAndModify: false, // because it's deprecated
     })
     .then(() => logger.info("Connected to the database successfully!"));
     //? Catch ?? -- No because make the app throw an ex and catch it[Logging, terminate the process]  
}