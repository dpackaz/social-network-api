const router = require("express").Router();

//actions user should be able to perform
const {
  createThought,
  updateThoughtById,
  deleteThought,
  getThoughtById,
  getAllThoughts,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// api routes for Thoughts
router.route("/").post(createThought).delete(deleteThought).get(getAllThoughts);

// api routes for Thoughts by id
router.route("/:thoughtId").put(updateThoughtById).get(getThoughtById);

// api routes for Reactions
router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(deleteReaction);

module.exports = router;
