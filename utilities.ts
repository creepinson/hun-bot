import Discord from "discord.js";

const sparklesExp:RegExp = (()=>{
    type NDArray<T> = (NDArray<T>|T)[];

    const orExp = (...exps:NDArray<RegExp>):RegExp =>
        new RegExp(`(?:${exps.flat(Infinity).map(exp=>String(exp).slice(1,-1)).join('|')})`);

    const joinExp = (...exps:NDArray<RegExp>):RegExp =>
        new RegExp(exps.flat(Infinity).map(exp=>String(exp).slice(1,-1)).join(''));

    const hashtags = [
        /boss\s+babe/,
        /own\s+boss/,
        /self\s+owned\s+company/,
        /multilevel\s+marketing/
    ];
    
    return new RegExp(String(orExp(
        /hun/,
        /(?:essential\s+)?oils/,
        /essential/,
        joinExp(/(?:cures?\s+)?/, orExp(
            /cancer/,
            /homosexuality/,
            /inferior\s+(?:Australian)?\s+ethnicity/,
            /inferior\s+sex(?:\s+or\s+non-bin(?:ary)?)?/,
            /non-bin(?:ary)?/
        )),
        joinExp(/#?/, orExp(hashtags.map(exp=>new RegExp(String(exp).slice(1,-1).replace(/\\s\+/,"")))))
    )).slice(1,-1), "gi")}
)();

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