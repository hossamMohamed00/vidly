const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false, // because it's deprecated
})
.then(() => console.log('Connected to the database successfully!'))
.catch(err =>console.error('Could not connect to the database!'))