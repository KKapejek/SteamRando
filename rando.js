const axios = require('axios');
const secretsJson = require("./secrets.json")

async function getGames(){
    const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${secretsJson.apiKey}&steamid=${secretsJson.steamId}&format=json`
    return await axios.get(url)
        .then(res => {
            return res.data.response;
        })
        .catch(err => console.log(err))
}

function getRandomGame(games){
    var count = games.game_count;
    var gameList = games.games;

    var random = Math.floor(Math.random() * count);
    return gameList[random]
}

async function getSelectedGameInfo(appid){
    const url = `https://store.steampowered.com/api/appdetails?appids=${appid}`
    return await axios.get(url)
        .then(res => {
            return res.data[appid].data;
        })
        .catch(err => console.log(err))
}

function display(game){
    console.log(game.name)
    console.log(`https://store.steampowered.com/app/${game.steam_appid}`)
    // console.log(game.detailed_description)
    // console.log(game.categories)
    // console.log(game.genres)
}

async function run(){
    const games = await getGames();
    const selectedGame = getRandomGame(games);
    const selectedGameInfo = await getSelectedGameInfo(selectedGame.appid);
    display(selectedGameInfo)
}

run();