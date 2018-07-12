require( "dotenv" ).config()

const { UserService, ServiceBus, DeviceService } = require( "./index.js" )


global.userService = new UserService()
global.serviceBus = new ServiceBus()
global.deviceService = new DeviceService()

setInterval(() => {}, 1 << 30);
console.log( "DEBUG Server started" )