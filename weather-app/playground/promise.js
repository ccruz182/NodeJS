const somePromise = new Promise((resolve, reject) => {
  if (11 < 9) {
    resolve("Hey, it worked!");
  } else {
    reject(":c It did not work");
  }
});

const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a + b > 10) {
      resolve("The sum is greater than 10");
    } else {
      reject("The sum is less than 10");
    }
  });
};

somePromise
  .then(response => console.log("R", response))
  .catch(error => console.log("Error", error));

asyncAdd(-4, 6)
  .then(msg => {
    console.log("Then:", msg);
  })
  .catch(msg => {
    console.log("Catch:", msg);
  });
