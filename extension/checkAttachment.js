window.addEventListener ("load", getId, false);

function getId (evt) {
    var messageId = document.getElementsByClassName("adn ads")[0].getAttribute("data-message-id");
    // getMessage('me', messageId, readMessage());
    chrome.runtime.sendMessage({id: messageId}, function(response) {
        console.log(response.worked);
      });

    console.log(messageId);
}

