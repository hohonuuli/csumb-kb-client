$(function() {
  console.log("Hello jQuery");
  $.get("http://localhost:8083/kb/v1/concept/", function(data, status){
    console.log(status);
    console.log(JSON.stringify(data));
  });

  $("#post-btn").click(function(){
      var concept = {
          name: $("#c-name").val(),
          //eventually will include author and synonym
          // author:$("#c-author").val(),
          // synonym:$("#c-synonym").val()
      }

      var name = $("#c-name").val()
      $.ajax({
          url: 'http://localhost:4567/createConcept/' + name,
          type: 'post',
          dataType: 'json',
          success: function (data) {
              console.log(data.msg)
          },
          error: function(status,error){
              console.log(error.msg)
          },
          data: concept
      });

  });

  $('label.tree-toggle').click(function () {
        $(this).parent().children('ul.tree').toggle(250); //show and hide children
        $(this).children('i').toggleClass('glyphicon glyphicon-chevron-right');  //switch icons
        $(this).children('i').toggleClass('glyphicon glyphicon-chevron-down');
    });

});
