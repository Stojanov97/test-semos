const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  classesNo: String,
  teacher: String,
  book: String,
});

const Course = mongoose.model("Course", courseSchema, "courses");

const addCourse = async (course) => {
  try {
    const newCourse = new Course(course);
    return await newCourse.save();
  } catch (err) {
    throw new Error(err);
  }
};

const readCourses = async () => {
  try {
    return await Course.find();
  } catch (err) {
    throw new Error(err);
  }
};

// const readCourseByName = async (name) => {
//   try {
//     return await Course.find({ name: name });
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// const readCourseByID = async (id) => {
//   try {
//     return await Course.find({ _id: id });
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// const readCourseByTeacher = async (teacher) => {
//   try {
//     return await Course.find({ teacher: teacher });
//   } catch (err) {
//     throw new Error(err);
//   }
// };

const updateCourse = async (id, newData) => {
  try {
    return await Course.updateOne({ _id: id }, newData);
  } catch (err) {
    throw new Error(err);
  }
};

const removeCourse = async (id) => {
  try {
    return await Course.deleteOne({ _id: id });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  addCourse,
  readCourses,
  // readCourseByID,
  // readCourseByName,
  // readCourseByTeacher,
  updateCourse,
  removeCourse,
};
