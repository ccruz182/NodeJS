const expect = require("expect");
const request = require("supertest");

const { app } = require("../server");
const { Todo } = require("../db/models/todo");

describe("POST /todo", () => {
  it("Should create a new todo", done => {
    const text = "Something";

    request(app)
      .post("/todo")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end(done);
  });

  it("Should not create a todo. Incorrect data", done => {
    request(app)
      .post("/todo")
      .send({})
      .expect(400)
      .end(done);
  });
});
