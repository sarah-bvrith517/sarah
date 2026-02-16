INDEX.JS
(with  mongoose)


const express = require("express");
const mongoose = require("mongoose");

const app = express();
const studentRoutes = require("./routers");

// Middleware
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api", studentRoutes);

// Start Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

(without mongoose-using mongodb)

const express = require("express");
const { connectDB } = require("./db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/students", studentRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

CONTROLLERS.JS
WITH MONGOOSEEEE


const Student = require("./models");

// CREATE
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ ALL
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

WITHOUT MONGOOSE
const { ObjectId } = require("mongodb");
const { getDB } = require("../db");

// CREATE
exports.createStudent = async (req, res) => {
  const db = getDB();
  const result = await db.collection("students").insertOne(req.body);
  res.status(201).json(result);
};

// READ ALL
exports.getStudents = async (req, res) => {
  const db = getDB();
  const students = await db.collection("students").find().toArray();
  res.json(students);
};

// UPDATE
exports.updateStudent = async (req, res) => {
  const db = getDB();
  const result = await db.collection("students").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json(result);
};

// DELETE
exports.deleteStudent = async (req, res) => {
  const db = getDB();
  const result = await db.collection("students").deleteOne({
    _id: new ObjectId(req.params.id)
  });
  res.json(result);
};

ROUTERS.JS
WITH MONGOOSE

const express = require("express");
const router = express.Router();

const {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent
} = require("./controllers");

router.post("/students", createStudent);
router.get("/students", getStudents);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

module.exports = router;

WITHOUT MONGOOSE

const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.post("/", studentController.createStudent);
router.get("/", studentController.getStudents);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;

MODELS.JS(WITH MONGOOSE)
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

DB.JS(WITHHOUT MONGOOSE)
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

async function connectDB() {
  await client.connect();
  db = client.db("studentdb");
  console.log("MongoDB Connected");
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };


USER DETAILLLLLLLLL]

models.js
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Student = mongoose.model("Student", studentSchema);
const User = mongoose.model("User", userSchema);

controllers.js

exports.signup = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};

exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user || user.password !== req.body.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful" });
};

routers.js:

const express = require("express");
const router = express.Router();
const controller = require("./controllers");

router.post("/students", controller.addStudent);
router.get("/students", controller.getStudents);
router.get("/students/year3", controller.getThirdYear);
router.put("/students/:id", controller.updateStudent);
router.delete("/students/:id", controller.deleteStudent);

router.post("/signup", controller.signup);
router.post("/login", controller.login);

module.exports = router;


THUNDER CLIENT 

thunderclient 
http://localhost:3000/api/students
ybodyyy
{
  "name": "Afia",
  "rollNo": "23CS101",
  "department": "CSE",
  "year": 3
}
