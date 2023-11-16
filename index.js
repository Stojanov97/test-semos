const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const { get } = require("./pkg/config");
const PORT = get("PORT");
const SECRET = get("SECRET");
require("./pkg/database");
const {
  createCourseHandler,
  listCoursesHandler,
  updateCourseHandler,
  deleteCourseHandler,
} = require("./handlers/courses");

const service = express();

service.use(express.json());
service.use(express.urlencoded({ extended: false }));
service.use(
  jwt({ secret: SECRET, algorithms: ["HS256"] }).unless({
    path: ["/api/v1/courses/list"],
  })
);

service.post("/api/v1/courses/add", createCourseHandler);
service.get("/api/v1/courses/list", listCoursesHandler);
service.patch("/api/v1/courses/edit/:id", updateCourseHandler);
service.delete("/api/v1/courses/remove/:id", deleteCourseHandler);

service.listen(PORT || 8001, (err) => {
  err ? console.log(err) : console.log("up and running on " + PORT || 8001);
});
