const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({ intents: Object.values(GatewayIntentBits).filter(x => typeof x === "string"), partials: Object.values(Partials).filter(x => typeof x === "string")});
const { token } = require("./src/base/settings.json");

require("./src/base/app.js")(client)

client.login(token);
