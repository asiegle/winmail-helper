# winmail-helper

https://chrome.google.com/webstore/detail/winmail-helper/elklemakijgjpgldjcebdmmlbpanlfjb?hl

## Installation 
To add the chrome extension to your browser, download the "wmh.crx" file. 

Then, in Chrome, navigate to "chrome://extensions/" and then drag the file into the window. When prompted, click to allow the extension.

You'll be prompted by Gmail to give authorization: sign in to the Gmail account you wish to use the extension for.

After that, you should be all set! Open up your inbox and navigate to any email that has a winmail.dat attachment. You should see the body of the email update to the correct formating in a few seconds.

## Inspiration
If you've ever opened an email from a university faculty member in a email client like Gmail, you probably noticed a weird "winmail.dat" file attached below. This file is generated when an email is sent from a Microsoft Outlook/Exchange account to a non-outlook recipient, and is encoded in Microsoft's "TNEF" format which isn't normally readable. 

When an email is sent to a non-outlook recipient, most formatting data is stripped away and encoded in this file. In the best case, some simple styling and font information might be lost. In the worst case, entire things like tables might be lost, making the email possibly unreadable.

## What it does
Our chrome extension will run in the background when you are accessing your Gmail inbox. It checks the email you are currently looking at, and if it detects a TNEF encoded attachment it extracts the relevant formatting information from the file and automatically displays it as the message body.

## How we built it
Our chrome extension is built using HTML and JavaScript. We used the Gmail API to be able to read users emails/attachments, so the user has to grant authorization when using the extension. Using JavaScript, we parse the userID and messageID from the HTML of the email they are looking at, and use that with the API to get the emails attachment. 

Once we have the attachment, we send the attachment to our Google Cloud server, which is running a web server using Python and Flask. Here, we used the open source Python library [tnefparse](https://github.com/koodaamo/tnefparse) to extract the HTML data from the attachment. That HTML is then sent back to the extension, where it is then added to the web page to give a seamless viewing experience.
