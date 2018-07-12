require( "dotenv" ).config()

const DeviceService = require( "./DeviceService" )
let userService

it( "can load users", async () => {
  expect.assertions( 1 );
  userService = new DeviceService()
  const ack = await userService.load()
  expect( ack ).toBeTruthy()
} )
