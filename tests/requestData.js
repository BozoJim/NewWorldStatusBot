const request = require('../scripts/requestData')
request.getData().then((result) => console.log(result))

request.getData('Olympus').then((result) => console.log(result))
