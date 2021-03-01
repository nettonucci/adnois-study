"use strict";
const Course = use("App/Models/Course");

class CourseController {
  async store({ request }) {
    const dataToCreate = request.only(["name", "description", "url", "price"]);

    return await Course.create(dataToCreate);
  }
  async list() {
    return await Course.all();
  }

  async show({ params }) {
    return await Course.find(params.id);
  }
}

module.exports = CourseController;
