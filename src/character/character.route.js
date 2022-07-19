const router = require("express").Router();

const characterController = require("./character.controller");
const authMiddleware = require("../auth/auth.middleware");

router.post("/create", authMiddleware, characterController.createCharacterController);
router.get("/", authMiddleware,characterController.findAllCharactersController)
router.get('/search',authMiddleware,characterController.searchCharacterController,);

module.exports = router;