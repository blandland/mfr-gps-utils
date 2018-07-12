require( "dotenv" ).config()

const UserService = require( "./UserService" )
let userService

it( "can load users", async () => {
  expect.assertions( 1 );
  userService = new UserService()
  const ack = await userService.load()
  expect( ack ).toBeTruthy()
} )
