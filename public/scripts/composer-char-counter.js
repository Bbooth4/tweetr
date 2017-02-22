$(() => {
  $('#create-tweet').keyup(function() {
    const counter = $('.counter'); 
    const lengthOfCounter = $(this).val().length;
    const result = counter.text(140 - lengthOfCounter);
    if (lengthOfCounter > 140) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');      
    }
  });
});