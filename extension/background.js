//background event handlers
//oauth2 auth

var script = document.createElement('script');
script.src = "client.js";

var currentPort;

chrome.identity.getAuthToken(
	{'interactive': true},
	function(token){
        //load Google's javascript client libraries
        console.log(token);
		    window.gapi_onload = authorize;
        // loadScript('https://apis.google.com/js/client.js');
    }
);
function authorize(){
  gapi.auth.authorize(
		{
			client_id: '307244562177-0ucqegrosm3sog2f0nk2k9h5jrcjrvtb.apps.googleusercontent.com',
			immediate: true,
			scope: 'https://www.googleapis.com/auth/gmail.readonly'
		},
		function(){
      gapi.client.load('gmail', 'v1', gmailAPILoaded);
      
		}
	);
}
function gmailAPILoaded(){
    console.log("GAPI Loaded Succesfully");
}


async function getMessage(userId, messageId, token){
    var url = "https://www.googleapis.com/gmail/v1/users/".concat(encodeURIComponent(userId), "/messages/",encodeURIComponent(messageId));
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

      	return getAttachment(userId, messageId, token, attchID);
      }
    } else {
      console.log("HTTP-Error: " + response.status);
    }
}


async function getAttachment(userId, messageId, token, attachmentId){
  var url = "https://www.googleapis.com/gmail/v1/users/".concat(encodeURIComponent(userId), "/messages/",encodeURIComponent(messageId),"/attachments/",attachmentId);
    var auth = "Bearer ".concat(token);
    // console.log(url);
    // console.log(auth);
    var response =  await fetch(url, {
        headers: {
        Authorization: auth,
        Accept: "application/json"
      }
    })

    if (response.ok) { // if HTTP-status is 200-299
      // get the response body 
      let json = await response.json();
      console.log(json);

      fileData = json.data;
      // console.log(fileData);
      //https://console.cloud.google.com/iam-admin/serviceaccounts/project?project=igneous-sweep-257100
      var parsed = await fetch('https://us-central1-igneous-sweep-257100.cloudfunctions.net/parseFile2', {
      // var parsed = await fetch('http://35.236.220.215:42069/parse', {
          method: 'post',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'text/plain'
          },
          body: fileData
      })
      if (parsed.ok){
        let parsedJSON = await parsed.json();
        // console.log(parsedJSON);
        currentPort.postMessage({body: parsedJSON});
        return parsedJSON;
      }

    } else {
      console.log("HTTP-Error: " + response.status);
    }
}

function readMessage() {
    console.log("idk");
}

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "parser");
  currentPort=port;
  port.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.usrid);
        console.log(request.msgid);
        chrome.identity.getAuthToken(	{'interactive': true},
          function(token){
            var result = getMessage(request.usrid, request.msgid, token);
            // getMessage(request.usrid, request.msgid, readMessage);
            // sendResponse({worked: "yes"});
            // sendResponse({html: result});
            // console.log(result);
            // port.postMessage({html: result});
          })
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
  });
});