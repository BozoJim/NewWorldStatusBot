const bent = require('bent')
const getJSON = bent('json')

module.exports = {
  getData: async function getData(server) {
    let response = await getJSON('https://nwdb.info/server-status/servers.json?worldId=7aeea1ba2301')
    let filteredResponse = response.data.servers.filter((item) => item.worldName === server)[0]

    const expectedFormat = [
      "connectionCountMax",
      "connectionCount",
      "queueCount",
      "queueTime",
      "worldName",
      "worldSetName",
      "region",
      "status",
      "active",
      "worldId"
    ]

    let formattedResponse = {}
    for (let index = 0; index < expectedFormat.length; index++) {
      formattedResponse[expectedFormat[index]] = filteredResponse[index]
    }
    
    let current = formattedResponse.connectionCount
    let max = formattedResponse.connectionCountMax
    let onlinePlayers = playersOnline(current, max)
    let queue = formattedResponse.queueCount
    let queueTime = formattedResponse.queueTime
    queueTime = timeDisplay(queueTime)
    let world = formattedResponse.worldName
    let worldSet = formattedResponse.worldSetName
    let region = formattedResponse.region
    region = regionConvert(region)
    let status = translateStatus(formattedResponse.status)
    let active = formattedResponse.active // Used by amazon to decide if they should show the list in the game browser.
    let worldId = formattedResponse.worldId // we don't need this
    let characterCreation = characterCreationLocked(status)

    let stringResponse =
`Status:  ${status}
World:  ${world}
World Set:  ${worldSet}
Character Creation:  ${characterCreation}
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
    case 8:
      return 'Online';
    case 1:
      return 'Maintenance'
    default:
      return 'Down'
  }
}

function characterCreationLocked(serverStatus) {
  switch (serverStatus) {
    case 0:
    case 1:
    case 2:
      return 'Unlocked';
    default:
      return 'Locked'
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
