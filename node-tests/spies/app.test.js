const expect = require("expect");
const rewire = require("rewire");

const app = rewire("./app");
describe("App", () => {
  const db = {
    saveUser: expect.createSpy()
  };

  app.__set__('db', db);

  it("Should call the spy correctly", () => {
    const spy = expect.createSpy();
    spy();
    expect(spy).toHaveBeenCalled();
  });

  it("Should call saveUser with user object", () => {
    const email = "abcd@example.com"
    const password = "123456";

    app.handleSignUp(email, password);
    expect(db.saveUser).toHaveBeenCalledWith({email, password});
  })
})