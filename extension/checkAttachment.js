window.addEventListener ("load", getId, false);

function getId (evt) {
    var messageId = document.getElementsByClassName("adn ads")[0].getAttribute("data-message-id");
    getMessage('me', messageId, readMessage())

    console.log(messageId);
}

function getMessage(userId, messageId, callback) {
    var request = gapi.client.gmail.users.messages.get({
      'userId': userId,
      'id': messageId
    });
    request.execute(callback);
  }

function readMessage() {
    console.log(this.id);
}