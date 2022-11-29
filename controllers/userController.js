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
  // add Friend to a user
  addFriend(req, res) {
    User.findOne({ _id: req.params.friendId })
      .select("-__v")
      .then((friend) => {
        if (!friend) {
          res.status(404).json({ message: "friend not found" });
        } else {
          User.findOneAndUpdate({ _id: req.params.userId }),
            { $push: { friends: friend } },
            { new: true }.then((user) => {
              user
                ? res.json(user)
                : res.status(404).json({ message: "user not found" });
            });
        }
      });
  },
  // delete Friend from user
  deleteFriend(req, res) {
    User.findOne({ _id: req.params.friendId })
      .select("-__v")
      .then((friend) => {
        if (!friend) {
          res.status(404).json({ message: "friend not found" });
        } else {
          User.updateOne(
            { _id: req.params.userId },
            { $pullAll: { friends: [{ _id: req.params.friendId }] } },
            { new: true }
          ).then((user) => {
            user
              ? res.json(user)
              : res.status(404).json({ message: "user not found" });
          });
        }
      });
  },
};
