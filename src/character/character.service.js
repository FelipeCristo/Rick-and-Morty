const Character = require("./Character");

const createCharacterService = (name, imageUrl, userId) =>
  Character.create({ name, imageUrl, user: userId });

const findAllCharactersService = (offset,limit) =>
  Character.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

  const countCharacter = () => Character.countDocuments();

const searchCharacterService = (name) =>
  Character.find({name: { $regex: `${name || ""}`, $options: "i" },}).sort({ _id: -1 }).populate("user");


  module.exports = { createCharacterService, findAllCharactersService, searchCharacterService,countCharacter };
