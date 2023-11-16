const {
  addCourse,
  readCourses,
  readCourseByID,
  readCourseByName,
  readCourseByTeacher,
  updateCourse,
  removeCourse,
} = require("../../pkg/courses");

const {
  coursePost,
  coursePatch,
  validate,
} = require("../../pkg/courses/validate");

const createCourseHandler = async (req, res) => {
  try {
    await validate(req.body, coursePost);
    if (!req.auth.id) {
      return res.status(401).send("Unauthorized");
    }
    const course = await addCourse(req.body);
    return res.status(201).send(course);
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).send("internal server error");
  }
};

const listCoursesHandler = async (req, res) => {
  try {
    const courses = await readCourses();
    return res.status(200).send(courses);
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).send("internal server error");
  }
};

// const listCourseByIDHandler = async (req, res) => {
//   try {
//     const course = await readCourseByID(req.query.id);
//     return res.status(200).send(course);
//   } catch (err) {
//     console.log(err);
//     res.status(err.code || 500).send("internal server error");
//   }
// };

// const listCoursesByNameHandler = async (req, res) => {
//   try {
//     const courses = await readCourseByName(req.query.name);
//     return res.status(200).send(courses);
//   } catch (err) {
//     console.log(err);
//     res.status(err.code || 500).send("internal server error");
//   }
// };

// const listCoursesByTeacherHandler = async (req, res) => {
//   try {
//     const courses = await readCourseByTeacher(req.query.teacher);
//     return res.status(200).send(courses);
//   } catch (err) {
//     console.log(err);
//     res.status(err.code || 500).send("internal server error");
//   }
// };

const updateCourseHandler = async (req, res) => {
  try {
    await validate(req.body, coursePatch);
    if (!req.auth.id) {
      return res.status(401).send("Unauthorized");
    }
    await updateCourse(req.params.id, req.body);
    return res.status(204).send("updated");
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).send("internal server error");
  }
};

const deleteCourseHandler = async (req, res) => {
  try {
    if (!req.auth.id) {
      return res.status(401).send("Unauthorized");
    }
    await removeCourse(req.params.id);
    return res.status(201).send("deleted");
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).send("internal server error");
  }
};

module.exports = {
  createCourseHandler,
  //   listCourseByIDHandler,
  //   listCoursesByNameHandler,
  //   listCoursesByTeacherHandler,
  listCoursesHandler,
  updateCourseHandler,
  deleteCourseHandler,
};
