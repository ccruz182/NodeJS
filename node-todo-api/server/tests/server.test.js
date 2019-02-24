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

describe("GET /todos", () => {
  it("Should return an array of todo's objects", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body.todos)).toBe(true);
      })
      .end(done);
  });

  it("A object received should have a text property", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        const item = res.body.todos[0];
        expect(item).toHaveProperty("text");
      })
      .end(done);
  });
});

describe("GET /todos/:id", () => {
  const _id = "5c6ee921c1e0a1336c140365";
  const old_id = "5c72c2e841d64e29bc70fa77";
  const bad_id = "743";

  it("Should return an error if the id is not valid", done => {
    request(app)
      .get(`/todos/${bad_id}`)
      .expect(401)
      .end(done);
  });
  
  it("Should return an todo object with the same id", done => {
    request(app)
      .get(`/todos/${_id}`)
      .expect(200)
      .expect(res => {
        const todo_ret = res.body;
        expect(todo_ret._id).toBe(_id);
      })
      .end(done);
  });

  it("Should return an error 404; id valid but is not any more in the db", done => {
    request(app)
      .get(`/todos/${old_id}`)
      .expect(404).end(done);
  });
});
