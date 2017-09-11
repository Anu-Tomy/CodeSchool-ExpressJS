$(function(){

  $.get( '/blocks', appendToList); 

  function appendToList(blocks) {
    var list = [];
    var content, block;
    for(var i in blocks){
      block = blocks[i];
      // link to eac block's description
      content = '<a href="/blocks/'+block+'">'+block+'</a>';
      list.push($('<li>', { html: content }));
    }
    
    $('.block-list').append(list);
  }
  
  $('form').on('submit', function(event){
    event.preventDefault();
    var form = $(this);
    // serialize() transforms the form data to URL-encoded notation
    var blockData = form.serialize();
    
    $.ajax({
      type: 'POST', url: '/blocks',  data: blockData
    }).done(function(blockname){
      // array with the new block as its single argument
      appendToList([blockName]);
      // clear form text input fields
      form.trigger('reset');
    });
  });
});