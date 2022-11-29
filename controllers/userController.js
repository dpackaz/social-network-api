const { User, Thought } = require("../models");

module.exports = {
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // update an existing user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }.then((user) => {
        user
          ? res.json(user)
          : res.status(404).json({ message: "user not found" });
      })
    );
  },
  // delete an existing user
  deleteUser(req, res) {
    User.findOneAndDelete(
      { _id: req.params.userId }.then((user) => {
        if (!user) {
          res.status(404).json({ message: "user not found" });
          return;
        } else {
          Thought.deleteMany({
            _id: {
              $in: user.thoughts,
            },
          });
        }
      })
    );
  },
  // get one user
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) => {
        !user
          ? res.status(404).json({ message: "user not found" })
          : res.json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
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
};
