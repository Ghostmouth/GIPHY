var topics = ["Trumpet", "Trombone", "Bass", "Piano", "Guitar", "Synthesizer", "Saxaphone", "Drums", "Cowbell", "Clarinet"]


// makes the buttons
function buttonize() {
    $("#button-area").empty()
    for (var i = 0; i < topics.length; i++) {
        var theButtons = $("<button>")
        theButtons.addClass("topicItem")
        theButtons.addClass("btn btn-primary")
        theButtons.attr("data-name", topics[i])
        theButtons.text(topics[i])
        $("#button-area").append(theButtons)
    }
}

// prints the stuff
function summon () {

    var itemName = $(this).attr("data-name")
    var APIKey = "BTqG9S08fp24TLRM6jPS8dKAjdW2t6Q4"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + itemName + "&api_key=BTqG9S08fp24TLRM6jPS8dKAjdW2t6Q4"
    
    $("#gif-area").empty()

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {
        var results = response.data

        for (var i=0; i<results.length; i++){ 

            var gifDiv = $("<div>") // creates div
            gifDiv.addClass("gifDiv")

            var gifRating = $("<p>").text("Rating: " + results[i].rating) // rating
            gifDiv.append(gifRating)

            var gifImage = $("<img>"); // creates image for gif
            gifImage.attr("src", results[i].images.fixed_height_small_still.url) // still image stored to image's src 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url) // still image
            gifImage.attr("data-moving",results[i].images.fixed_height_small.url) // moving image
            gifImage.attr("data-state", "still") // set it to still
            gifImage.addClass("image")
            gifDiv.append(gifImage) 
            $("#gif-area").prepend(gifDiv) // adds gifs to div
        }
    })

}


// search

function newSummon(){
    $("#add-gif").on("click", function(){
    var newItem = $("#search-area").val().trim()
    if (newItem == ""){
      return false; 
    }
    console.log(topics)
    topics.push(newItem)

    buttonize()
   
    })
}

// runs program

buttonize()
newSummon()

$(document).on("click", ".topicItem", summon)
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state')
    if ( state == 'still'){
        $(this).attr('src', $(this).data('moving'))
        $(this).attr('data-state', 'moving')
    }else{
        $(this).attr('src', $(this).data('still'))
        $(this).attr('data-state', 'still')
    }
})