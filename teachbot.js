const Twit = require('twit');
const Pandorabot = require('pb-node');
const { pandoraOptions, twitOptions } = require('./credentials');

const bot = new Pandorabot( pandoraOptions );
const T = new Twit( twitOptions );

const stream = T.stream( 'user' );

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
  talkParams.input = mostRecentMessage; //user input

  bot.talk( talkParams, (err, res) => {
    if (!err) {
      //bot response to user input
      T.post('direct_messages/new', { user_id: messages[0].sender.id, text: res.responses[0] }, (err, data, res) => {
        if (!err) {
          let botReply = data.text;
          console.log( botReply );
        } else {
          console.error( err );
        }
      })
    }
  });
}

const pollDMs = () => {
  T.get( 'direct_messages', goalbookTEACHDMParams, goalbookDMBotTalk );
}

const greetNewFollow = (event) => {
  let newUserFollow = event.source.name;
  console.log( `New User: ${event.source.screen_name} followed goalbookTEACH!` );
  bot.talk( talkParams, (err, res) => {
    if (!err) {
      T.post('direct_messages/new', { user_id: event.source.id, text: `Hi! Thanks for the follow, ${newUserFollow}!` }, (err, data, res) => {
        if (!err) {
          let botReply = data.text;
          console.log( botReply );
        } else {
          console.error( err );
        }
      })
    }
  });
}

stream.on( 'follow', greetNewFollow );
//stream.on( 'direct_message', pollDMs );
