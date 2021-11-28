'use-strict'
const fetch = require('node-fetch')
const fetchHeaders = require('fetch-headers')
const Ticket = require('../Ticket/Ticket')
const console = require('console')
// Disables console during test
console.log = process.env.NODE_ENV != 'test' ? console.log : function() {}

class HttpTicketRequest {
  
  // Basic Auth to authenticate the user 
  constructor(username,password) {
	this.login=Buffer.from(username + ':' + password).toString('base64');
    this.headers = new fetchHeaders()
    this.headers.append('Authorization', 'Basic ' + this.login)
    this.headers.append('method', 'POST')
  }

  // Returns list of tickets from the Zendesk API
  async fetchAllTickets() {
    const perPage = 25
    let url = `https://zendeskcodingchallenge8808.zendesk.com/api/v2/tickets.json?per_page=${perPage}`
    let page = 0
    return async () => {
      if (url != null) {
        let apiResponse = await this.fetchRequest(url)
        if (apiResponse != null) {
          let result = this.formatTickets(apiResponse.tickets)
          url = apiResponse.next_page
          result.nextPage = apiResponse.next_page
          result.page = this.getPageNumberFromUrl(url)
          result.page = result.page === -1 ? ++page : result.page
          result.count = apiResponse.count
          result.perPage = perPage
          page = result.page
          return result
        } else return null
      }
    }
  }

  // Returns single ticket by id from the Zendesk API
  async fetchTicketById(ticketId) {
    let url = `https://zendeskcodingchallenge8808.zendesk.com/api/v2/tickets/${ticketId}.json`
    let apiResponse = await this.fetchRequest(url)
    return apiResponse ? new Ticket(apiResponse.ticket) : null
  }

 // Fetch request promise
  async fetchRequest(url) {
    return fetch(url, { headers: this.headers })
      .then(this.handlesErrors)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  // Error handling for fetch request promise
  handlesErrors(response) {
    if (!response.ok) {
      console.log('\x1b[31mAPI Request Issue..')
      switch (response.status) {
        case 401:
          throw response.statusText + ": Couldn't authenticate you\x1b[0m"
        case 404:
          throw response.statusText + ': Ticket not found\x1b[0m'
        case 400:
          throw response.statusText + ': Invalid Ticket Id\x1b[0m'
        default:
          throw response.statusText + '\x1b[0m'
      }
    }
    return response
  }

  // Returns page number of URL
  getPageNumberFromUrl(url) {
    return typeof url === 'string'
      ? --url.match(/\?page=[0-9]*[0-9]/g)[0].split('=')[1]
      : -1
  }

  // Return array with ticket objects
  formatTickets(ticketsList) {
    return ticketsList.map(ticketObject => {
      return new Ticket(ticketObject)
    })
  }
}

module.exports = HttpTicketRequest
