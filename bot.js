const { Client, Collection } = require("discord.js");
const Discord = require('discord.js');
const emoji = require('./botconfig/emoji.json')

const client = new Client();
require('discord-buttons')(client);
const chalk = require("chalk");
const fs = require("fs");

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Worls')
})

app.listen(port, () => {
  console.log(`App listening to ${port}`)
})

client.commands = new Collection();

fs.readdir(__dirname + "/botcmd/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let event = require(__dirname + "/botcmd/events/" + file);
        let eventName = file.split(".")[0];
        console.log(
            chalk.blue.bold("Loading event ") + chalk.magenta.bold(`"${eventName}"`)
        );
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir(__dirname + "/botcmd/commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(__dirname + "/botcmd/commands/" + file);
        let commandName = file.split(".")[0];
        console.log(
            chalk.blue.bold("Loading command ") + chalk.red.bold(`"${commandName}"`)
        );
        client.commands.set(commandName, props);
    });
});

client.on('guildCreate', guild => {
   const botownerid = "447768651643486208";
   const botownerid2 = "447768651643486208";
   const serverjoinch = client.channels.cache.get("765654108820209694")
   //const botownerfix = client.users.fetch(botownerid);
   const botowner = client.users.cache.get("447768651643486208");
   const botowner2 = client.users.cache.get("447768651643486208");
   if(!botowner) console.log("Cannot find bot owner, please add one!")
   console.log(botowner)
    const join = new Discord.MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true }) || null)
    .setTitle(`Hi, Thanks For Inviting Ticket Bot in, ${guild.name}`)
    .setDescription("We've Looked Around And Found That We Don't Quite Have All The Permissions We Need To Function Properly Though. To Fix This So You Can Properly Use The Bot, A Link's Been Generated Which Will Give All The Relevent Permissions To The Bot\n\n")
    .setFooter("Thanks For Using Me!")
    .setColor("RANDOM")
    .setTimestamp();
    const ownerembed = new Discord.MessageEmbed()
    .setTitle(`${emoji.join} Joined A New Server | ${guild.name}`)
    .setDescription(`${emoji.members} **${guild.name}** | (\`${guild.id}\`)`)
    .setThumbnail(guild.iconURL({ dynamic: true }) || null)
    .addField("> Server Owner", `> ${emoji.dot} ${guild.owner}`)
    .addField("> Membercount", `> ${emoji.dot} ${guild.memberCount}`)
    .addField("> Server Bot Is In", `> ${emoji.dot} ${client.guilds.cache.size}`)
    .addField(`${emoji.leave} Get Bot Out Of There -`, `\`\`\`leaveserver ${guild.id}\`\`\``)
    .setFooter("Thanks For Using Me!")
    .setColor("RANDOM")
    .setTimestamp()
  try {
  botowner.send(ownerembed)
  botowner2.send(ownerembed)
  serverjoinch.send(ownerembed)
  } catch(err) {
    return;
  }
})
///////////////////////////////////////////
client.on('guildDelete', guild => {
  const owneridforleave = '447768651643486208';
  const owneridforleave2 = "447768651643486208";
  const serverleavech = client.channels.cache.get("765654108820209694")
  const botownerforleave = client.users.cache.get(owneridforleave);
  const botownerforleave2 = client.users.cache.get(owneridforleave2);
  const leaveembed = new Discord.MessageEmbed()
    .setTitle(`${emoji.leave} Left a Guild | ${guild.name}`)
    .setDescription(`${emoji.members} **${guild.name}** | (\`${guild.id}\`)`)
    .setThumbnail(guild.iconURL({ dynamic: true }) || null)
    .addField("> Server Owner", `> ${emoji.dot}  ${guild.owner}`)
    .addField("> MemberCount", `> ${emoji.dot} ${guild.memberCount}`)
    .addField("> Server Bot Is In", `> ${emoji.dot} ${client.guilds.cache.size}`)
    .setColor("RANDOM")
    .setTimestamp()
  try{
    //console.log(botownerforleave)
    botownerforleave.send(leaveembed)
    botownerforleave2.send(leaveembed)
    serverleavech.send(leaveembed)
  } catch (err) {
    return;
  }
});

client.login(require("./config/bot").token).catch(err => console.log(chalk.red.bold(err)))
require("http").createServer((_, res) => res.end("MADE BY POWER DZ#0303\n\nDONT REMOVE CREDITS")).listen(8080)


