var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

$(() => {
  function loadTweets(tweet) {
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $('form').serialize(),
      success: function(tweet) {
        console.log($('#tweet-wrapper').prepend(tweet));
      }
    });
  }

  function createTweetElement(tweet) {
    const personName = tweet.user.name;
    const avatar = tweet.user.avatars.small;
    const account = tweet.user.handle;
    const content = tweet.content.text;
    const daysAgo = new Date(tweet.created_at).toLocaleString();
    const $tweet = `
      <article class="tweeted-tweets">
        <header>
          <img class='avatar' src=${avatar}>
          <h3 class='person-name'>${personName}</h3>
          <p class='account'>${account}</p>
        </header>
        <div class='content' >${content}</div>
        <footer>
          <p class='days-ago'>${daysAgo}</p>
        </footer>
      </article>
      `
    return $tweet;
  }

  function renderTweets(tweets) {
    return tweets.forEach(tweet => $('.tweet-wrapper').prepend(createTweetElement(tweet)) ); 
  }

  $('input').click(function(event) {
    event.preventDefault();
    const data = $('#create-tweet')[0].value;
    loadTweets(data);
  });
  renderTweets(data);
});
