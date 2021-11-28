'use-strict'
const readline = require('readline-sync')
const console = require('console')
const info = require('./Info')

class Display {
  
  //While in the general menu, prompts the user for input
  getInput(question) {
    return readline.question(question).toLowerCase()
  }

  
   // Prints info to the console
  print(info) {
    console.log(info)
  }

  
   // The update info is printed if a next page exists. 
   // Otherwise, if the user chooses to cease paging through ticket results or next page doesn't exist,
   // the cancel info is printed 
  printNextPageinfo(continueScrolling, nextPageExists) {
    if (continueScrolling) {
      this.print(nextPageExists ? info.moreTicketsComing : info.allTicketsReceived)
    } else this.print(info.cancel)
  }

  // Prints out all tickets retrieved from Zendesk API.
   printAllTickets(tickets) {
    this.print(info.success)
    let values=[]
    tickets.forEach(ticket => values.push(ticket.getSummaryDetails()))
    console.table(values)
    // Prints page / number of pages
    this.print(`\n${tickets.page}/${tickets.count / tickets.perPage}`)
  }

  
  // Prints out a single ticket returned from Zendesk API.
  printSingleTicket(ticket) {
    if (ticket) {
      this.print(info.success)
      this.print(ticket.getAllDetails())
    }
  }
}

module.exports = Display
