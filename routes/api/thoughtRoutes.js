const router = require("express").Router();

//actions user should be able to perform
const {
  createThought,
  updateThought,
  deleteThought,
  getOneThought,
  getAllThoughts,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// api routes for Thoughts
router.route("/").post(createThought).delete(deleteThought).get(getAllThoughts);

// api routes for Thoughts by id
router.route("/:thoughtId").put(updateThought).get(getOneThought);

// api routes for Reactions
// the router auto-formats this way whenever I save for some reason
router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(deleteReaction);

module.exports = router;
