const color = {
  subjectPadding: 30,
  descriptionPadding: 60,
  // Fonts for messages
  recolor: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underline: '\x1b[4m',
  fgRed: '\x1b[31m',
  fgGreen: '\x1b[32m',
  fgYellow: '\x1b[33m',
  fgBlue: '\x1b[34m',
  fgMagenta: '\x1b[35m',
  fgCyan: '\x1b[36m'
}

module.exports = {
  main:
    `\nType "${color.fgGreen}menu${color.recolor}" to view options` +
    ` or "${color.fgGreen}exit${color.recolor}" to close the program.` +
    `\n${color.fgBlue}>${color.recolor}`,
  menu:
    `\n• Press "${color.fgBlue+ color.bright}1${color.recolor}" to view all tickets\n` +
    `• Press "${color.fgBlue+ color.bright}2${color.recolor}" to view a ticket\n• Type` +
    ` "${color.fgBlue+ color.bright}exit${color.recolor}"" to close the program`,
  id: `\n${color.fgBlue+ color.bright}Enter ticket id..${color.recolor}`,
  welcome: `${color.bright + color.fgGreen}Welcome to the Ticket Viewer${color.recolor}`,
  goodbye:
    `${color.fgGreen + color.bright}\nThank you for using the Ticket` +
    ` Viewer :)${color.fgGreen+ color.bright} Goodbye!\n${color.recolor + color.fgCyan}` +
    `\nBy Gariman Kohli\n`,
  invalidInput: `\n${color.dim}Sorry, invalid command entered!${color.recolor}`,
  success: `${color.fgGreen}Sucessfully Retrieved Tickets${color.recolor}\n`,
  fetch: `${color.fgYellow}Retrieving tickets from zendesk..${color.recolor}`,
  moreTicketsComing: `${color.fgBlue}Fetching more tickets..${color.recolor}`,
  allTicketsReceived: `\n${color.fgGreen}All tickets received.${color.recolor}`,
  continueScrolling:
    `\nPress enter to continue scrolling or type anything to stop..\n` +
    `${color.fgRed}>${color.recolor}`,
  cancel: `\n${color.fgYellow}Exiting Page Scroll${color.recolor}`
}
