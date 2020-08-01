import env from "dotenv";
import Discord from "discord.js";

env.config();
const token:string = <string>process.env.TOKEN;
const bot:Discord.Client = new Discord.Client();

const sparklize = (s:string):string =>
    s.replace(/(?:hun)|(?:(?:essential\s+)?oils)|(?:essential)/g,":sparkles:$&:sparkles:");

const reply = (message:Discord.Message,reply:string):Promise<Discord.Message> =>
    message.reply(sparklize(reply));

bot.on("ready", ()=>console.log("Logged in!"));
bot.on("message", message => {
    if (message.author.bot) return;
    const content:string = message.content;
    let words = content.replace(/\s+/g,' ').split(' ');
    switch (words[0]) {
        case "!sparklize":
            reply(message,content.replace(/!sparklize\s+/,""));
            break;
    }
});

bot.login(token);