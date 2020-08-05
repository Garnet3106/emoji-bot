const Discord = require('discord.js');
const client = new Discord.Client();

const token = 'NzQwMzk3NTIzNzAwNjc4Njk4.Xyoa7Q.wTIwOQc2QM5drlH4dFXkUxjs9Rc';
const prefix = 'emoji.';

var latestReceiveMessageID = ''


/* エラーハンドリング */


process.on('uncaughtException', function(error) {
    console.log(error);
});


/* メッセージ受信 */


client.on('message', message => {
    if(message.author.id == client.user.id)
        return;

    if(!message.author.bot && message.content.startsWith(prefix)) {
        command(message);
        return;
    }
});


function command(message) {
    try {
        let cmd = message.content;
        let cmdName = cmd.substring(prefix.length).split(' ')[0].toLowerCase();

        switch(cmdName) {
            case 'help': {
                message.channel.send({
                    embed: {
                        title: 'コマンドヘルプ - 絵文字BOT',
                        fields: [
                            {
                                name: prefix + 'help',
                                value: 'ヘルプメッセージを表示します。'
                            },
                            {
                                name: prefix + 'show',
                                value: 'リアクションされた絵文字を表示します。'
                            }
                        ],
                        footer: {
                            icon_url: client.user.avatarURL(),
                            text: 'Developed by @Garnet3106'
                        }
                    }
                });
            } break;

            case 'show': {
                message.channel.send({
                    embed: {
                        description: 'リアクションを付与してくだい'
                    }
                })
                    .then(receiveMessage => {
                        latestReceiveMessageID = receiveMessage.id;
                    });
            }
        }
    } catch(e) {
        console.log(e);
    }
}


client.on('messageReactionAdd', (reaction, user) => {
    let message = reaction.message;
    let channel = message.channel;
    let emoji = reaction.emoji;

    if(message.id != latestReceiveMessageID)
        return;

    if(emoji.url === null)
        return;

    let embed = {
        description: '[' + emoji.id + '](' + emoji.url + ') (' + reaction.count + ' emojis)',
        image: {
            url: emoji.url
        }
    }

    channel.send({ embed: embed });
});


client.login(token)
    .then(() => {
        console.log('ログインが完了しました。');
    })
    .catch((e) => {
        console.log('ログインに失敗しました。');
    });
