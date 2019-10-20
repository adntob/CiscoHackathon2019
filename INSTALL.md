<img src="./images/logo.png" style="width: 40%; margin-left: 30%;" />

# Examples Setup Guide

There are a couple of tools you need for the Cisco Webex Device examples:

## Command line tool

The command line tool is necessary to build the examples with npm, run web server etc.

* Mac: use the **Terminal** app
* Windows 10: use **PowerShell** (Run as administrator)
* Linux - you probably know already

## Git

The industry standard code versioning tool. Find it here if you don't already have it:

* Mac: https://desktop.github.com/
* Windows 10: https://git-for-windows.github.io/ - Make sure to select "Use Git from the Windows Command Prompt"
* Linux: `sudo apt install git`

## Node.js and npm

* Mac & Windows 10: https://nodejs.org/en/download/
* Linux: `sudo apt install nodejs`

## Setup the examples

Once you have basic tools installed, install the Hackathon examples:

* Clone the public repo:

`git clone https://bitbucket.org/bjolseth/ntnu-hackathon/src/master/`

* Install the dependencies:

```
cd ntnu-hackathon
npm install
```

You are now ready to run the examples. Each one in the `examples/` folder has its own README.md instructionst file. To test that your basic setup is working, do the following:

`npm run webserver`

This should produce the following output, and start a web server on `http://localhost:3000`:

> Example app running on http://localhost:3000
