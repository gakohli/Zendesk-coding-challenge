'use-strict'
class Ticket {
  
  constructor(object) {
    object = typeof object === 'object' ? object : {}
    this.id = object.id || 0
    this.subject = object.subject || 'None'
    this.description = object.description || 'None'
    this.requesterId = object.requester_id || 0
  }

// Returns string of ticket summary
getSummaryDetails() {
    return (
        {
          "Id": this.id,
          "Subject": this.subject,
          "Description": this.description.substr(0,50).trim()
        }
    );
  }

// Returns string of all tickets
  getAllDetails() {
    return (
      '\x1b[33mRequester: \x1b[0m'+
      this.id +
      '\n\x1b[33mId: \x1b[0m'+
      this.requesterId +
      '\n\x1b[33mSubject: \x1b[0m' +
      this.subject +
      '\n\x1b[33mDescription: \x1b[0m' +
      this.description
    )
  }
}

module.exports = Ticket
