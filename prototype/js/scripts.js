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

  //Trying get metadata on object
  $.get("http://localhost:4567/getMetadata/object", function(data, status){
    console.log(data);
  });

  //Appends first level of tree
  $.get("http://localhost:8083/kb/v1/phylogeny/down/object", function(data, status){
    treeData = data;
    $.each(treeData.children, function(k, v){
      if(!v.children){
        $("#objectTree").append('<div id="view-toggler"><li>'+ v.name +'</li></div>')
      }else{
        $("#objectTree").append('<li><label class="nav-header"><i class="tree-toggler glyphicon glyphicon-chevron-right"></i><div id="view-toggler">'+ v.name + '</div></label><ul class="nav nav-list tree" id= "'+ (v.name).replace(/\s/g, '') + 'Tree' +'"></ul>');
      }
    });
  });

  //Gets concept when name on tree view is clicked
  //It is in document loaded because of the dynamically added elements
  $(document).on("click", "#view-toggler", function(){
    if($(this).children().length == 1){
      var conceptName = ($(this).children().html()).replace(/\s/g, '%20');
    }else{
      var conceptName = ($(this).html().toLowerCase()).replace(/\s/g, '%20');
    }
    $.get("http://localhost:8083/kb/v1/concept/" + conceptName, function(data, status){

      var alternateNameString = getAlternateNameString(data);
      $(".sub-header").html(data.name + alternateNameString);
      $("#objectConcept").html(JSON.stringify(data));
    });
  });

  //Toggles glyphicon and expands tree on click
  $(document).on("click", "i.tree-toggler", function () {
      $(this).parent().parent().children('ul.tree').toggle(250); //show and hide children
      $(this).toggleClass('glyphicon glyphicon-chevron-right');  //switch icons
      $(this).toggleClass('glyphicon glyphicon-chevron-down');
  });
  
  $("#post-btn").click(function(){
      var concept = {
          name: $("#c-name").val(),
          //eventually will include author and synonym
          // author:$("#c-author").val(),
          // synonym:$("#c-synonym").val()
      }

      $.ajax({
          url: 'http://localhost:4567/createConcept/' + concept.name,
          type: 'post',
          dataType: 'json',
          success: function (data) {
              console.log(data)
          },
          error: function(status,error){
              console.log(error.msg)
          },
          data: concept
      });

  });

  //test delete
  $("#del-btn").click(function(){
      var concept = {
          name: $("#c-name").val(),
      }
      $.ajax({
          url: 'http://localhost:4567/deleteConcept/' + concept.name,
          type: 'delete',
          dataType: 'json',
          success: function (data) {
              console.log(data)
          },
          error: function(status,error){
              console.log(error.msg)
          },
          data: concept
      });

  });
});

//When search button is clicked
$("#searchButton").click(function(){
  getSearchResult();
});

//When enter is input on search bar
$("#searchInput").keypress(function(e) {
    if(e.which == 13) {
        getSearchResult();

        //Removes focus on input
        $(this).blur();
    }
});

//Fetches search result from input
function getSearchResult(){
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
      var alternateNameString = getAlternateNameString(data);
      $(".sub-header").html(data.name + alternateNameString);
      $("#objectConcept").html(JSON.stringify(data));
    }
  });
}

function getAlternateNameString(data){
  var alternateNameString = "";
  if(data.alternateNames != ""){
    alternateNameString += " ( ";
    $.each(data.alternateNames, function(k, v){
      alternateNameString += (v + " ");
    });
    alternateNameString += ")";
  }
  return alternateNameString;
}
