'use-strict'
//Starting point of the app
;(async function main() {
const Display = require('./Display')
const info = require('./Info')
const APIConnect = require('./helpers/APIConnect/APIConnect')
const { MENU, EXIT, DISPLAY_ALL_TICKETS, DISPLAY_TICKET_BY_ID, USERNAME, PASSWORD,TOKEN } = require('./config')
const display = new Display()
//const request = new APIConnect(TOKEN)
const request = new APIConnect(USERNAME,PASSWORD)  
let KEEP_RUNNING = true
let input

display.print(info.welcome)

// Object having 4 user options i.e. MENU, EXIT, DISPLAY_ALL_TICKETS, DISPLAY_TICKET_BY_ID
const options = {
  [MENU]: () => {
    display.print(info.menu)
  },

  [EXIT]: () => {
    display.print(info.goodbye)
    KEEP_RUNNING = false
  },

  [DISPLAY_ALL_TICKETS]: async () => {
    const apiCaller = await request.fetchAllTickets()
    let moreTickets = true
    display.print(info.fetch)

    while (moreTickets) {
      const tickets = await apiCaller()
      if (tickets != null) {
        display.printAllTickets(tickets)
        moreTickets = tickets.nextPage && !display.getInput(info.continuemoreTickets)
        display.printNextPageinfo(moreTickets, tickets.nextPage)
      } else moreTickets = false
    }
  },

  [DISPLAY_TICKET_BY_ID]: async () => {
    const ticketId = display.getInput(info.id)
    display.print(info.fetch)
    display.printSingleTicket(await request.fetchTicketById(ticketId))
  }
}


while (KEEP_RUNNING) {
  input = display.getInput(info.main)

  if (input in options) {
    await options[input]()
  } else {
    display.print(info.invalidInput)
  }
}

})()
