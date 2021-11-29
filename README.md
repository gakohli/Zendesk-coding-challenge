Zendesk-Coding-Challenge
A CLI based application that is written in Node.js. The app makes REST calls to the Zendesk API to retrieve all tickets details in either a summary table or single ticket format.

Prerequisite Installations
NodeJS v16.13.0 or greater
NPM v8.1.0 or greater
How to run (MacOS/Windows)
Download the repository to your local machine with the following code.
$ git clone https://github.com/gakohli/Zendesk-coding-challenge.git

Install all npm modules with the following code.
$ npm install

Run the program with the following code.
$ npm start

Run Tests
Run the tests with the following code
$ npm test

Architectural Design Overview
Assumptions
The command-line interface (CLI) is well-known among users.
The Zendesk API always returns JSON with the same structure for ticket queries.
The Zendesk API will always return JSON with the same structure for error responses.

Main Component Description
index.js is the program's entry point, and it exchanges data between components.
Ticket.js is a ticket data model.
APIConnect.js: Sends requests to the Zendesk API and receives responses in the form of tickets.
Prints output and accepts user input with Display.js.
Info.js: This file contains generic text for output, prompts, and warnings, among other things.

Design Choices
Initially, I utilized a get request with Basic authentication as my primary means of passing credentials to the API, but after reviewing the Zendesk developer documentation, I realized that hardcoding the admin username and password into a client application is far too risky.

Display tickets in a list & Display individual ticket details
I discovered that putting all of the string output methods and features in the Display class resulted in an absurd amount of redundant code and made readability difficult. I chose to add toString methods to the Ticket class for both summary and full information outputs, and I moved the majority of string output to a separate Info.js Object. By transferring the majority of the generic string output to the Info.js Object, we were able to:

Make the Display.js class file more readable.
Use a more succinct naming convention for all text output, such as display.print (info.goodbye).
When more than 25 tickets are returned, go through them one by one.

I intended to have the APIConnect fetch up to 100 tickets every request and display ten tickets per page. Allow the user to cycle through the tickets until they were all filled out, however I found this kind of logic to be unintuitive and tiresome, as the computations for something as simple as the current page number became fairly cumbersome. Also, retrieving the maximum number of tickets each request meant wasting bandwidth if the user left after the first page, so I felt it would be best to allow APIConnect to pull only twenty-five tickets every request and then display the complete twenty-five tickets in console. This meant:

Users just had to send network requests for the quantity of pages they wanted to see.
Because the server handled much of the pagination processing, the code was cleaner and more readable.

Helpful Resources:
https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#show-ticket
https://developer.zendesk.com/api-reference/ticketing/introduction/#basic-authentication
https://developer.zendesk.com/api-reference/ticketing/introduction/#pagination
https://support.zendesk.com/hc/en-us/articles/4408845965210
https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
