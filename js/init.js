$(document).ready(function () {

    search("Albert Einstein");
    initActions();
});

function initActions() {

    $('.search-button').click(function(){

        var term = $('.search-input').val();

        if(term != ""){
            search(term);
        }

    });

    $('#main-data').on('click', '.go-to', function(){

        goToArticle($(this).attr('id'));

    });
}

function buildView(data, term) {

    var mainContainer = $('#main-data');
    var row = '';
    var results = 0;

    $('#main-data').html("");
    data.query.search.forEach(function(item, index){
        results++;
        //console.log(item);
        row = "<div class='row'>" +
                    "<div class='column'>" +
                        "<a class='go-to' href='#' id='" + item.pageid + "' >" + item.title + "</a>" +
                    "</div>" +
                    "<div class='column'>" +
                      item.snippet +
                    "</div>" +
                  "</div>";

        mainContainer.append(row);
    });

    $('.search-term').text(
        (results > 0) ? "You are searching: " + term : "No results found"
    );
}

function goToArticle(idArticle){

    var params = {
        action: "query",
        prop: "info",
        pageids: idArticle,
        inprop: "url",
        format: "json",
    };

    $.ajax({
        url: "https://en.wikipedia.org/w/api.php",
        type: "GET",
        dataType: "jsonp",
        data: params,
        success: function (data) {
            var url = data.query.pages[idArticle];
            window.open(url.fullurl);
        },
    });

}

function search(term) {

    var params = {
        action: "query",
        list: "search",
        srsearch: term,
        utf8: "",
        format: "json",
    };

    $.ajax({
        url: "https://en.wikipedia.org/w/api.php",
        type: "GET",
        dataType: "jsonp",
        data: params,
        success: function (data) {
            buildView(data, term);
        },
    });
}