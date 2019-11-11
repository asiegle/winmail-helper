/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */

const rtfToHTML = require('./rtf-to-html')

exports.rtfConv = (req, res) => {
  var rtfMess = String(req.body.body).replace(/(\r\n|\n|\r)/gm," ");
  //console.log(req);
  console.log(rtfMess);
  
  //console.log(pubsubMessage);
  
function customTemplate (doc, defaults, content) {
  return `
<html>
  <head>
    <meta charset="UTF-8">
    <style>
    .rtfCustom {
	  font-family: ${defaults.font.name}, ${defaults.font.family};
      font-size: ${defaults.fontSize / 2}pt;
      text-indent: ${defaults.firstLineIndent / 20}pt;
    }
    </style>
  </head>
  <div class="rtfCustom">
    ${content}
  </div>
</html>`
}
  //    ${content.replace(/\n/, '\n    ')}

  
  rtfToHTML.fromString(rtfMess, {paraBreaks: ' ', disableFonts: false, paraTag: "p", template: customTemplate}, (err, html) => {
  //rtfToHTML.fromStream(pubsubMessage, (err, html) => {
    console.log(html);
    res.send(html);
    return html;
  })
  
  
};
