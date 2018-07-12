const table = require( "../table" )

class DeviceService {

  constructor() {
    this.devices = []
    this.deviceById = {}
    this.devicesByContact = {}
  }

  async loadDevice( partitionKey, rowKey ) {
    console.log( "NOT IMPLEMENTED", { partitionKey, rowKey } )
  }

  async load() {
    let records = table.devices.query()
    let devices = []
    while ( records.next ) {
      try {
        records = await records.next()
        records
          .forEach( ( record ) => {
            this.deviceById[ record.deviceId ] = record
            devices.push( record )
          } )
      } catch ( err ) {
        console.error( err )
      }
    }
    this.devices = devices
    return devices
  }
}

module.exports = DeviceService