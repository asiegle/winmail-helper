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
			client_id: '7996700904-kte148vl33q9nc1dra384r0rv8hsssua.apps.googleusercontent.com',
			immediate: true,
			scope: 'https://www.googleapis.com/auth/gmail.readonly'
		},
		function(){
      gapi.client.load('gmail', 'v1', gmailAPILoaded);
      
		}
	);
}
function gmailAPILoaded(){
    gapi.client.setApiKey("AIzaSyCZr1Gkvi3Yt-nb0BeYR9yPvd_8S4TtU4Y");

    console.log("YAY");
}





// function getMessage(userId, messageId, callback) {
//     return gapi.client.gmail.users.messages.get({
//       'userId': userId,
//       'id': messageId,
//       "prettyPrint": true
//     })
//       .then(function(response) {
//       // Handle the results here (response.result has the parsed body).
//       console.log("Response", response);
//     },
//     function(err) { 
//       console.error("Execute error", err); 
//     });  
//     // request.execute(callback);
// }

async function getMessage2(userId, messageId, token){
    var url = "https://www.googleapis.com/gmail/v1/users/".concat(encodeURIComponent(userId), "/messages/",encodeURIComponent(messageId),"?format=full&prettyPrint=true&key=AIzaSyCZr1Gkvi3Yt-nb0BeYR9yPvd_8S4TtU4Y");
    var auth = "Bearer ".concat(token);
    console.log(url);
    console.log(auth);
    var response =  await fetch(url, {
        headers: {
        Authorization: auth,
        Accept: "application/json"
      }
    })

    if (response.ok) { // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json();
      console.log(json);

      var i = -1;
      var parts = json.payload.parts;
      for(p in parts){
      	if(parts[p].mimeType == "application/ms-tnef") i = p;
      }
      if(i >= 0){
      	var attchID = parts[i].body.attachmentId;
      	var attchSize = parts[i].body.size;

      	// do stuff
      }
    } else {
      alert("HTTP-Error: " + response.status);
    }

    // var myJson =  response.json();
}

function readMessage() {
    console.log("idk");
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.usrid);
        console.log(request.msgid);
        chrome.identity.getAuthToken(function(token){
          // var test = await fetch("https://www.googleapis.com/gmail/v1/users/asiegle%40u.rochester.edu/messages/msg-f%3A1645486631346554900?format=full&prettyPrint=true&key=AIzaSyCZr1Gkvi3Yt-nb0BeYR9yPvd_8S4TtU4Y", {
          //     headers: {
          //     Accept: "application/json",
          //     Authorization: "Bearer ya29.Il-pBz0vD6BorqnXcXQXj78_FEMUn5xt5Y8FR2000FrDl71266uN155sifgn0PbcvUDPTLhNyTF4o8vkRGQpPSlpGliCDukVkE2lOwMVqDDJHP0xZODrajP6XJzjkiOthw"
          //   }
          // })
          // console.log(test)
          getMessage2(request.usrid, request.msgid, token);
          // getMessage(request.usrid, request.msgid, readMessage);
          
        })
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        sendResponse({worked: "yes"});
    });
