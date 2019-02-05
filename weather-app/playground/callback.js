const getUser = (id, callback) => {
  const user = {
    id: id,
    name: "Cesar"
  };

  callback(user);
};

getUser(31, user => {
  console.log("user", user);
});
