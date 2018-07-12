const table = require( "../table" )

class UserService {

  constructor( { autoconnect = true } ) {
    this.users = []
    this.userById = {}
    if ( autoconnect ) this.load()
  }

  async loadUser( partitionKey, rowKey ) {
    console.log( "NOT IMPLEMENTED", { partitionKey, rowKey } )
  }

  async load() {
    let records = table.users.query()
    let users = []
    while ( records.next ) {
      try {
        records = await records.next()
        records
          .forEach( ( record ) => {
            this.userById[ record.id ] = record
            users.push( record )
          } )
      } catch ( err ) {
        console.error( err )
      }
    }
    this.users = users
    return users
  }
}

module.exports = UserService