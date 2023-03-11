import { EmbedBuilder, AttachmentBuilder, DiscordAPIError } from "discord.js";
import dotenv from 'dotenv';
dotenv.config();

export function ping(message) {
    message.reply("pong!")
};

export async function reactionRoles(client){
    const roleChannel = process.env.ROLESCH;
    const roleEmbedID = process.env.ROLESID;

    const wBRole = process.env.WBROLE;
    const fBRole = process.env.FBROLE;
    const cBRole = process.env.CBROLE;
    const guildRole = process.env.GROLE;

    const wBEmoji = '🔥';
    const fBEmoji = '👿';
    const cBEmoji = '🌀';
    const guildEmoji = '🏰';

    const heRole = process.env.HEROLE;
    const sheRole = process.env.SHEROLE;
    const theyRole = process.env.THEYROLE;
    const xeRole = process.env.XEROLE;
    const anyRole = process.env.ANYROLE;

    const heEmoji = '🧡';
    const sheEmoji = '💛';
    const theyEmoji = '💚';
    const xeEmoji = '💙';
    const anyEmoji = '🤍';

    const roleEmbed = new EmbedBuilder()
        .setColor(0xfcd626)
        .setTitle("Opt-in Notification Roles")
        .setThumbnail('https://static.wikia.nocookie.net/ninokuni/images/6/64/PlayerNiW.png/revision/latest?cb=20210618123349')
        .setDescription("React to get your desired role!\n\n🔥  World Boss\n👿  Field Bosses\n🌀  Chaos Bosses\n🏰  Kingdom Events")
        .addFields({ name: 'Note:', value: 'If you are a guild member, absolutely subscribe to Guild Events notifications!' });

    const pronEmbed = new EmbedBuilder()
        .setColor(0xfd5ce0)
        .setTitle("Pronouns")
        .setThumbnail('https://static.wikia.nocookie.net/ninokuni/images/6/64/PlayerNiW.png/revision/latest?cb=20210618123349')
        .setDescription("Let us know how we should refer to you!\n\n🧡 He/Him\n💛 She/Her\n💚 They/Them\n💙 Xe/Xem\n🤍 Any Pronouns");

    try {
        await client.channels.cache.get(roleChannel).messages.fetch(roleEmbedID);
        console.log('Embed exists!');
    } catch (DiscordAPIError) {
        console.error('No embed exists!', DiscordAPIError);
        await client.channels.cache.get(roleChannel).send('@everyone');
        let embed1 = await client.channels.cache.get(roleChannel).send({embeds: [roleEmbed]});
        embed1.react(wBEmoji);
        embed1.react(fBEmoji);
        embed1.react(cBEmoji);
        embed1.react(guildEmoji);
        let embed2 = await client.channels.cache.get(roleChannel).send({embeds: [pronEmbed]});
        embed2.react(heEmoji);
        embed2.react(sheEmoji);
        embed2.react(theyEmoji);
        embed2.react(xeEmoji);
        embed2.react(anyEmoji);
    }
    
    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id === roleChannel){
            if (reaction.emoji.name === wBEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.add(wBRole);
            }
            if (reaction.emoji.name === fBEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.add(fBRole);
            }
            if (reaction.emoji.name === cBEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.add(cBRole);
            }
            if (reaction.emoji.name === guildEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.add(guildRole);
            }
            if (reaction.emoji.name === heEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.add(heRole);
            }
            if (reaction.emoji.name === sheEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.add(sheRole);
            }
            if (reaction.emoji.name === theyEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.add(theyRole);
            }
            if (reaction.emoji.name === xeEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.add(xeRole);
            }
            if (reaction.emoji.name === anyEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.add(anyRole);
            }
        }
        else {
            return;  
        }
    });

    client.on('messageReactionRemove', async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id === roleChannel){
            if (reaction.emoji.name === wBEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.remove(wBRole);
            }
            if (reaction.emoji.name === fBEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.remove(fBRole);
            }
            if (reaction.emoji.name === cBEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.remove(cBRole);
            }
            if (reaction.emoji.name === guildEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.remove(guildRole);
            }
            if (reaction.emoji.name === heEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.remove(heRole);
            }
            if (reaction.emoji.name === sheEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.remove(sheRole);
            }
            if (reaction.emoji.name === theyEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.remove(theyRole);
            }
            if (reaction.emoji.name === xeEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.remove(xeRole);
            }
            if (reaction.emoji.name === anyEmoji){
                await reaction.message.guild.members.cache.get(user.id).roles.remove(anyRole);
            }
        }
        else {
            return;  
        }
    });
};

export async function worldBoss(client){
    const notiChannel = process.env.BOTCH;
    const wBRole = process.env.WBROLE;
    await client.channels.cache.get(notiChannel).send("<@&" + wBRole + ">");

    const mite = new AttachmentBuilder('./images/Mite.png');
    const ardor = new AttachmentBuilder('./images/Ardor.jpg');
    const wBEmbed = new EmbedBuilder()
        .setColor(0xf1973e)
        .setTitle('🔥  World Boss  🔥')
        .setThumbnail('attachment://Mite.png')
        .setDescription("World Boss Description")
        .setImage('attachment://Ardor.jpg');

    await client.channels.cache.get(notiChannel).send({embeds: [wBEmbed], files: [mite, ardor]})
};

export async function fieldBoss(client){
    const notiChannel = process.env.BOTCH;
    const fBRole = process.env.FBROLE;
    await client.channels.cache.get(notiChannel).send("<@&" + fBRole + ">");

    const mite = new AttachmentBuilder('./images/Mite.png')
    const boss = new AttachmentBuilder('./images/FieldBoss.jpg');
    const fBEmbed = new EmbedBuilder()
        .setColor(0xe12727)
        .setTitle('👿  Field Bosses  👿')
        .setThumbnail('attachment://Mite.png')
        .setDescription("Field Boss Description")
        .setImage('attachment://FieldBoss.jpg');

    await client.channels.cache.get(notiChannel).send({embeds: [fBEmbed], files: [mite, boss]})
};

export async function chaosBoss(client){
    const notiChannel = process.env.BOTCH;
    const cBRole = process.env.CBROLE;
    await client.channels.cache.get(notiChannel).send("<@&" + cBRole + ">");

    const mite = new AttachmentBuilder('./images/Mite.png');
    const cBEmbed = new EmbedBuilder()
        .setColor(0xb017a5)
        .setTitle('🌀  Chaos Bosses  🌀')
        .setThumbnail('attachment://Mite.png')
        .setDescription("Chaos Boss Description")
        .setImage('https://static.bandainamcoent.eu/high/ni-no-kuni/ni-no-kuni-2/03-news/nnk2-dlc2_announcement.jpg');

    await client.channels.cache.get(notiChannel).send({embeds: [cBEmbed], files: [mite]})
};

export async function guildEvent(client){
    const notiChannel = process.env.GCH;
    const guildRole = process.env.GROLE;
    await client.channels.cache.get(notiChannel).send("<@&" + guildRole + "> \nEvents start in an hour!\nLet us know if you're coming with a reaction!");

    const yesEmoji = '✅';
    const noEmoji = '❌';
    const pic = new AttachmentBuilder('./images/TheWitch.jpg');
    const guildEmbed = new EmbedBuilder()
        .setColor(0x661E8D)
        .setTitle('🏰  Guild Defense  🏰')
        .setURL('https://www.youtube.com/watch?v=rXiaa8lfFNc')
        .setThumbnail('https://media.discordapp.net/attachments/958239032150720522/1004574062963589120/987f4be686ae755e.png?width=814&height=603')
        .setDescription('Guild Defense Description')
        .addFields({ name: 'Rules:', value: '1. Rule 1\n2. Rule 2\n3. Rule 3\n4. Rule 4' })
        .setImage('https://img.gamerjournalist.com/spai/w_728+q_lossy+ret_img+to_webp/https://cdn.gamerjournalist.com/primary/2022/05/ni_no_kuni_invasion.jpg')
        .setFooter({ text: "💬 Click the title for a basic tutorial!", iconURL: 'attachment://TheWitch.jpg' });
    
    const dunEmbed = new EmbedBuilder()
        .setColor(0x119E50)
        .setTitle('🏰  Guild Dungeons  🏰')
        .setThumbnail('https://media.discordapp.net/attachments/958239032150720522/1004574062963589120/987f4be686ae755e.png?width=814&height=603')
        .setDescription("Guild Dungeoons Description")
        .addFields(
            { name: 'Dungeon 1 Rules:', value: '1. Rule 1\n2. Rule 2\n3. Rule 3' },
            { name: 'Dungeon 2 Rules:', value: '1. Rule 1\n2. Rule 2' })
        .setImage('https://gamerswiki.net/wp-content/uploads/2022/06/Ni-no-Kuni-Cross-Worlds-Kingdom-Dungeon.jpg');    
    
    let embed1 = await client.channels.cache.get(notiChannel).send({embeds: [guildEmbed], files: [pic]});
    embed1.react(yesEmoji);
    embed1.react(noEmoji);
    let embed2 = await client.channels.cache.get(notiChannel).send({embeds: [dunEmbed]});
    embed2.react(yesEmoji);
    embed2.react(noEmoji);
};

export async function raffle(client) {
    const rafChannel = process.env.RAFCH;
    const memberRole = process.env.MEMBERROLE;
    await client.channels.cache.get(rafChannel).send("<@&" + memberRole + ">");

    const yesEmoji = '✅';
    const raffleEmbed = new EmbedBuilder()
        .setColor(0x435c4f)
        .setTitle('🐺  Raffle  🐺')
        .setThumbnail('https://static.wikia.nocookie.net/ninokuni/images/6/64/PlayerNiW.png/revision/latest?cb=20210618123349')
        .setDescription('Raffle Description')
        .addFields({ name: 'Raffle Rules:', value: "1. Rule 1\n2. Rule 2" });

    let embed1 = await client.channels.cache.get(rafChannel).send({embeds: [raffleEmbed]});
    embed1.react(yesEmoji)
}