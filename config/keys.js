DB_Local = "mongodb://localhost:27017/rent-car-app";
DB_Atlas =
  "mongodb+srv://safwantaleb:JDQ7$BE*Uzd_5SR@karhebti-bd.s39he.mongodb.net/Karhbti-app?retryWrites=true&w=majority";
module.exports = {
  // mongoURI: DB_Local, // Local DB
  mongoURI: DB_Atlas,      // Cloud DB
};