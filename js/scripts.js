var treeData = null;

$(function() {
  //When document is loaded

  //Gets all concepts
  $.get("http://localhost:8083/kb/v1/concept/", function(data, status){
    // console.log(JSON.stringify(data));
  });

  $.get("http://localhost:8083/kb/v1/concept/object", function(data, status){
    $("#objectConcept").html(JSON.stringify(data));
  });

  //Appends first level of tree
  $.get("http://localhost:8083/kb/v1/phylogeny/down/object", function(data, status){
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

//When search button is clicked
$("#searchButton").click(function(){
  $.ajax({
    url: "http://localhost:8083/kb/v1/concept/" + $("#searchInput").val(),
    data: {},
    type: 'get',
    error: function(XMLHttpRequest, errorThrown){
      $("#alertError").html("Error: ");
      $("#alertText").html("Concept not found");
      $(".alert").show();
      $(".alert").delay(3200).fadeOut(300);
    },
    success: function(data){
      var alternateNameString = "";
      if(data.alternateNames){
        $.each(data.alternateNames, function(k, v){
          alternateNameString += (v + " ");
        });
      }
      $(".sub-header").html(data.name + " ( " + alternateNameString + ")");
      $("#objectConcept").html(JSON.stringify(data));
    }
  });
});

//Toggles glyphicon and expands tree on click
$('i.tree-toggler').click(function () {
    $(this).parent().parent().children('ul.tree').toggle(250); //show and hide children
    $(this).toggleClass('glyphicon glyphicon-chevron-right');  //switch icons
    $(this).toggleClass('glyphicon glyphicon-chevron-down');
});

//Gets concept when name on tree view is clicked
$('#view-toggler').click(function () {
    var conceptName = ($(this).html().toLowerCase()).replace(/\s/g, '%20');
    $.get("http://localhost:8083/kb/v1/concept/" + conceptName, function(data, status){
      console.log(data);
    });
});
