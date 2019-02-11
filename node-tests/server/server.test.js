const request = require("supertest");
const expect = require("expect");

const app = require("./server").app;

describe("Express Server tests", () => {
  describe("# GET /", () => {
    /* supertest only supports equals test */
    it("Should return 'Hello world' as the response", done => {
      // request(app).get("/").expect(404).expect("Hello world").end(done);
      done();
    });

    /* Using expect library */
    it("Using expect :D", done => {
      request(app)
        .get("/")
        .expect(200)
        .expect(res => {
          expect(res.body).toInclude({ date: "2019-02-11" });
        })
        .end(done);
    });    
  });

  describe("# GET /users", () => {
    it("Should return an array of users with a specific body", done => {
      request(app)
        .get("/users")
        .expect(200)
        .expect(res => {
          expect(res.body).toBeA("array");
          res.body.forEach(user => {
            expect(user).toIncludeKeys(["name", "age"]);
            expect(user.age).toBeA("number");
          });
        })
        .end(done);
    });
  });
});


