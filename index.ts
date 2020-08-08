import env from "dotenv";
import Discord from "discord.js";
import * as utils from "./utilities";

env.config();
const token: string = <string>process.env.TOKEN;
const bot: Discord.Client = new Discord.Client();

bot.on("ready", () => console.log("Logged in!"));
bot.on("message", (message) => {
    if (message.author.bot) return;
    const content: string = message.content;
    let words = content.replace(/\s+/g, " ").split(" ");
    switch (words[0]) {
        case "!sparklize":
            utils.deleteMessage(message);
            utils.sendMessage(
                message.channel,
                content.replace(/!sparklize\s+/, ""),
            );
            break;
    }
});

bot.login(token);
