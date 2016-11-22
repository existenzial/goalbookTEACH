const Twit = require('twit');
const Pandorabot = require('pb-node');
const { pandoraOptions, twitOptions } = require('./credentials');

const bot = new Pandorabot( pandoraOptions );
const T = new Twit( twitOptions );
const goalbookTEACHUrl = 'direct_messages/new';

let stream = T.stream('user', { stringify_friend_ids: true });

// Pandorabot Params
const talkParams = {
   client_name: bot,
   user_key: pandoraOptions.user_key,
   input: 'How old are you',
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

//T.get( 'search/tweets', topTenGoalbookTweets, getGoalbookTweets );

let goalbookTEACHDMParams = { include_entities: false, skip_statuses: true };

const getGoalbookDMs = (err, data, res) => {
  let messages = data;
  for (let i = 0; i < messages.length; i++) {
    let message = messages[i].text;

    talkParams.input = message;
    bot.talk( talkParams, (err, res) => {
      if (!err) { console.log(res.responses[0]); }
    });

    console.log( message );
  }
}

T.get( 'direct_messages', goalbookTEACHDMParams, getGoalbookDMs );