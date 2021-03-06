const bent = require('bent')
const getJSON = bent('json')

module.exports = {
  getData: async function getData(serverQuery) {
    let response, filteredResponse;

    if (serverQuery === undefined || serverQuery.toLowerCase() === 'atvatabar') {
      response = await getJSON('https://nwdb.info/server-status/servers.json?worldId=7aeea1ba2301')
      filteredResponse = response.data.servers[0]
    } else {
      response = await getJSON('https://nwdb.info/server-status/servers.json')
      let serverIndex = response.data.servers.map((server) => server[4].toLowerCase()).indexOf(serverQuery.toLowerCase())
      if (serverIndex > -1) {
        filteredResponse = response.data.servers[serverIndex]
      } else {
        return `No results found for ${serverQuery}`
      }
    }

    
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
    let characterCreation = characterCreationLocked(formattedResponse.status)

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
    case 4:
    case 12:
      return 'Maintenance'
    default:
      return 'Down'
  }
}

function characterCreationLocked(serverStatus) {
  switch (serverStatus) {
    case 0:
    case 4:
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
    case 'us-west-2':
      return 'US West'
    case 'ap-southeast-2':
      return 'AP Southeast'
    case 'eu-central-1':
      return 'EU Central'
    case 'sa-east-1':
      return 'SA East'
    default:
      return region
  }
}
