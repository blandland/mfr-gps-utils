// console.log( `process.env.AZURE_STORAGE_CONNECTION_STRING`, process.env.AZURE_STORAGE_CONNECTION_STRING )
var account = process.env.AZURE_STORAGE_ACCOUNT
var key     = process.env.AZURE_STORAGE_KEY
var storage = require( "azure-storage-simple" )( account, key )

const devices = storage.table( "devices" )
const sms     = storage.table( "sms" )
const health  = storage.table( "health" )
const events  = storage.table( "events" )
const stream  = storage.table( "stream" )
const trips  = storage.table( "trips" )
const users  = storage.table( "users" )

const table = {
  sms,
  devices,
  health,
  events,
  stream,
  trips,
  users,
}

module.exports = table


