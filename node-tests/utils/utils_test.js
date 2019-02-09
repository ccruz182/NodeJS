const expect = require("expect");

const utils = require("./utils");

it ("Should add two numbers", () => {
  const res = utils.add(33, 11);
  
  expect(res).toBe(44).toBeA('number');
});

it ("Should return the square of a number", () => {
  const res = utils.square(3);

  expect(res).toBe(9).toBeA('number');
});

it ("Should expect some values", () => {
  // expect({age: 15}).toEqual({age: 15});
  // expect([2, 3, 4]).toInclude(2);
  expect({name: "Cesar"}).toInclude({name: "Cesar"})
});

it ("Should fragment a name", () => {
  const test_obj = {} ;
  const test_name = utils.setName(test_obj, "Cesar Cruz");

  expect(test_name).toEqual({firstName: "Cesar", lastName: "Cruz"});
});