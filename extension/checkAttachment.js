window.addEventListener ("load", getId, false);

function getId (evt) {
    var messageId = document.getElementsByClassName("adn ads")[0].getAttribute("data-message-id");
    var userId = document.getElementsByClassName("gb_hb")[0].innerHTML;
    
    chrome.runtime.sendMessage({msgid: messageId, usrid: userId}, function(response) {
        console.log(response.worked);
      });

    console.log(messageId);
    console.log(userId);
}

