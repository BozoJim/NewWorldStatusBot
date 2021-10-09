const bent = require('bent')
const getJSON = bent('json')

module.exports = {
  getData: async function getData(server) {
    // Server defaults to Atvatabar if nothing is provided
    server = (server == undefined) ? 'Atvatabar' : server

    let response = await getJSON('https://nwdb.info/server-status/data.json')
    let filteredResponse = response.data.servers.filter((item) => item.worldName === server)[0]
    
    let current = filteredResponse.connectionCount
    let max = filteredResponse.connectionCountMax
    let onlinePlayers = playersOnline(current, max)
    let queue = filteredResponse.queueCount
    let queueTime = filteredResponse.queueTime
    queueTime = timeDisplay(queueTime)
    let world = filteredResponse.worldName
    let worldSet = filteredResponse.worldSetName
    let region = filteredResponse.region
    region = regionConvert(region)
    let status = translateStatus(filteredResponse.status)
    let active = filteredResponse.active // no idea what this is used for

    let stringResponse =
`Status:  ${status}
World:  ${world}
World Set:  ${worldSet}
Region:  ${region}
Online Players:  ${onlinePlayers}
In Queue:  ${queue}
Queue Time:  ${queueTime}`

    return stringResponse
  }
}

function translateStatus(serverStatus) {
  switch (serverStatus) {
    case 0:
      return 'Online';
    case 1:
      return 'Maintenance'
    default:
      return 'Down'
  }
}

function playersOnline(current, max) {
  return `${current} / ${max}`
}

function timeDisplay(time) {
  if (time < 60) {
    return `${time}s`
  } else {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    return `${minutes}m ${seconds}s`
  }
}

function regionConvert(region) {
  switch (region) {
    case 'us-east-1':
      return 'US East'
    case 'us-west-1':
      return 'US West'  
    default:
      return region
  }
}
