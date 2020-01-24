$(function(){

  function buildHTML(message) {
    if ( message.image ) {
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
    } else {
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
    };
  }
  $('.new_message').on('submit',function(e){
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
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('from')[0].reset();
      })
  })
});