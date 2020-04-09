$(document).ready(function () {
    $('form').on('submit', function (e) {
        var title = $("#title");
        var author = $("input[name='author']");
        var isbn = $("input[name='isbn']");
        var desc = $("textarea[name='desc']");
        var imageUrl = $("input[name='imageUrl']");

        var books = {
            title: title.val(),
            author: author.val(),
            isbn: isbn.val(),
            desc: desc.val(),
            imageUrl: imageUrl.val()
        };

         $.ajax({
            type: 'POST',
            url: '/add_book',
            data: books,
            //async:false,
            success: function (data) {
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        }); 
        /* .done(function( msg ) {
            console.log( "Data Saved: " + msg );
          }); */

        return false;
        //or: e.preventDefault();
        /* .always(function(){
            console.log("always")
        }) */
    });

    $("div.mb-3").on("click", function () {
        //var item = $(this).text().replace(/ /g, "-");
        var id = $(this).attr('id');
        $.ajax({
            type: 'DELETE',
            url: '/delete_book/' + id,
            success: function () {
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        })
    })
});