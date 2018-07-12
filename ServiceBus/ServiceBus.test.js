require( "dotenv" ).config()
const ServiceBus = require( "./ServiceBus" )
let bus

it( "can connect", async () => {
  expect.assertions( 1 );
  bus = new ServiceBus( { queueName: "trips", autoConnect: false } )
  const ack = await bus.connect( "trips" )
  expect( ack ).toEqual( true )
} )

it( 'can send events', async () => {
  expect.assertions( 1 );
  const data = await bus.send( { body: "test", customProperties: { test: true } } )
  expect( data ).toEqual( { message: { body: 'test', customProperties: { test: true } } } )
} )


it( 'can receive events', async () => {
  expect.assertions( 1 );
  const data = await bus.receive()
  expect( data ).toBeTruthy()
} )
