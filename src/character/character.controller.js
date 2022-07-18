const characterService = require("./character.service");

const createCharacterController = async (req, res) => {
  try {
    const { name,imageUrl } = req.body;

    if (!name || !imageUrl) {
      res.status(400).send({
        message: "Envie todos os dados necessário para a criação do character",
      });
    }

    const { id } = await characterService.createCharacterService(name,imageUrl, req.userId);

    return res.send({
      message: "Character criado com sucesso!",
      character: { id, name,imageUrl },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {createCharacterController}