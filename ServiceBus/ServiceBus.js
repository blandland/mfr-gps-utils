const azure = require( "azure" )
const QUEUE_NAME = "Trips"

class ServiceBus {

  constructor( { queueName = QUEUE_NAME, autoConnect = true } = {} ) {
    if ( !queueName ) throw new Error( "queueName not set" )
    this.queueName = queueName
    this.bus = azure.createServiceBusService()
    autoConnect && this.connect( queueName )
  }

  connect( queueName ) {
    return new Promise( ( resolve, reject ) => {
      this.trips = this.bus.createQueueIfNotExists( queueName, ( error ) => {
        if ( error ) {
          reject( error )
        }
        resolve( true )
      } )
    } )
  }

  unlockMessage( lockedMessage ) {
    this.bus.unlockMessage( lockedMessage )
  }

  delete( lockedMessage ) {
    return new Promise( ( resolve, reject ) => {
      this.bus.deleteMessage( lockedMessage, function ( deleteError ) {
        if ( !deleteError ) {
          reject( deleteError )
        } else {
          resolve( true )
        }
      } )
    } )
  }

  receive() {
    return new Promise( ( resolve, reject ) => {
      this.bus.receiveQueueMessage( this.queueName, { isPeekLock: true }, function ( error, message ) {
        if ( error ) {
          console.error( "ERROR: " + error )
          reject( error )
        }
        if ( !error ) {
          resolve( message )
        }
      } )
    } )
  }

  send( { body, queueName = this.queueName, customProperties = {} } ) {

    var message = {
      body,
      customProperties
    }
    return new Promise( ( resolve, reject ) => {
      this.bus.sendQueueMessage( queueName, message, function ( error ) {
        if ( error ) {
          console.error( "Error sending to Service Bus : " + error )
          reject( error )
        }
        if ( !error ) {
          resolve( { message } )
        }
      } )
    } )
  }
}

module.exports = ServiceBus