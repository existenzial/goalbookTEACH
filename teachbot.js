const Twit = require('twit');
const Pandorabot = require('pb-node');
const { pandoraOptions, twitOptions } = require('./credentials');

const bot = new Pandorabot( pandoraOptions );
const T = new Twit( twitOptions );

// Pandorabot Params
const talkParams = {
   client_name: bot,
   user_key: pandoraOptions.user_key,
   input: '',
   trace: false,
   recent: false
};

// GET to 'search/tweets' for Top 10 Goalbook Tweets
let topTenGoalbookTweets = { q: 'goalbook', count: 10 };
const getGoalbookTweets = (err, data, res) => {
  let tweets = data.statuses;
  for (let i = 0; i < tweets.length; i++) {
    let tweet = tweets[i].text;
    console.log( tweet );
  }
}
const getTopTenTweets = () => {
  T.get( 'search/tweets', topTenGoalbookTweets, getGoalbookTweets );
}

// GET to 'direct_messages' to use most recent DM as bot input
let goalbookTEACHDMParams = { include_entities: false, skip_statuses: true };
const goalbookDMBotTalk = (err, data, res) => {
  let messages = data;
  let mostRecentMessage = messages[0].text;
  talkParams.input = mostRecentMessage;

  console.log( talkParams.input ); //user input
  bot.talk( talkParams, (err, res) => {
    if (!err) { console.log( res.responses[0] ); } //bot response to user input
  });
}

const pollDMs = () => {
  T.get( 'direct_messages', goalbookTEACHDMParams, goalbookDMBotTalk );
}

pollDMs();