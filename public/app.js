// Get Articles as a JSON
$.getJSON('/articles', function(data) {
  for (var i=0; i<data.length; i++) {
    $('#articles').append('<div class="well well-sm"> <p data-id="' + data[i]._id + '">'+ data[i].title + '<br />'+ data[i].link + '<a data-dismiss="modal" data-target="#messageModal" class="close" href="#messageModal"></a> </p> </div>');
  }
});

// On-Click for p-Tags
$(function() {
  $(document).on('click', 'p', function() {
    // $('#messages').empty();
    $('#messageModal').modal('show');

    var thisID = $(this).attr('data-id');

    $.ajax({
      method: 'GET',
      url: '/articles/' + thisID,
    })

      .done(function( data ) {
        console.log(data);
        $('#messageModal').append(' <h3>' + data.title + '</h3>');

        $('#messageModal').append(' <input id="titleinput" name="title">');

        $('#messageModal').append(' <textarea id="bodyinput" name="body"></textarea> ');

        $('#messageModal').append('<div class="modal-footer"> <a href="#!" class="btn btn-default" data-dismiss="modal" aria-hidden=true data-id="' + data._id + '" id="savemessage">Save Message</a> </div>');

        if(data.message) {
          $('#titleinput').val(data.message.title);

          $('#bodyinput').val(data.message.body);
        }
      });
  });
});


$(document).on('click', '#savemessage', function(){
  var thisID = $(this).attr('data-id');

  $.ajax({
    method: 'POST',
    url: '/articles/' + thisID,
    data: {
      title: $('#titleinput').val(),
      body: $('#bodyinput').val()
    }
  })
    .done(function( data ) {
      console.log(data);
      $('#messages').empty();
    });
// Removes values entered into the input and textarea for Message entry
  $('#titleinput').val("");
  $('#bodyinput').val("");
});