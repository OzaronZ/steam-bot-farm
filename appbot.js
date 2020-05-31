// Modified by Ozaron
// for Heroku

const config = require('./config.json');

const SteamUser = require('steam-user'),
    SteamTopt = require('steam-totp'),
    SteamCommunity = require('steamcommunity'),
    TradeOfferManager = require('steam-tradeoffer-manager');

const client = new SteamUser(),
    community = new SteamCommunity();
const manager = new TradeOfferManager({
    steam: client,
    community: community,
    language: 'en'
});

const logOnOptions = {
    accountName: process.env.login,
    password: process.env.password,

    twoFactorCode: SteamTopt.generateAuthCode(process.env.shared),
};

var randomgifs = ["Winter2019BirdPlop", "Winter2019CocoaCheers", "Winter2019SaltShaker", "Winter2019SnowmanGoodbye"];
client.logOn(logOnOptions);

client.on('loggedOn', () => {
    console.log('Successfully logged into Steam!');
    client.setPersona(SteamUser.EPersonaState.Online);
    client.gamesPlayed(config.games);
});

client.on("friendMessage", function(steamID, message) {
    if (message) {
        client.chatMessage(steamID, "Hello, im Ro-Bot-OZ. I cant talk with you now because i'm sleeping. :steambored: Enter a message in comments, thank you.");
		client.chatMessage(steamID, "/sticker ");
		console.log(message);
    }
});

client.on('webSession', (sessionid, cookies) => {
    manager.setCookies(cookies);

    community.setCookies(cookies);
    community.startConfirmationChecker(15000, process.env.identity);
    console.log("Connected with cookies");
});

//  + array[Math.round(Math.random()*(randomgifs.length-1))] 
