//background event handlers
//oauth2 auth

var script = document.createElement('script');
script.src = "client.js";

chrome.identity.getAuthToken(
	{'interactive': true},
	function(token){
        //load Google's javascript client libraries
        console.log(token);
		    window.gapi_onload = authorize;
        // loadScript('https://apis.google.com/js/client.js');
        // gapi.client.setApiKey("AIzaSyDqr5vcSftuPVoy0gs4iJNkdZp3rImB_Nc");
    }
);
function authorize(){
  gapi.auth.authorize(
		{
			client_id: '624743473709-guudjkt9upbm3efr74o563d6bctgl59q.apps.googleusercontent.com',
			immediate: true,
			scope: 'https://mail.google.com/ https://www.googleapis.com/auth/gmail.readonly'
		},
		function(){
      gapi.client.load('gmail', 'v1', gmailAPILoaded);
      
		}
	);
}
function gmailAPILoaded(){
    gapi.client.setApiKey("AIzaSyCVV9GPYJZRiRP3KRuUt6j2riSjZzGqlHw");
    console.log("YAY");
}





function getMessage(userId, messageId, callback) {
    return gapi.client.gmail.users.messages.get({
      'userId': userId,
      'id': messageId,
      "prettyPrint": true
    })
      .then(function(response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
    },
    function(err) { 
      console.error("Execute error", err); 
    });  
    // request.execute(callback);
}

function readMessage() {
    console.log("idk");
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.usrid);
        console.log(request.msgid);
        chrome.identity.getAuthToken(function(token){
          getMessage(request.usrid, request.msgid, readMessage();
        })
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        sendResponse({worked: "yes"});
    });
