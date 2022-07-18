const router = require("express").Router();

const characterController = require("./character.controller");
const authMiddleware = require("../auth/auth.middleware");

router.post("/create", authMiddleware, characterController.createCharacterController);

module.exports = router;