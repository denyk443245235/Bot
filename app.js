var TelegramBot = require('node-telegram-bot-api');
var Mongo = require('./MongoDb');
// var Messages = [];






var token = '978285154:AAG_f3AieodmDAZRIFsNhIGVl-QFtkV4Aa0';
var bot = new TelegramBot(token, { polling: true });
bot.on('message', function (msg, match) {
    fromId = msg.from.id; // Получаем ID отправителя


    var resp = match[1]; // Получаем текст после /echo


    bot.sendMessage(fromId, 'Виберіть день тиждня', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Понеділок',
                        callback_data: 'Monday'
                    },
                    {
                        text: 'Вівторок',
                        callback_data: 'Tuesday'
                    },
                    {
                        text: 'Середа',
                        callback_data: 'Wednesday'
                    },
                    {
                        text: 'Четвер',
                        callback_data: 'Thursday'
                    },
                    {
                        text: 'Пятниця',
                        callback_data: 'Friday'
                    }
                ]
            ]
        }
    })
});
bot.on('callback_query', (query) => {

    let day = query.data;
    let id = query.message.chat.id;
    // Messages.forEach((item,index) => {

    //     bot.deleteMessage(id, item);
    //     Messages.splice(index,1);
    // });

    var mas = [day];
    Mongo.find({ key: day }, (err, result) => {
        result.forEach((item) => {
            var str = `Пара ${item.number} : ${item.para};
                Кабінет : ${item.cabinet}
                Вчитель : ${item.teacher}
                `;
            mas.push(str);

        });
        mas = mas.join(`
       
       `);

        bot.sendMessage(id, mas).then((params) => {
            // Messages.push(params.message_id);
        });
        bot.sendMessage(id, 'Виберіть день тиждня', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Понеділок',
                            callback_data: 'Monday'
                        },
                        {
                            text: 'Вівторок',
                            callback_data: 'Tuesday'
                        },
                        {
                            text: 'Середа',
                            callback_data: 'Wednesday'
                        },
                        {
                            text: 'Четвер',
                            callback_data: 'Thursday'
                        },
                        {
                            text: 'Пятниця',
                            callback_data: 'Friday'
                        }
                    ]
                ]
            }
        })
    })


});
