const table = require( "../table" )

class DeviceService {

  constructor( { autoconnect = true } = {} ) {
    this.devices = []
    this.deviceById = {}
    this.devicesByContact = {}
    if ( autoconnect ) this.load()
  }

  async loadDevice( { deviceId } ) {
    await this.load()
    return this.deviceById[deviceId]
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