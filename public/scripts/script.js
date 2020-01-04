$(document).ready(function () {
    /**JS that extends the height of the bottom container when
     * the bottom pictures are clicked to avoid breaking the 
     * height. The container will only extend if the photo that
     * is added will extend longer than the other 3 lines
     */
    var extend = {
        "height": "+=100px"
    }
    var bottom1clicked = 0;
    var bottom2clicked = 0;
    var bottom3clicked = 0;
    var bottom4clicked = 0;
    var maxClicked = 0;


    $("#bottom1").click(function () {
        bottom1clicked++;
        if (bottom1clicked > maxClicked) {
            $("#bottomContainer").animate(extend);
            maxClicked = bottom1clicked;
        }
    });

    $("#bottom2").click(function () {
        bottom2clicked++;
        if (bottom2clicked > maxClicked) {
            $("#bottomContainer").animate(extend);
            maxClicked = bottom2clicked;
        }
    });

    $("#bottom3").click(function () {
        bottom3clicked++;
        if (bottom3clicked > maxClicked) {
            $("#bottomContainer").animate(extend);
            maxClicked = bottom3clicked;
        }
    });

    $("#bottom4").click(function () {
        bottom4clicked++;
        if (bottom4clicked > maxClicked) {
            $("#bottomContainer").animate(extend);
            maxClicked = bottom4clicked;
        }
    });



    //JSON NASA Spaceships
    $("#logo img").click(function (e) {
        // if (logoClicked = true) {
        $.ajax({
            url: "/ajax-GET-spaceships2",
            dataType: "json",
            type: "GET",
            data: {
                format: 'json'
            },
            success: function (data) {
                console.log("success JSON: ", data);
                let htmlStr = "<table align='center'><tr><td color='red'>Name</td>" +
                        "<td>Price</td><td>Color</td><td>Weight</td><td>Mars Capability</td>";
                for (let i = 0; i < data.length; i++) {
                    htmlStr += "<tr><td>" + data[i]['name'] + "</td>" +
                        "<td>" + data[i]['price'] + "</td>" +
                        "<td>" + data[i]['color'] + "</td>" +
                        "<td>" + data[i]['weight'] + "</td>" +
                        "<td>" + data[i]['mars'] + "</td></tr>";
                }
                htmlStr += "</table>";
                console.log("HERE")
                $("#received1").append(htmlStr).css({"padding-bottom": "none", "color": "#FFFF33"});
            },

            error: function (jqXHR, textStatus, errorThrown) {
                $(".received2").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
        });
    });

    //JSON CALL 
    //Calls into info boxes
    $('#box1 .infoIcon').click(function () {
        $.ajax({
            url: "/ajax-GET-spaceshipJSON",
            dataType: "json",
            type: "GET",
            data: {
                format: "json"
            },
            success: function (data) {
                console.log("SUCCESS JSON:", data, data.length);
                var div = $("#box1Span").css({
                    "font-size": "20pt",
                    "color": "#66ff00"
                });
                var div2 = $("#box2Span").css({
                    "font-size": "20pt",
                    "color": "#01f9c6"
                });;
                var div3 = $("#box3Span").css({
                    "font-size": "20pt",
                    "color": "#55ffff"
                });;
                var div4 = $("#box4Span").css({
                    "font-size": "20pt",
                    "color": "#fffc00"
                });;
                let htmlStr = "<ul style='list-style-type:none'>";
                for (let count = 0; count < data.length; count++) {
                    htmlStr += "<li>" + data[count]['planet1'] + "</li>" +
                        "<li>" + data[count]['planet2'] + "</li>" +
                        "<li>" + data[count]['planet3'] + "</li>" +
                        "<li>" + data[count]['planet4'] + "</li>" +
                        "<li>" + data[count]['planet5'] + "</li>";
                    switch (count) {
                        case 0:
                            htmlStr += "</ul>";
                            div.html(htmlStr);
                            htmlStr = "<ul style='list-style-type:none'>";
                            break;
                        case 1:
                            htmlStr += "</ul>";
                            div2.append(htmlStr);
                            htmlStr = "<ul style='list-style-type:none'>";
                            break;
                        case 2:
                            htmlStr += "</ul>";
                            div3.html(htmlStr);
                            htmlStr = "<ul style='list-style-type:none'>";
                            break;
                        case 3:
                            htmlStr += "</ul>";
                            div4.html(htmlStr);
                            htmlStr = "<ul style='list-style-type:none'>";
                            break;
                        default:
                            console.log("default");
                            break;
                    }
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#p1").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
        });
    });


    $('#bottom1, #bottom2, #bottom3, #bottom4').click(function (e) {
        let clickedID = $(e.target);
        let targetElement = clickedID.closest('#bottom1, #bottom2, #bottom3, #bottom4');
        $.ajax({
            url: "GET-spaceshipImages",
            dataType: "html",
            type: "GET",
            data: {
                format: 'image'
            },
            success: function (data) {
                console.log("Spaceship Image success: ", data);
                $(targetElement).append(data);
            }
        })
    })


    /***************jquery post***************/
    $('#signIn').click(function(){
        $.get('/.login');
    });

});