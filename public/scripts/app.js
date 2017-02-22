$(() => {

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
          <div class='flags'>
              <i class="fa fa-flag" aria-hidden="true"></i>
              <i class="fa fa-retweet" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
          </div>
        </footer>
      </article>
      `
    return $tweet;
  }

  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).done((data) => {
      renderTweets(data);
    }).fail(console.error);
  }; 


  function renderTweets(tweets) {
    $('.tweet-wrapper').empty();
    return tweets.map(tweet => $('.tweet-wrapper').prepend(createTweetElement(tweet)) ); 
  }

  loadTweets();

  $('form').submit((event) => {
    event.preventDefault();
    const newTweet = $(event.target).serialize();
    if ($('#create-tweet').val().length === 0 || $('#create-tweet').val().length === '') {
      alert('You did not input any information!');
    } else if ($('#create-tweet').val().length > 140) {
      alert('Your tweet has too many characters!');
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: newTweet,
      }).done((result) => {
        loadTweets();
        $('#create-tweet').val(''); 
        $('.counter').text(140);
      }).fail((error) => console.error(error));
    }
  });
  $('.new-tweet').slideUp(0, function(){}); 
  $('#compose').click((event) => {
    $('.new-tweet').slideToggle('slow', function(){});
    $('#create-tweet').focus();
  });
});
