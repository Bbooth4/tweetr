$(() => {
  function escape(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function daysAgoCalc(current, previous) {
    let minutes = 60 * 1000;
    let hours = minutes * 60;
    let days = hours * 24;
    let months = days * 30;
    let years = days * 365;
    let elapsedTime = current - previous;
    if (elapsedTime < minutes) {
        return `Less than a minute ago`;
    } else if (elapsedTime < hours) {
        return Math.round(elapsedTime / hours) <= 1 ? 
        `${Math.round(elapsedTime / hours * 60)} minutes ago` :
        `${Math.round(elapsedTime / hours)} minute ago`;
    } else if (elapsedTime < days ) {
        return Math.round(elapsedTime / hours) === Math.round(1) ?
        `${Math.round(elapsedTime / hours)} hour ago` :
        `${Math.round(elapsedTime / hours)} hours ago`;
    } else if (elapsedTime < months) {
        return Math.round(elapsedTime / days) === Math.round(1) ?
        `${Math.round(elapsedTime / days)} day ago` :
        `${Math.round(elapsedTime / days)} days ago`;
    } else if (elapsedTime < years) {
        return Math.round(elapsedTime / months) === Math.round(1) ?
        `${Math.round(elapsedTime / months)} month ago` :
        `${Math.round(elapsedTime / months)} months ago`;
    } else {
        return Math.round(elapsedTime / years) === Math.round(1) ?
        `${Math.round(elapsedTime / years)} year ago` :
        `${Math.round(elapsedTime / years)} years ago`;
    }
  }

  function createTweetElement(tweet) {
    const personName = tweet.user.name;
    const avatar = tweet.user.avatars.small;
    const account = tweet.user.handle;
    const content = tweet.content.text;
    let dayCreated = tweet.created_at;
    let today = new Date(); 
    const daysAgo = daysAgoCalc(today, dayCreated); 
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
    $('#create-tweet').val(escape($('#create-tweet').val()));
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
