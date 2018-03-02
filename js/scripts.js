var treeData = null;
$(function() {

  //Gets all concepts
  $.get("http://localhost:8083/kb/v1/concept/", function(data, status){
    // console.log(JSON.stringify(data));
  });
  $.get("http://localhost:8083/kb/v1/phylogeny/down/root", function(data, status){
    treeData = data;
    $.each(treeData.children, function(k, v){
      if(!v.children){
        $("#objectTree").append('<li><a href="#">'+ v.name +'</a></li>')
      }else{
        $("#objectTree").append('<li><label class="nav-header"><i class="tree-toggler glyphicon glyphicon-chevron-right"></i><div id ="view-toggler">'+ v.name + '</div></label><ul class="nav nav-list tree" id= "'+ (v.name).replace(/\s/g, '') + 'Tree' +'"></ul>');
      }
    });
  });
});

$('i.tree-toggler').click(function () {
    $(this).parent().parent().children('ul.tree').toggle(250); //show and hide children
    $(this).toggleClass('glyphicon glyphicon-chevron-right');  //switch icons
    $(this).toggleClass('glyphicon glyphicon-chevron-down');
});

$('#view-toggler').click(function () {
    var conceptName = ($(this).html().toLowerCase()).replace(/\s/g, '%20');
    $.get("http://localhost:8083/kb/v1/concept/" + conceptName, function(data, status){
      console.log(data);
    });
});
