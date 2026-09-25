import mongoose from "mongoose";

// Connect the app to the database (MongoDB)
async function connect() {
  // 127.0.0.1 = the computer where MongoDB is running (localhost)
  // 27017     = MongoDB's default port
  // shopping  = the name of the database
  // running on your local MongoDB server
  await mongoose.connect("mongodb://127.0.0.1:27017/shopping")
    .then(() => console.log("MongoDB connected"))
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    })
}


// Convert MongoDB format data to JSON format
// Only _id needs to convert JSON format
function convertToObject(doc) {
  doc._id = doc._id.toString()
  return doc
}


const db = { connect, convertToObject }

export default db