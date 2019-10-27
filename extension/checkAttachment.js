window.addEventListener ("load", getId, false);

function getId (evt) {
    var messageId = document.getElementsByClassName("adn ads")[0].getAttribute("data-message-id");
    var userId = document.getElementsByClassName("gb_hb")[0].innerHTML;
    var msgbody = document.getElementById(":2o");

    messageId = messageId.substring(1);
    
    // chrome.runtime.sendMessage({msgid: messageId, usrid: userId}, function(response) {
    //     console.log(response.worked);
    // });

    var port = chrome.runtime.connect({name: "parser"});
    port.postMessage({msgid: messageId, usrid: userId});
    port.onMessage.addListener(function(response) {
        // console.log(response.worked);
        console.log(response.html.html);
        msgbody.innerHTML=response.html.html;
    });


    console.log(messageId);
    console.log(userId);
}


