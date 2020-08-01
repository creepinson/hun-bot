import Discord from "discord.js";

const sparklesExp:RegExp = new RegExp([
    /hun/,
    /(?:essential\s+)?oils/,
    /essential/
].map(s=>`(?:${String(s).slice(1,-1)})`).join('|'), "gi")

export const sparklize = (s:string):string =>
    s.replace(sparklesExp,":sparkles:$&:sparkles:");

export const reply = (message:Discord.Message,reply:string):Promise<Discord.Message> =>
    message.reply(sparklize(reply));

export const sendMessage = (
        channel:Discord.TextChannel | Discord.DMChannel | Discord.NewsChannel,
        message:string
    ):Promise<Discord.Message> =>
        channel.send(sparklize(message));

export const deleteMessage = (
        message:Discord.Message
    ):Promise<Discord.Message> | void =>
        message.deletable?message.delete():undefined