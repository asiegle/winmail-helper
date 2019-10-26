//background event handlers
//oauth2 auth

var script = document.createElement('script');
script.src = "client.js";

chrome.identity.getAuthToken(
	{'interactive': true},
	function(){
	  //load Google's javascript client libraries
		window.gapi_onload = authorize;
        // loadScript('https://apis.google.com/js/client.js');
        
        
    }
);


function loadScript(url){
  var request = new XMLHttpRequest();

	request.onreadystatechange = function(){
		if(request.readyState !== 4) {
			return;
		}

		if(request.status !== 200){
			return;
		}

        // eval(request.responseText);
        // var myScript = document.createElement('script');
        // myScript.innerHTML = request.responseText;
        // document.body.appendChild(myScript);
	};

	request.open('GET', url);
	request.send();
}

function authorize(){
  gapi.auth.authorize(
		{
			client_id: '624743473709-guudjkt9upbm3efr74o563d6bctgl59q.apps.googleusercontent.com',
			immediate: true,
			scope: 'https://www.googleapis.com/auth/gmail.readonly'
		},
		function(){
		  gapi.client.load('gmail', 'v1', gmailAPILoaded);
		}
	);
}

function gmailAPILoaded(){
    console.log("YAY");
}

function getMessage(userId, messageId, callback) {
    var request = gapi.client.gmail.users.messages.get({
      'userId': userId,
      'id': messageId
    });
    console.log(request)
    request.execute(callback);
  }

function readMessage() {
    console.log(this.id);
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        getMessage('me', request.id, readMessage());
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        sendResponse({worked: "yes"});
    });