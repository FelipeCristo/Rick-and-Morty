const Character = require("./Character")

const createCharacterService = (name, imageUrl,userId) => Character.create({name, imageUrl, user: userId}); 

module.exports = {createCharacterService} 