const characterService = require("./character.service");

const createCharacterController = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;

    if (!name || !imageUrl) {
      res.status(400).send({
        message: "Envie todos os dados necessário para a criação do character",
      });
    }

    const { id } = await characterService.createCharacterService(
      name,
      imageUrl,
      req.userId
    );

    return res.send({
      message: "Character criado com sucesso!",
      character: { id, name, imageUrl },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAllCharactersController = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 8;
    }

    if (!offset) {
      offset = 0;
    }

    const characters = await characterService.findAllCharactersService(
      offset,
      limit
    );

    const total = await characterService.countCharacter();

    const currentUrl = req.baseUrl;
    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (characters.length === 0) {
      return res.status(400).send({ message: "Não existem characters!" });
    }


    return res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,
      results: characters.map((character) => ({
        id: character._id,
        name: character.name,
        imageUrl: character.imageUrl,
        username: character.user.username,
        photo: character.user.photo,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchCharacterController = async (req, res) => {
  const { name } = req.query;

  const characters = await characterService.searchCharacterService(name);

  if (characters.length === 0) {
    return res
      .status(400)
      .send({ message: "Não existem tweets com essa mensagem!" });
  }
  return res.send({
    characters: characters.map((character) => ({
      id: character._id,
      name: character.name,
      imageUrl: character.imageUrl,
      username: character.user.username,
      photo: character.user.photo,
    })),
  });
};

module.exports = {
  createCharacterController,
  findAllCharactersController,
  searchCharacterController,
};
