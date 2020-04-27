import { 
  setClient, 
  uniClient, 
  nexusClient, 
  manaClient,
  cryptoKittiesClient,
  compoundClient,
  poolTogetherClient,
  ensClient,
  makerGovClient
} from '../apollo/client'
import { 
  UNI_POOL_QUERY, 
  SET_OWNER_QUERY, 
  NEXUS_QUERY, 
  MANA_QUERY, 
  KITTIES_BRED_QUERY,
  COMPOUND_QUERY,
  COMPOUND_INTEREST_QUERY,
  POOL_TOGETHER_QUERY,
  DCL_ENS_QUERY,
  MKR_SPELL_VOTES_QUERY
} from '../apollo/queries'
const EthmojiAPI = require('ethmoji-js').default
const Box = require('3box')

const questList = {
  BOX1: {
    name: '3BOX-101',
    blurb: 'Create a Profile',
    task: '',
    description: '',
    resource: '',
    platform: '3Box',
    color: '',
    imgPath: '3box.png',
    type: 'track',
    requisites: [],
    points: 250,
    progress: 0
  },
  BOX2: {
    name: '3BOX-102',
    blurb: 'Add a verified Twitter or Github',
    task: '',
    description: '',
    resource: '',
    platform: '3Box',
    color: '',
    imgPath: '3box.png',
    type: 'track',
    requisites: [],
    points: 400,
    progress: 0 
  },
  BOX3: {
    name: '3BOX-103',
    blurb: 'Join 4 spaces on 3Box',
    task: '',
    description: '',
    resource: '',
    platform: '3Box',
    color: '',
    imgPath: '3box.png',
    type: 'track',
    requisites: [],
    points: 400,
    progress: 0 
  },
  COMP1: {
    name: 'COMP-101',
    blurb: 'Supply tokens to Compound',
    task: '',
    description: 'Under the hood, when a user contributes their assets to a large pool of liquidity (a “market”) that is available for other users to borrow, they share in the interest that borrowers pay back to the pool.',
    resource: '',
    platform: 'Compound Finance',
    color: '',
    imgPath: 'compound.png',
    type: 'track',
    requisites: [],
    points: 250,
    progress: 0
  },
  COMP2: {
    name: 'COMP-102',
    blurb: 'Borrow tokens on Compound',
    task: '',
    description: 'Under the hood, when a user contributes their assets to a large pool of liquidity (a “market”) that is available for other users to borrow, they share in the interest that borrowers pay back to the pool.',
    resource: '',
    platform: 'Compound Finance',
    color: '',
    imgPath: 'compound.png',
    type: 'track',
    requisites: [],
    points: 500,
    progress: 0
  },
  COMP3: {
    name: 'COMP-201',
    blurb: 'Accrue 10 DAI worth of interest from supplying tokens',
    task: '',
    description: 'At every Ethereum block, your supplied assets earn interest paid by borrowers. Now see if you can earn 10 DAI worth of interest with your supplied assets!',
    resource: '',
    platform: 'Compound Finance',
    color: '',
    imgPath: 'compound.png',
    type: 'track',
    requisites: [],
    points: 750,
    progress: 0
  },
  ENS: {
    name: 'ENS-101',
    blurb: 'Register an ENS name',
    task: 'Register an ENS name to your Ethereum address.',
    description: 'ENS is managed through the ENS Manager currently. Go register a .eth domain and set the resolver to your address.',
    resource: 'manager.ens.domains/',
    platform: 'ENS',
    color: '#5183FE',
    imgPath: 'enspng.png',
    type: 'track',
    requisites: [],
    points: 250,
    progress: 0
  },
  KITTY1: {
    name: 'KITTY-101',
    blurb: 'Breed a CryptoKitty',
    task: '',
    description: 'CryptoKitties is one of the world’s first blockchain games. Each kitty has a unique genome that defines its appearance and traits. Players can breed their kitties to create new furry friends and unlock rare cattributes.',
    resource: '',
    platform: 'CryptoKitties',
    color: '',
    imgPath: 'cryptokitties.png',
    type: 'track',
    requisites: [],
    points: 250,
    progress: 0
  },
  MANA1: {
    name: 'MANA-101',
    blurb: 'Create your Decentraland Passport',
    task: 'Create your Decentraland Passport',
    description:
      'Customize your look, grab your Passport to manage your digital identity, and set off on an adventure. A single sign-on to connect all of your experiences in Decentraland.',
    resource: 'https://avatars.decentraland.org/',
    platform: 'Decentraland',
    color: '#FF0055',
    imgPath: 'mana.svg',
    type: 'track',
    requisites: [],
    points: 500,
    progress: 0
  },
  MANA2: {
    name: 'MANA-201',
    blurb: 'Get yourself some LAND',
    task: 'Get yourself some LAND',
    description:
      'Venturing into new territory. Grab some land and build up a scene to share with the 3d world inside Decentraland.',
    resource: 'https://avatars.decentraland.org/',
    platform: 'Decentraland',
    color: '#FF0055',
    imgPath: 'mana.svg',
    type: 'side-quest',
    requisites: [],
    points: 1000,
    progress: 0
  },
  MKR1: {
    name: 'MKR-101',
    blurb: 'Lock Dai in DSR and earn 1$ in interest',
    task: 'Lock Dai in DSR and earn 1$ in interest',
    description: 'The Dai Savings Rate (DSR) is a variable rate of accrual earned by locking Dai in the DSR smart contract. Dai holders can earn savings automatically and natively while retaining control of their Dai.',
    resource: 'https://oasis.app/save',
    platform: 'Maker Protocol',
    color: '',
    imgPath: 'makerdao.png',
    type: 'track',
    requisites: [],
    points: 250,
    progress: 0
  },
  MKR2: {
    name: 'MKR-102',
    blurb: 'Open a Vault',
    task: 'Open a Vault and create at least 1 Dai',
    description:
      'Any user who wishes to generate Dai may deposit Collateral into a Vault and do so, paying a Stability Fee on the generated Dai balance.',
    resource: 'https://oasis.app/borrow',
    platform: 'Maker Protocol',
    color: '',
    imgPath: 'makerdao.png',
    type: 'side-quest',
    requisites: ['MKR-101'],
    points: 200,
    progress: 0
  },
  MKR3: {
    name: 'MKR-103',
    blurb: 'Vote on Governance Poll',
    task: 'Vote on Governance Poll',
    description:
      'These occur on-chain and can be accessed through the Maker Foundation\'s Voting Portal. Governance Polls measure the sentiment of MKR voters.',
    resource: 'https://vote.makerdao.com/',
    platform: 'Maker Protocol',
    color: '',
    imgPath: 'makerdao.png',
    type: 'side-quest',
    requisites: ['MKR-102'],
    points: 200,
    progress: 0
  },
  MKR4: {
    name: 'MKR-104',
    blurb: 'Vote on Executive Spell',
    task: 'Vote on Executive Spell',
    description:
      'Executive Votes "execute" technical changes to the Maker Protocol. When active, each Executive Vote has a proposed set of changes being made on the Maker Protocol\'s smart-contracts. Unlike the other types of votes, Executive Votes use a \'Continuous Approval Voting\' model.',
    resource: 'https://vote.makerdao.com/',
    platform: 'Maker Protocol',
    color: '',
    imgPath: 'makerdao.png',
    type: 'track',
    requisites: [],
    points: 500,
    progress: 0
  },
  MKR5: {
    name: 'MKR-105',
    blurb: 'Bid on Flipper Auction',
    task: 'Bid on Flipper Auction',
    description:
      'Collateral Auctions are used to sell collateral from Vaults that have become undercollateralized in order to preserve the collateralization of the system. The Cat sends bitten collateral to the Flip module to be auctioned off to keepers.',
    resource: 'https://auctions.makerdao.com/',
    platform: 'Maker Protocol',
    color: '',
    imgPath: 'makerdao.png',
    type: 'track',
    requisites: [],
    points: 750,
    progress: 0
  },
  MKR6: {
    name: 'MKR-106',
    blurb: 'Lock MKR in Chief for 3 months',
    task: 'Lock MKR in Chief for 3 months',
    description:
      'Continuous Approval Voting secures the current proposal with the hat. Locking MKR in Chief helps secure the hat at the highest possible bar. "Vote or Dai" as we always say, if you\'re not voting with your MKR then you should be hodling Dai.',
    resource: 'https://vote.makerdao.com/',
    platform: 'Maker Protocol',
    color: '',
    imgPath: 'makerdao.png',
    type: 'side-quest',
    requisites: ['MKR-104'],
    points: 200,
    progress: 0
  },
  MKR7: {
    name: 'MKR-107',
    blurb: 'Lock MKR in Chief for 12 months',
    task: 'Lock MKR in Chief for 12 months',
    description:
      'Continuous Approval Voting secures the current proposal with the hat. Locking MKR in Chief helps secure the hat at the highest possible bar. "Vote or Dai" as we always say, if you\'re not voting with your MKR then you should be hodling Dai.',
    resource: 'https://vote.makerdao.com/',
    platform: 'Maker Protocol',
    color: '',
    imgPath: 'makerdao.png',
    type: 'side-quest',
    requisites: ['MKR-106'],
    points: 200,
    progress: 0
  },
  MKR8: {
    name: 'MKR-108',
    blurb: 'Vote on 20 Executive Votes',
    task: 'Vote on 20 Executive Votes',
    description:
      'A vital piece of governance is reliable voters and delegators. Thanks for doing your part out there. Happy voting!',
    resource: 'https://vote.makerdao.com/',
    platform: 'Maker Protocol',
    color: '',
    imgPath: 'makerdao.png',
    type: 'side-quest',
    requisites: ['MKR-106'],
    points: 200,
    progress: 0
  },
  MKR9: {
    name: 'MKR-109',
    blurb: 'Cast a Spell',
    task: 'Cast a Spell',
    description:
      'You\'re a wizard Harry! When an open spell has enough MKR to have the hat, schedule the proposal for governance.',
    resource: 'https://etherscan.io/CHIEF',
    platform: 'Maker Protocol',
    color: '',
    imgPath: 'makerdao.png',
    type: 'side-quest',
    requisites: ['MKR-108'],
    points: 200,
    progress: 0
  },
  MKR10: {
    name: 'MKR-110',
    blurb: 'Vote on Spell within 1 hour of creation',
    task: 'Vote on Spell within 1 hour of creation',
    description:
      'This feels like that one time I camped outside the shop to get a brand new of kicks. But only now it\'s some drip.',
    resource: 'https://vote.makerdao.com/',
    platform: 'Maker Protocol',
    color: '',
    imgPath: 'makerdao.png',
    type: 'side-quest',
    requisites: ['MKR-104'],
    points: 200,
    progress: 0
  },
  MKR11: {
    name: 'MKR-111',
    blurb: 'Create a Spell that gets 10 (addresses) votes',
    task: 'Create a Spell that gets 10 (addresses) votes',
    description:
      'Is this what it feels like to be popular?',
    resource: 'https://vote.makerdao.com/',
    platform: 'Maker Protocol',
    color: '',
    imgPath: 'makerdao.png',
    type: 'side-quest',
    requisites: ['MKR-109'],
    points: 200,
    progress: 0
  },
  MKR12: {
    name: 'MKR-112',
    blurb: 'Create a Spell that is cast',
    task: 'Create a Spell that is cast',
    description:
      'You\'re about to make the change on the world of DeFi.',
    resource: 'https://vote.makerdao.com/',
    platform: 'Maker Protocol',
    color: '',
    imgPath: 'makerdao.png',
    type: 'side-quest',
    requisites: ['MKR-111'],
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
    color: '#E052B8',
    imgPath: 'ethmoji.png',
    type: 'side-quest',
    requisites: [],
    points: 500,
    progress: 0
  },
  NEXUS: {
    name: 'NEXUS-101',
    blurb: 'Own a piece of nexus mutual',
    task: 'Buy NXM from Nexus Mutual to become a backer in the system.',
    description:
      'Secure risk and potential bugs in smart contract code. Be covered for events like The DAO hack or Parity multi-sig wallet issues.',
    resource: 'https://nexusmutual.io/',
    platform: 'Nexus Mutual',
    color: '#60D3A2',
    imgPath: 'nexus.jpg',
    type: 'side-quest',
    requisites: [],
    points: 250,
    progress: 0
  },
  POAP1: {
    name: 'POAP-101',
    blurb: 'Attend an Ethereum virtual meetup',
    task: 'Attend an Ethereum virtual meetup during social distancing',
    description: 'When at an Ethereum Foundation event find a POAP representative to receive your badge and NFT.',
    resource: 'https://opensea.io/assets/poap-v2',
    platform: 'POAP',
    color: '#DC6BE5',
    imgPath: 'poap.png',
    type: 'weekly',
    requisites: [],
    points: 250,
    progress: 0
  },
  POAP2: {
    name: 'POAP-201',
    blurb: 'Attend an EF event',
    task: 'Acquire a POAP NFT for attending an EF event.',
    description: 'When at an Ethereum Foundation event find a POAP representative to receive your badge and NFT.',
    resource: 'https://opensea.io/assets/poap-v2',
    platform: 'POAP',
    color: '#DC6BE5',
    imgPath: 'poap.png',
    type: 'side-quest',
    requisites: [],
    points: 1000,
    progress: 0
  },
  POOL1: {
    name: 'POOL-101',
    blurb: 'Enter the no-loss lottery, PoolTogether',
    task: 'Enter the no-loss lottery, PoolTogether',
    description:
      'On PoolTogether, each savings ticket gives you a chance to win a prize, but even if you don’t win, you keep all your money! PoolTogether lets you have the best of both worlds -- saving money and the chance to win a prize!',
    resource: 'https://app.pooltogether.com/',
    platform: 'PoolTogether',
    color: '',
    imgPath: 'pooltogether.jpg',
    type: 'track',
    requisites: [],
    points: 250,
    progress: 0
  },
  POOL2: {
    name: 'POOL-201',
    blurb: 'Chill in the Pool for 5 drawings',
    task: 'Chill in the Pool for 5 drawings',
    description:
      'You can automatically re-join the weekly pool by leaving your assets in PoolTogether. Chill in the pool and cross your fingers!',
    resource: 'https://app.pooltogether.com/',
    platform: 'PoolTogether',
    color: '',
    imgPath: 'pooltogether.jpg',
    type: 'track',
    requisites: [],
    points: 500,
    progress: 0
  },
  POOL3: {
    name: 'POOL-301',
    blurb: 'Stay in the pool for 20 draws',
    task: 'Stay in the pool for 20 draws',
    description:
      'Stay in the pool for 20 draws',
    resource: 'https://app.pooltogether.com/',
    platform: 'PoolTogether',
    color: '',
    imgPath: 'pooltogether.jpg',
    type: 'track',
    requisites: [],
    points: 750,
    progress: 0
  },
  SEA1: {
    name: 'SEA-101',
    blurb: 'Successfully auction an item on OpenSea',
    task: 'Successfully auction an item on OpenSea',
    description:
      'The sea is full of so many shiny kitties. Maybe I\'ll find one that I  like. Yours sure does look purrty.',
    resource: 'https://opensea.io/',
    platform: 'OpenSea',
    color: '',
    imgPath: 'opensea.jpg',
    type: 'track',
    requisites: [],
    points: 500,
    progress: 0
  },
  SEA2: {
    name: 'SEA-201',
    blurb: 'Bid on an item on OpenSea',
    task: 'Bid on an item on OpenSea',
    description:
      'You know what they say on the open seas. Bidders are winners.',
    resource: 'https://opensea.io/',
    platform: 'OpenSea',
    color: '',
    imgPath: 'opensea.jpg',
    type: 'track',
    requisites: ['SEA-101'],
    points: 250,
    progress: 0
  },
  SET1: {
    name: 'SET-101',
    blurb: 'Buy a token set on Set Protocol',
    task: 'Buy a token set on Set Protocol.',
    description:
      'Set Protocol is a platform on Ethereum that enhances your portfolio with automated asset management strategies.',
    resource: 'https://www.tokensets.com/',
    platform: 'Set Protocol',
    color: '#ECC251',
    imgPath: 'set.svg',
    type: 'track',
    requisites: [],
    points: 500,
    progress: 0
  },
  UNI1: {
    name: 'UNI-101',
    blurb: 'Exchange tokens on Uniswap',
    task: 'Exchange tokens on Uniswap',
    description: 'Uniswap is a fully decentralized protocol for automated liquidity provision on Ethereum.',
    resource: 'https://www.uniswap.exchange/swap',
    platform: 'Uniswap',
    color: '#DC6BE5',
    imgPath: 'uniswap.png',
    type: 'track',
    points: 250,
    progress: 0
  },
  UNI2: {
    name: 'UNI-201',
    blurb: 'Supply liquidity in Uniswap',
    task: 'Supply liquidity to at least 1 pool on Uniswap.',
    description: 'In order to make the unicorn run, you need to supply some assets into the liquidity pool.',
    resource: 'https://www.uniswap.exchange/add-liquidity',
    platform: 'Uniswap',
    color: '#DC6BE5',
    imgPath: 'uniswap.png',
    type: 'side-quest',
    requisites: ['SET-101'],
    points: 500,
    progress: 0
  },
  UNI3: {
    name: 'UNI-301',
    blurb: 'Own a Unisocks token',
    task: 'Own a Unisocks token',
    description: 'I heard you\'re a big fan of Supreme. Well, there\'s these things called Unisocks, and they\'re selling like hot pockets. Go get yourself a pair.',
    resource: 'https://unisocks.exchange/',
    platform: 'Uniswap',
    color: '#DC6BE5',
    imgPath: 'uniswap.png',
    type: 'side-quest',
    requisites: ['uni-201'],
    points: 250,
    progress: 0
  }
}

const trackList = {
  DEFI1: {
    name: 'Introduction to Decentralized Finance',
    quests: [
      'COM-101',
      'UNI-101',
      'SET-101'
    ],
    requisites: []
  },
  GAMES1: {
    name: 'The Genesis of Blockchain Games',
    quests: [
      'KITTY-101',
      'SEA-101',
    ],
    requisites: []
  },
  PROFILE1: {
    name: 'Your Distributed Profile',
    quests: [
      '3BOX-101',
      'ENS-101',
      'MOJI-101'
    ],
    requisites: []
  },
  COMPOUND: {
    name: 'Compounding your Growth',
    quests: [
      'COM-102',
      'COM-205',
      'COM-212'
    ],
    requisites: [
      'COM-101'
    ]
  },
  POOL: {
    name: 'The No-Loss Lottery',
    quests: [
      'POOL-101',
      'POOL-204',
      'POOL-406'
    ],
    requisites: ['COM-102']
  },
  VOXELS: {
    name: 'Explore the Metaverse',
    quests: [
      'VOXELS-101',
      'VOXELS-205',
      'VOXELS-301'
    ],
    requisites: ['KITTY-101']
  },
  MAKER: {
    name: 'Keeping it stable with MakerDAO',
    quests: [
      'MKR-101',
      'MKR-201',
      'MKR-301'
    ],
    requisites: ['COM-102','SET-101']
  }
}

export const fetchQuests = async function(ENSName, account) {
  var request = require('request')
  if (account) {

    var poapOptions = { method: 'GET', url: 'https://api.opensea.io/api/v1/assets?owner=' + account + '&asset_contract_address=0x22c1f6050e56d2876009903609a2cc3fef83b415' }
    var openSeaOptions = { method: 'GET', url: 'https://api.opensea.io/api/v1/events?event_type=successful&account_address=' + account }

    return Promise.all(
      Object.keys(questList).map(async key => {
        let quest = questList[key]
        if (key === 'BOX1') {
          const profile = await Box.getProfile(account)
          // check if user has a username set - confirm if user can have account without name - default should be address name
          if (profile.name) {
            quest.progress = 100
          }
        }
        if (key === 'BOX2') {
          const profile = await Box.getProfile(account)
          const verifiedAccounts = await Box.getVerifiedAccounts(profile)
          // check if user has either a verified github or verified twitter
          if (verifiedAccounts.github || verifiedAccounts.twitter) {
            quest.progress = 100
          }
        }
        if (key === 'BOX3') {
          const spaceList = await Box.listSpaces(account)
          // spaceList contains all the spaces they are in. Everyone should have MyFollowing, so they have at least 1/4.
          // TODO: give user a hint that they can join spaces via drip
          if (spaceList) {
            quest.progress = Math.min(Math.round(spaceList.length/4 * 100), 100)
            // This math is to test out the logic to make sure if a user has more than 4 rooms, he just has 100% progress
          }
        }


        if (key === 'ENS') {
          if (ENSName) {
            quest.progress = 100
          }
        }
        if (key === 'MANA1') {
          if (ENSName) {
            let result = await ensClient.query({
              query: DCL_ENS_QUERY,
              fetchPolicy: 'cache-first',
              variables: {
                avatar_name: ENSName.replace('.eth', '.dcl.eth')
              }
            })
            if (result.data.domains[0].owner.id === account.toLowerCase() || result.data.domains[0].resolvedAddress.id === account.toLowerCase()) {
              quest.progress = 100
            }
          }
        }
        if (key === 'MANA2') {
          let result = await manaClient.query({
            query: MANA_QUERY,
            fetchPolicy: 'cache-first',
            variables: {
              user: account.toLowerCase()
            }
          })
          if (result.data.user && result.data.user.parcels) {
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
        if (key === 'POAP1') {
          request(poapOptions, function(error, response, body) {
            if (!error && body.length > 0) {
              var result = JSON.parse(body)
              result.assets.map(badge => {
                if (badge.name === 'Berlin Blockchain week - 2019') { // change to Topaz ceremony or other relevant meetup
                  quest.progress = 100
                  return true
                }
              })
            }
          })
        }
        if (key === 'POAP2') {
          request(poapOptions, function(error, response, body) {
            if (!error && body.length > 0) {
              var result = JSON.parse(body)
              if (result.assets.length > 0) {
                quest.progress = 100
                return true
              }
            }
          })
        }
        if (key === 'SET1') {
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
        if (key === 'UNI1') {
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
        if (key === 'UNI2') {
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
        if (key === 'KITTY1') {
          let result = await cryptoKittiesClient.query({
            query: KITTIES_BRED_QUERY,
            fetchPolicy: 'cache-first',
            variables: {
              user: account
            }
          })
          if (result.data.births) {
            quest.progress = 100
          }
        }
        if (key === 'COMP1') {
          let result = await compoundClient.query({
            query: COMPOUND_QUERY,
            fetchPolicy: 'cache-first',
            variables: {
              user: account.toLowerCase()
            }
          })
          if (result.data.account) {
            if (parseFloat(result.data.account.totalCollateralValueInEth) > 0.005) {
              quest.progress = 100
            }
          }
        }
        if (key === 'COMP2') {
          let result = await compoundClient.query({
            query: COMPOUND_QUERY,
            fetchPolicy: 'cache-first',
            variables: {
              user: account.toLowerCase()
            }
          })
          if (result.data.account) {
            if (parseFloat(result.data.account.totalBorrowValueInEth) > 0.005) {
              quest.progress = 100
            }
          }
        }
        if (key === 'COMP3') {
          let result = await compoundClient.query({
            query: COMPOUND_INTEREST_QUERY,
            fetchPolicy: 'cache-first',
            variables: {
              user: account.toLowerCase()
            }
          })
          if (result.data.account) {
            let totalSupplyInterest = 0;
            result.data.account.tokens.map(lentToken => {
              totalSupplyInterest = totalSupplyInterest + parseFloat(lentToken.lifetimeSupplyInterestAccrued)
            })
            if (totalSupplyInterest > 0) {
              quest.progress = totalSupplyInterest / 0.005 * 100
            }
          }
        }
        if (key === 'POOL1') {
          let result = await poolTogetherClient.query({
            query: POOL_TOGETHER_QUERY,
            fetchPolicy: 'cache-first',
            variables: {
              user: "player-" + account.toLowerCase() + "_pool-0x29fe7d60ddf151e5b52e5fab4f1325da6b2bd958"
            }
          })
          if (result.data.player) {
            if (parseInt(result.data.player.consolidatedBalance) / 10 ** 18 >= 1 && parseInt(result.data.player.latestBalance) / 10 ** 18 >= 1) {
              quest.progress = 100
            }
          }
        }
        if (key === 'POOL2') {
          let result = await poolTogetherClient.query({
            query: POOL_TOGETHER_QUERY,
            fetchPolicy: 'cache-first',
            variables: {
              user: "player-" + account.toLowerCase() + "_pool-0x29fe7d60ddf151e5b52e5fab4f1325da6b2bd958"
            }
          })
          if (result.data.player) {
            if (parseInt(result.data.player.latestDrawId) - parseInt(result.data.player.firstDepositDrawId) >= 5) {
              quest.progress = 100
            }
          }
        }
        if (key === 'POOL3') {
          let result = await poolTogetherClient.query({
            query: POOL_TOGETHER_QUERY,
            fetchPolicy: 'cache-first',
            variables: {
              user: "player-" + account.toLowerCase() + "_pool-0x29fe7d60ddf151e5b52e5fab4f1325da6b2bd958"
            }
          })
          if (result.data.player) {
            if (parseInt(result.data.player.latestDrawId) - parseInt(result.data.player.firstDepositDrawId) >= 20) {
              quest.progress = 100
            }
          }
        }
        if (key === 'SEA1') {
          request(openSeaOptions, function(error, response, body) {
            if (!error && body.length > 0) {
              var result = JSON.parse(body)
              var itemsSold = 0
              result['asset_events'].map(event => {
                if (event.seller.address === account.toLowerCase()) {
                  itemsSold += 1
                }
              })
              if (itemsSold > 1) {
                quest.progress = 100
              }
            }
          })
        }
        if (key === 'SEA2') {
          request(openSeaOptions, function(error, response, body) {
            if (!error && body.length > 0) {
              var result = JSON.parse(body)
              if (result['asset_events']) {
                quest.progress = 100
                  return true
              }
            }
          })
        }
        if (key === 'MKR4') {
          let result = await makerGovClient.query({
            query: MKR_SPELL_VOTES_QUERY,
            fetchPolicy: 'cache-first',
            variables: {
              user: account.toLowerCase()
            }
          })
          var votes = 0

          result.data.votingActions.map(action => {
            if (action.id.search('ADD-ARRAY')) {
              votes += 1
            }
          })
          if (votes > 0) {
            quest.progress = 100
          }
        }
        
        return quest
      }
  ))}
}
