const router = require("express").Router();

//actions user should be able to perform
const {
  createUser,
  updateUser,
  deleteUser,
  getOneUser,
  getUsers,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// api routes for Users
router.route("/").post(createUser).get(getUsers);

// api routes for User by id
router.route("/:userId").put(updateUser).delete(deleteUser).get(getOneUser);

// api routes for Friend
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
