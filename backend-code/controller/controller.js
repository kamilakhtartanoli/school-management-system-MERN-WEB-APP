const { Class } = require("../model/class.model.js");
const { Signup } = require("../model/signup.model");
const { Students } = require("../model/Students.model");
const { Teacher } = require("../model/teacher.model.js");

const signup = async (req, res) => {
  try {
    const { name, email, password, profilepic } = req.body;
    const existingemail = await Signup.findOne({ email });
    if (existingemail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newsignup = await Signup.create({
      name,
      email,
      password,
      profilepic,
      role: "admin",
    });

    const token = newsignup.generateToken();

    res.status(200).json({
      message: "signup-successfully",
      token,
      admin: {
        _id: newsignup._id,
        name: newsignup.name,
        email: newsignup.email,
        photo: newsignup.profilepic, // ✅ consistent naming
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Signup.findOne({ email, role: "admin" });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid apassword" });
    }
    const token = user.generateToken();
    res.status(200).json({
      message: "login successfully",
      token,
      role: user.role,
      admin: {
        name: user.name,
        photo: user.profilepic || "",
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const data = async (req, res) => {
  try {
    const find = await Signup.find({});
    res.status(200).json(find);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    await Signup.deleteMany({});
    res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete users", error: error.message });
  }
};

const Sudentroute = async (req, res) => {
  try {
    const students = req.body;
    const createstudent = await Students.insertMany(students);
    res.status(200).json({ createstudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const studentcount = async (req, res) => {
  try {
    const count = await Students.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const studentdata = async (req, res) => {
  try {
    const resp = await Students.find({});
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const studentfee = async (req, res) => {
  try {
    const updatedStudent = await Students.findByIdAndUpdate(
      req.params.id,
    );
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const studentsdelete = async (req, res) => {
  try {
    await Students.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "student-delete-successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Addteacher = async (req, res) => {
  try {
    const { fullname, email, phone, subject } = req.body;
    const teacher = await Teacher.create({
      fullname,
      email,
      phone,
      subject,
    });
    res.status(200).json({ message: "teacher added", teacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const teachercount = async (req, res) => {
  try {
    const count = await Teacher.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const teacherdata = async (req, res) => {
  try {
    const data = await Teacher.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const teacherdelete = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "teacher-deleted-successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchstudent = async (req, res) => {
  try {
    const query = req.query.q; // frontend will send ?q=Ali

    const students = await Students.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // search in name
        { fathername: { $regex: query, $options: "i" } }, // search in fathername
        { studentid: { $regex: query, $options: "i" } }, // search in studentid
      ],
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addclass = async (req, res) => {
  try {
    const { classname, classteacher, section, classroom } = req.body;
    const resp = await Class.create({
      classname,
      classteacher,
      section,
      classroom,
    });
    res.status(200).json({ message: "class-add-successfully", resp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const classcount = async (req, res) => {
  try {
    const count = await Class.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const classdata = async (req, res) => {
  try {
    const data = await Class.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).josn({ message: error.message });
  }
};

const classdelete = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "class-delete-successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  login,
  data,
  deleteAllUsers,
  Sudentroute,
  studentdata,
  studentcount,
  studentfee,
  studentsdelete,
  Addteacher,
  teachercount,
  teacherdata,
  teacherdelete,
  searchstudent,
  addclass,
  classcount,
  classdata,
  classdelete,
};
