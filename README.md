
As per 2019, Cisco Webex Devices supports a large and varied API set. All components are documented well by themselves, but it can be bewildering for customers and developers to understand which API technology to choose, and why. This guide describes gives a brief overview of the most important components, and when to choose one over the other. For each of the component ("puzzle piece"), there is a runnable example as well.

Quick Dictionary

* xAPI - the API language used to manipulate the video system, such as making calls, adjusting volume etc
* Macros - snippets of JavaScript code that customers can write that runs on the video system itself
* JSxAPI - JavaScript SDK for the xAPI, open source and available for eg NodeJS
* Cloud xAPI - RESTful xAPI access for cloud registered devices, works even without being on the same network as the video device
* User interface extensions - panels, buttons and widgets that can be added to the user interface of the video device to allow user to control lights, blinds, make speed dials etc
* In-room controls - the old name for User interface extensions
* Web apps - web pages running on the newer Webex devices with the Chromium web engine
* xAPI over web socket - ability for web browsers etc to speak directly to the xAPI over web socket. Requires that the web page provides username/password for the video system
* Bot apis - rest apis and web hooks for sending/receiving bot messages on Webex Teams

For each integration type:
- how it works
- an example, and screenshot
- when to use/not use it
- which devices support it
- required configs, flags, permissions etc
- since with version
- link to more documentation
