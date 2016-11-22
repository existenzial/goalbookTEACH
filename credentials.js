module.exports.pandoraOptions = {
  url: 'https://aiaas.pandorabots.com',
  app_id: process.env.TEACHBOT_APP_ID,
  user_key: process.env.TEACHBOT_USER_KEY,
  botname: process.env.TEACHBOT_NAME
};

module.exports.twitOptions = {
  consumer_key: `${ process.env.TWIT_CONSUMER_KEY }`,
  consumer_secret: `${ process.env.TWIT_CONSUMER_SECRET }`,
  access_token: `${ process.env.TWIT_ACCESS_TOKEN }`,
  access_token_secret: `${ process.env.TWIT_ACCESS_TOKEN_SECRET }`
};
