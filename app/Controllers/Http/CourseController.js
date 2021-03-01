"use strict";
const Course = use("App/Models/Course");

class CourseController {
  async store({ request }) {
    const dataToCreate = request.only(["name", "description", "url", "price"]);

    return await Course.create(dataToCreate);
  }
}

module.exports = CourseController;
