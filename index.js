const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl = require('ytdl-core');

const token = "bottoken";
bot.login(token);
var mensagem = [];

bot.on('ready', () => {
    console.log('PRONTO')
})

bot.on('message', msg => {
    if(msg.author.bot) {
        return;
    }
    mensagem = msg.content.split(" ");
    toca(mensagem, msg);
    setInterval(toca, intervalo(mensagem[2],mensagem[3])*1000, mensagem, msg);
})

function seconds(text){
    var segundos = 0;
    var tempo = text.split(":");
    segundos += parseInt(tempo[0]) * 60;
    segundos += parseInt(tempo[1]);
    return segundos;
}

function intervalo(sec1, sec2){
    var seg1 = seconds(sec1);
    var seg2 = seconds(sec2);
    var intval = seg2 - seg1;
    return intval+1;
}

function toca(mensagem, msg){
    if(mensagem[0].toLowerCase() == '?play') {
        let VoiceChannel = msg.guild.channels.cache.find(channel => channel.id == 'channelid');
        if(VoiceChannel == null){
            console.log('Canal não foi encontrado');
        }

        if(VoiceChannel != null){
            console.log('Canal Foi encontrado');
            VoiceChannel.join()
            .then(connection => {
                const stream = ytdl(mensagem[1],{filter:'audioonly'});
                const streamOption = {seek: seconds(mensagem[2]), volume: 1};
                const DJ = connection.play(stream, streamOption);
            })
            .catch(console.error);
        }
    } else if(msg.content.toLowerCase() == "?stop"){
        let VoiceChannel = msg.guild.channels.cache.find(channel => channel.id == '530938726071664654');
        VoiceChannel.leave();
    }
}