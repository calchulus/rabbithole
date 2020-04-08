import { setClient, uniClient, nexusClient, manaClient } from '../apollo/client'
import { UNI_POOL_QUERY, SET_OWNER_QUERY, NEXUS_QUERY, MANA_QUERY } from '../apollo/queries'
const EthmojiAPI = require('ethmoji-js').default

const questList = {
  ENS: {
    name: 'ENS-101',
    blurb: 'Register an ENS name',
    task: 'Register an ENS name to your Ethereum address.',
    description:
      'Ethereum Name Service (ENS) is a distributed, extensible naming system based on the Ethereum blockchain that can be used to resolve a wide variety of resources such as Ethereum addresses.',
    resource: 'app.ens.domains/',
    platform: 'ENS',
    category: 'Profile',
    categoryColor: '#6955F6',
    color: '#5183FE',
    imgPath: 'enspng.png',
    type: 'side-quest',
    points: 100,
    progress: 0
  },
  UNI_POOL: {
    name: 'UNI-101',
    blurb: 'Supply liquidity in Uniswap',
    task: 'Supply liquidity to at least 1 pool on Uniswap.',
    description: 'Uniswap is a protocol for automated token exchange on Ethereum.',
    resource: 'www.uniswap.exchange',
    platform: 'Uniswap',
    category: 'Finance',
    categoryColor: '#8DFBC9',
    color: '#DC6BE5',
    imgPath: 'uniswap.png',
    type: 'track',
    points: 200,
    progress: 0
  },
  UNI_POOL_ADVANCED: {
    name: 'UNI-300',
    blurb: 'Supply 0.5ETH liquidity in Uniswap',
    task: 'Supply at least 0.5 ETH on Uniswap.',
    description: 'Uniswap is a protocol for automated token exchange on Ethereum.',
    resource: 'www.uniswap.exchange',
    platform: 'Uniswap',
    category: 'Finance',
    categoryColor: '#8DFBC9',
    color: '#DC6BE5',
    imgPath: 'uniswap.png',
    type: 'track',
    points: 200,
    progress: 0
  },
  POAP: {
    name: 'POAP-100',
    blurb: 'Attend an EF event',
    task: 'Acquire a POAP NFT for attending an EF event.',
    description: 'POAP is a proof-of-attendance-protocol.',
    resource: 'https://opensea.io/assets/poap-v2',
    platform: 'POAP',
    category: 'Events',
    categoryColor: '#8DFBC9',
    color: '#DC6BE5',
    imgPath: 'poap.png',
    type: 'track',
    points: 1000,
    progress: 0
  },
  SET: {
    name: 'SET-101',
    blurb: 'Buy a token set on Set Protocol',
    task: 'Buy a token set on Set Protocol.',
    description:
      'Set Protocol is a platform on Ethereum that enhances your portfolio with automated asset management strategies.',
    resource: 'https://www.tokensets.com/',
    platform: 'Set Protocol',
    category: 'Finance',
    categoryColor: '#8DFBC9',
    color: '#ECC251',
    imgPath: 'set.svg',
    type: 'track',
    points: 100,
    progress: 0
  },
  NEXUS: {
    name: 'NEXUS-101',
    blurb: 'Own a piece of nexus mutual',
    task: 'Buy NXM from Nexus Mutual to become a backer in the system.',
    description:
      'Nexus Mutual uses the power of Ethereum so people can share risk together without the need for an insurance company.',
    resource: 'https://nexusmutual.io/',
    platform: 'Nexus Mutual',
    category: 'Insurance',
    categoryColor: '#8DFBC9',
    color: '#60D3A2',
    imgPath: 'nexus.jpg',
    type: 'track',
    points: 200,
    progress: 0
  },
  MANA: {
    name: 'MANA-101',
    blurb: 'Own a parcel of Decentraland',
    task: 'Obtain at least 1 LAND parcel in your wallet.',
    description:
      'Decentraland is a virtual reality platform powered by the Ethereum blockchain that allows users to create, experience, and monetize content and applications',
    resource: 'https://decentraland.org/',
    platform: 'Decentraland',
    category: 'Games',
    categoryColor: '#E5B010',
    color: '#FF0055',
    imgPath: 'mana.svg',
    type: 'track',
    points: 200,
    progress: 0
  },
  MOJI: {
    name: 'MOJI-101',
    blurb: 'Create an ethmoji',
    task: 'Own at least 1 ethmoji.',
    description: 'Ethmoji is an avatar that you can digitally own.',
    resource: 'https://ethmoji.io/',
    platform: 'Ethmoji',
    category: 'Profile',
    categoryColor: '#8DFBC9',
    color: '#E052B8',
    imgPath: 'ethmoji.png',
    type: 'side-quest',
    points: 300,
    progress: 0
  }
}

export const fetchQuests = async function(ENSName, account) {
  return Promise.all(
    Object.keys(questList).map(async key => {
      let quest = questList[key]
      if (key === 'ENS') {
        if (ENSName) {
          quest.progress = 100
        }
      }
      if (key === 'UNI_POOL') {
        let result = await uniClient.query({
          query: UNI_POOL_QUERY,
          fetchPolicy: 'cache-first',
          variables: {
            user: account
          }
        })
        if (result.data.userExchangeDatas) {
          let supplied = false
          Object.keys(result.data.userExchangeDatas).map(key => {
            let exchange = result.data.userExchangeDatas[key]
            if (exchange.tokensDeposited > 0) {
              supplied = true
            }
            return true
          })
          if (supplied) {
            quest.progress = 100
          }
        }
      }
      if (key === 'UNI_POOL_ADVANCED') {
        let result = await uniClient.query({
          query: UNI_POOL_QUERY,
          fetchPolicy: 'cache-first',
          variables: {
            user: account
          }
        })
        if (result.data.userExchangeDatas) {
          let supplied = 0
          Object.keys(result.data.userExchangeDatas).map(key => {
            let exchange = result.data.userExchangeDatas[key]
            supplied += parseFloat(exchange.ethDeposited)
          })
          quest.progress = parseFloat(supplied) / 0.5 * 100
        }
      }
      if (key === 'POAP') {
        var request = require('request')
        var options = { method: 'GET', url: 'https://api.opensea.io/api/v1/collections?asset_owner=' + account }
        request(options, function(error, response, body) {
          if (!error && body.length > 0) {
            var result = JSON.parse(body)
            result.map(item => {
              if (item.name === 'POAP') {
                quest.progress = 100
              }
              return true
            })
          }
        })
      }
      if (key === 'SET') {
        let result = await setClient.query({
          query: SET_OWNER_QUERY,
          fetchPolicy: 'cache-first',
          variables: {
            user: account
          }
        })
        if (result.data) {
          if (result.data.issuances && result.data.issuances.length > 0) {
            quest.progress = 100
          }
        }
      }
      if (key === 'NEXUS') {
        try {
          let result = await nexusClient.query({
            query: NEXUS_QUERY,
            fetchPolicy: 'cache-first',
            variables: {
              user: account
            }
          })
          if (result.data.member) {
            quest.progress = 100
          }
        } catch (e) {}
      }
      if (key === 'MANA') {
        let result = await manaClient.query({
          query: MANA_QUERY,
          fetchPolicy: 'cache-first',
          variables: {
            user: account
          }
        })
        if (result.data.parcels) {
          quest.progress = 100
        }
      }
      if (key === 'MOJI') {
        const ethmojiAPI = new EthmojiAPI(global.web3.currentProvider)
        try {
          await ethmojiAPI.init()
          const avatar = await ethmojiAPI.getAvatar(account)
          if (avatar) {
            quest.progress = 100
          }
        } catch (error) {
          console.log(error.message)
        }
      }
      return quest
    })
  )
}
