// config file
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
USERNAME: process.env.USERNAME,
PASSWORD: process.env.PASSWORD,
  MENU: 'menu',
  EXIT: 'exit',
  DISPLAY_ALL_TICKETS: '1',
  DISPLAY_TICKET_BY_ID: '2'
}
