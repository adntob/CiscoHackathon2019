# xAPI examples

This example is just a list of commands you can test from the command line / TShell.
It shows many different features that the video device supports, and how you can monitor and manipulate them through the api. We indicate how to setup listeners first for each feature, so that you can see what feedback is generated whenever you initiate the commands.

You can stop all feedback at any time by typing
`xfeedback deregisterall`

## Video calls

Get notified about call status changes:
`xfeedback register status/call`

Start a call:
`xCommand Dial Number: fireplace@ivr.vc`

Mute yourself:
`xcommand Audio Microphones Mute`

Change volume:
`xcommand Audio Volume Set Level: 33`

Generate a touch tone press (try this with the fireplace call for a nice surprise :)
`xcommand call DTMFSend DTMFString: 5`

Turn on self view:
`xcommand Video Selfview Set Mode: On`

End call:
`xCommand Call Disconnect`

## Screen sharing

You need laptop or similar connect with cable to the video device to test.

Start a presentation:
`xCommand Presentation Start`

Start a presentation:
`xCommand Presentation Stop`

## Meetings

See if there any meetings booked:
`xcommand Bookings List`

(There's currently no way to book meetings with our APIs)

## User interface stuff

Listen to events:
`xfeedback register Event/UserInterface`

Show an alert on screen:
`xcommand UserInterface Message Alert Display Title: "Fire alarm" Text: "Please evacuate the buidling and meet at the assembly point outside the garage" `

Hide the alert;
`xcommand UserInterface Message Alert Clear`

Show a dialog with options (When the user chooses an option, an event is generated):
`xcommand UserInterface Message Prompt Display Text: "How did you like the presentation?" Option.1: Great Option.2: Average Option.3: Poor FeedbackId: mypoll`

## Web views

Open a web view on the main screen:
`xCommand UserInterface WebView Display Url: http://kyberheimen.com/pong`

Close the web view:
`xCommand UserInterface WebView Display Clear`




TODO
people count
standby
set custom message on home screen
set auto answer
