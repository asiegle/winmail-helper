window.addEventListener ("load", getId, false);
window.addEventListener ("hashchange", getId, false);
// window.addEventListener ("click", function(){
//     console.log(document.getElementsByClassName("adn ads")[0].getElementsByClassName("aZo N5jrZb")[0].getAttribute("download_url"));
// })
// window.addEventListener ("hashchange", function(){
//     // if (this.document.querySelector(".adn ads") == null) {
//     //     this.console.log("Not a message");
//     // } else if (this.document.querySelector(".aZo N5jrZb") == null) {
        
//     // } else {
//     //     getId();
//     // }
//     this.console.log("haschange");
    
//     var target = document.getElementsByClassName("adn ads")[0];
//     console.log(target);
//     var config = {attributes: false, 
//                     characterData: false, 
//                     childList: true, 
//                     subtree: false };
    
//     var callback = function(mutationsList, observer) {
//         console.log("callback");
//         for(let mutation of mutationsList) {
//             if (mutation.type === 'childList') {
//                 this.console.log("correct mutation");
//                 if (this.document.querySelector(".aZo N5jrZb") != null) {
//                     this.console.log("found");
//                     getId();
//                 }
//             }
//         }
//     }

//     const observer = new MutationObserver(callback);
//     observer.observe(target, config);

//     this.console.log("obbservin");


//     // observer.disconnect();

//     // this.console.log("DC'd");


// });


function getId (evt) {

    console.log("in getID: " + document.readyState);

    var messageId = document.getElementsByClassName("adn ads")[0].getAttribute("data-message-id");
    var userId = document.getElementsByClassName("gb_jb")[0].innerHTML; //used to be gb_hb
    var msgbody = document.getElementsByClassName("a3s aXjCH ")[0];
    // var attachmentsType =  document.getElementsByClassName("adn ads")[0].getElementsByClassName("aZo N5jrZb")[0].getAttribute("download_url");
    
    
    // var attachments =  document.getElementsByClassName("adn ads")[0].querySelector(".aZo.N5jrZb");
    // var attachmentType;

    // if (attachments != null){
    //     attachmentType = attachments.getAttribute("download_url");
    //     console.log(attachmentType);
    // } else {
    //     console.log("No attachments?");
    // }
    
    

    



    
    // var attachments =  document.getElementsByClassName("adn ads")[0].getElementsByClassName("aZo N5jrZb")[0];
    // if (attachments != null){
    //     var attachmentsType =  attachments.getAttribute("download_url");
    //     console.log(attachmentsType);
    // }
    
    messageId = messageId.substring(1);
    
    // chrome.runtime.sendMessage({msgid: messageId, usrid: userId}, function(response) {
    //     console.log(response.worked);
    // });

    var port = chrome.runtime.connect({name: "parser"});
    port.postMessage({msgid: messageId, usrid: userId});
    port.onMessage.addListener(function(response) {
        // console.log(response.worked);
        if(response.body.html != null){
            msgbody.innerHTML=response.body.html;
        } else if (response.body.rtf != null){
            msgbody.innerHTML=response.body.rtf;
        }
        console.log(response.body);
        // msgbody.innerHTML=response.html.html;
    });


    // console.log(messageId);
    // console.log(userId);


    console.log(messageId);
    console.log(userId);
    // console.log(attachmentsType);



}


