const { User, Thought } = require("../models");

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // get one user
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "user not found" })
          : res.json(user)
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
