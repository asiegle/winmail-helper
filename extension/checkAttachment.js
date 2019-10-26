window.addEventListener ("load", getId, false);

function getId (evt) {
    var messageId = document.getElementsByClassName("adn ads")[0].getAttribute("data-message-id");
    console.log(messageId);
}

