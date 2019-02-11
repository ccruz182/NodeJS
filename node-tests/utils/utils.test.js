const expect = require("expect");

const utils = require("./utils");

describe("Utils test", () => {
  describe("# Addition", () => {
    it("Should add two numbers", () => {
      const res = utils.add(33, 11);

      expect(res)
        .toBe(44)
        .toBeA("number");
    });

    it("Async add", done => {
      utils.asyncAdd(4, 3, sum => {
        expect(sum)
          .toBe(7)
          .toBeA("number");
        done();
      });
    });
  });

  describe("# Square", () => {
    it("Should return the square of a number", () => {
      const res = utils.square(3);

      expect(res)
        .toBe(9)
        .toBeA("number");
    });

    it("Async square", done => {
      utils.asyncSquare(4, square => {
        expect(square).toBe(16);
        done();
      });
    });
  });

  describe("# Others", () => {
    it("Should expect some values", () => {
      // expect({age: 15}).toEqual({age: 15});
      // expect([2, 3, 4]).toInclude(2);
      expect({ name: "Cesar" }).toInclude({ name: "Cesar" });
    });

    it("Should fragment a name", () => {
      const test_obj = {};
      const test_name = utils.setName(test_obj, "Cesar Cruz");

      expect(test_name).toEqual({ firstName: "Cesar", lastName: "Cruz" });
    });
  });
});
