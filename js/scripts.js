$(function() {
  console.log("Hello jQuery");
  $.get("http://localhost:8083/kb/v1/concept/", function(data, status){
    console.log(status);
    console.log(JSON.stringify(data));
  });

  $('label.tree-toggle').click(function () {
        $(this).parent().children('ul.tree').toggle(250); //show and hide children
        $(this).children('i').toggleClass('glyphicon glyphicon-chevron-right');  //switch icons
        $(this).children('i').toggleClass('glyphicon glyphicon-chevron-down');
    });

});
