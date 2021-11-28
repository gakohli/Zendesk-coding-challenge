'use-strict'
const APIConnect = require('./APIConnect')
const Ticket = require('../Ticket/Ticket')
const { TOKEN } = require('../../config')

describe('APIConnect', () => {
  // Display all tickets
  it('DISPLAY ALL TICKETS: display tickets when correct credentials entered', async () => {
    const requester = new APIConnect(TOKEN)
    const apiResponse = await requester.fetchAllTickets()
    const result = await apiResponse()
    expect(result[0] instanceof Ticket).toBeTruthy()
  })

  it('return null for all tickets when incorrect credentials entered', async () => {
    const requester = new APIConnect('token')
    const apiResponse = await requester.fetchAllTickets()
    expect(await apiResponse()).toBeNull()
  })

  // Display ticket by id
  it('DISPLAY SINGLE TICKET: display a ticket when correct credentials entered', async () => {
    const requester = new APIConnect(TOKEN)
    const ticket = await requester.fetchTicketById(2)
    expect(ticket instanceof Ticket).not.toBeNull()
  })

  it('return null for single ticket when incorrect credentials entered', async () => {
    const requester = new APIConnect('username', 'password')
    const apiResponse = await requester.fetchTicketById(2)
    expect(apiResponse).toBeNull()
  })

  it('return null for single ticket when invalid ticket id is entered', async () => {
    const requester = new APIConnect(TOKEN)
    const apiResponse = await requester.fetchTicketById(-100)
    expect(apiResponse).toBeNull()
  })

  it('return null for single ticket when provided valid number, but ticket does not exist', async () => {
    const requester = new APIConnect(TOKEN)
    const id = 10000000
    const apiResponse = await requester.fetchTicketById(id)
    expect(apiResponse).toBeNull()
  })

  // Format tickets
  it('format all tickets correctly when passed empty objects', () => {
    const requester = new APIConnect()
    const mock = [{}, {}, {}]
    expect(requester.formatTickets(mock)).toEqual([
      new Ticket(),
      new Ticket(),
      new Ticket()
    ])
  })

  // Handle errors
  it('give error for unknown status code received by Zendesk API', () => {
    const requester = new APIConnect(TOKEN)
    const mock = {
      status: -1,
      ok: false,
      statusText: 'mock'
    }
    try {
      requester.handlesErrors(mock)
    } catch (error) {
      expect(error).toContain(mock.statusText)
    }
  })

  it('return value of page number passed into url query string', () => {
    const requester = new APIConnect(TOKEN)
    let pageNumber = 10
    const url = `https://zendeskcodingchallenge8808.zendesk.com/api/v2/tickets.json?per_page=${perPage}`
    const result = requester.getPageNumberFromUrl(url)
    expect(result).toEqual(--pageNumber)
  })

  it('return -1 if argument is not of type string', () => {
    const requester = new APIConnect(TOKEN)
    const mock = {}
    const result = requester.getPageNumberFromUrl(mock)
    expect(result).toEqual(-1)
  })
})
