console.log("YO");

$(document).ready(function () {
  $('.modal').modal();
});

//click on the btn
  //listen for the button with id of scrape to be clicked on
$("#scrape").on("click", function(event){
  event.preventDefault();
  //make api call
    //$.ajax or $.get()
  $.get("/api/scrape").then(function(res){
    console.log(res);
    window.location.reload()
  })


})

//user clicks btn to save note
$(document).on("click", '#noteButton', function(event){
  event.preventDefault();
  var articleId = $(this).attr("data-id")
  console.log(articleId);
  //user enters note
    //grab the users note
      //make id to grab that value out of the input #noteTextue
    //take that note and store it to the db and tie it with the article
      //make a note schema
  var noteText = $(`#noteText${articleId}`).val().trim()
  console.log(noteText);
  $.post(`/api/note/${articleId}`, { note: noteText }).then(function(dbResponse){
    $(`#allNotes${articleId}`).empty();
    $.get(`/api/note/${articleId}`).then(function (dbArticles) {
      console.log(dbArticles);
      var notesArray = dbArticles[0].notes;
      console.log(notesArray);
      for(var i = 0; i < notesArray.length; i++){
        var noteLi = $(`<li> ${notesArray[i].note} </li>`)
        $(`#allNotes${articleId}`).append(noteLi)
      }

    })
  })
})
