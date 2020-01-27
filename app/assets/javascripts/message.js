$(function(){
  function buildHTML(message) {
    if ( message.content && message.image ) {
      var html =
        `<div class="main-center__box" data-message-id=${message.id}>
          <div class="main-center__box__name">
            <div class="main-center__box__name__user">
              ${message.user_name}
            </div>
            <div class="main-center__box__name__time">
              ${message.created_at}
            </div>
          </div>
          <div class="main-center__box__name__text">
            <p class="main-center__box__name__text__input">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else if (message.content) {
      var html =
        `<div class="main-center__box" data-message-id=${message.id}>
          <div class="main-center__box__name">
            <div class="main-center__box__name__user">
              ${message.user_name}
            </div>
            <div class="main-center__box__name__time">
              ${message.created_at}
            </div>
          </div>
          <div class="main-center__box__name__text">
            <p class="main-center__box__name__text__input">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    } else if (message.image) {
      var html = `<div class="main-center__box" data-message-id=${message.id}>
      <div class="main-center__box__name">
          <div class="main-center__box__name__user">
            ${message.user_name}
          </div>
          <div class="main-center__box__name__time">
            ${message.created_at}
          </div>
        <img src=${message.image} >
      </div>`
    };
  }
  $('.new_message').on('submit',function(e){
    console.log("OK");
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(message){
        console.log(message);
        var html = buildHTML(message);
        $('.main-center').append(html);
        $('.new_message')[0].reset();
        // $('.box').animate({'height' : '200px'});
        $('.main-center').animate({ scrollTop: $('.main-center')[0].scrollHeight});
        $('.submit-btn').prop('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
  });
    var reloadMessages = function() {
      last_message_id = $('.main-center__box:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0){
        var insertHTML = '';
          $.each(messages, function(i,message) {
            insertHTML += buildHTML(message)
          });
          $('.main-center').append(insertHTML);
          $('.main-center').animate({ scrollTop: $('.main-center')[0].scrollHeight});
          $("#new_message")[0].reset();
          $(".form__submit").prop("disabled", false);
        }
      })
      .fail(function(){
        console.log('error');
      })
    }
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});