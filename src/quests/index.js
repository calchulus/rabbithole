import {
  setClient,
  uniClient,
  nexusClient,
  manaClient,
  cryptoKittiesClient,
  compoundClient,
  poolTogetherClient,
  // ensClient,
  makerGovClient,
} from "../apollo/client"
import {
  UNI_POOL_QUERY,
  SET_OWNER_QUERY,
  NEXUS_QUERY,
  MANA_QUERY,
  KITTIES_BRED_QUERY,
  COMPOUND_QUERY,
  COMPOUND_INTEREST_QUERY,
  POOL_TOGETHER_QUERY,
  // DCL_ENS_QUERY,
  MKR_SPELL_VOTES_QUERY,
  MKR_POLL_VOTES_QUERY
} from "../apollo/queries"
const EthmojiAPI = require("ethmoji-js").default
const Box = require("3box")

export const financeTrack = {
  "COMP-101": {
    children: ["SET-101", "POOL-101"],
  },
  "POOL-101": {
    children: ["POOL-201", "MKR-101"],
  },
  "POOL-201": {
    children: ["POOL-301"],
  },
  "SET-101": {
    children: ["UNI-101"],
  },
  "UNI-101": {
    children: ["UNI-201", "COMP-102"],
  },
  "COMP-102": {
    children: ["COMP-201", "NEXUS-101"],
  },
}

export const gamingTrack = {
  "KITTY-101": {
    children: ["MANA-101", "SEA-101"],
  },
  "MANA-101": {
    children: ["MANA-201"],
  },
  "SEA-101": {
    children: ["UNI-301"],
  },
}

const questList = {
  BOX1: {
    name: "3BOX-101",
    type: "track",
    blurb: "Create a Profile on 3box",
    task: "",
    description:
      "Experience the internet like never before with your new all-in-one sign-in, profile, and cloud storage.",
    resource: "https://3box.io/hub",
    platform: "3Box",
    color: "#1168df",
    imgPath: "3box.png",
    badgeImgPath: "3box.png",
    category: "Profile",
    categoryColor: "#4c6ae0",
    prerequisite: "",
    points: 250,
    progress: 0,
  },
  BOX2: {
    name: "3BOX-102",
    type: "track",
    blurb: "Add a verified Twitter or Github to 3box",
    task: "",
    description:
      "You've already setup your profle. Why not verify your Twitter or Github handle now?",
    resource: "https://3box.io/hub",
    platform: "3Box",
    color: "#1168df",
    imgPath: "3box.png",
    badgeImgPath: "3box.png",
    category: "Profile",
    categoryColor: "#4c6ae0",
    prerequisite: "",
    points: 400,
    progress: 0,
  },
  BOX3: {
    name: "3BOX-201",
    type: "track",
    blurb: "Join 4 spaces on 3Box",
    task: "",
    description:
      "Show the world your XP. Connect 4 different applications to your 3box profile.",
    resource: "",
    platform: "3Box",
    color: "#1168df",
    imgPath: "3box.png",
    badgeImgPath: "3box.png",
    category: "Profile",
    categoryColor: "#4c6ae0",
    prerequisite: "",
    points: 400,
    progress: 0,
  },
  COMP1: {
    name: "COMP-101",
    type: "track",
    blurb: "Supply tokens to Compound",
    task: "",
    description:
      "Under the hood, when a user contributes their assets to a large pool of liquidity (a “market”) that is available for other users to borrow, they share in the interest that borrowers pay back to the pool.",
    resource: "https://app.compound.finance/",
    platform: "Compound Finance",
    color: "#4dffca",
    imgPath: "compound.png",
    badgeImgPath: "COMP-101-badge.svg",
    category: "Finance",
    categoryColor: "#6ed16b",
    prerequisite: "",
    points: 250,
    progress: 0,
  },
  COMP2: {
    name: "COMP-102",
    type: "track",
    blurb: "Borrow tokens on Compound",
    task: "",
    description:
      "Under the hood, when a user contributes their assets to a large pool of liquidity (a “market”) that is available for other users to borrow, they share in the interest that borrowers pay back to the pool.",
    resource: "https://app.compound.finance/",
    platform: "Compound Finance",
    color: "#4dffca",
    imgPath: "compound.png",
    badgeImgPath: "COMP-102-badge.svg",
    category: "Finance",
    categoryColor: "#6ed16b",
    prerequisite: "",
    points: 500,
    progress: 0,
  },
  COMP3: {
    name: "COMP-201",
    type: "track",
    blurb: "Accrue 10 DAI worth of interest from supplying tokens",
    task: "",
    description:
      "At every Ethereum block, your supplied assets earn interest paid by borrowers. Now see if you can earn 10 DAI worth of interest with your supplied assets!",
    resource: "https://app.compound.finance/",
    platform: "Compound Finance",
    color: "#4dffca",
    imgPath: "compound.png",
    badgeImgPath: "COMP-201-badge.svg",
    category: "Finance",
    categoryColor: "#6ed16b",
    prerequisite: "",
    points: 750,
    progress: 0,
  },
  ENS1: {
    name: "ENS-101",
    type: "track",
    blurb: "Register an ENS name",
    task: "Register an ENS name to your Ethereum address.",
    description:
      "ENS is managed through the ENS Manager currently. Go register a .eth domain and set the resolver to your address.",
    resource: "https://app.ens.domains/",
    platform: "ENS",
    color: "#5183FE",
    imgPath: "enspng.png",
    badgeImgPath: "3box.png",
    category: "Profile",
    categoryColor: "#4c6ae0",
    prerequisite: "",
    points: 250,
    progress: 0,
  },
  KITTY1: {
    name: "KITTY-101",
    type: "track",
    blurb: "Breed a CryptoKitty",
    task: "",
    description:
      "CryptoKitties is one of the world’s first blockchain games. Each kitty has a unique genome that defines its appearance and traits. Players can breed their kitties to create new furry friends and unlock rare cattributes.",
    resource: "https://www.cryptokitties.co/",
    platform: "CryptoKitties",
    color: "#e96bd4",
    imgPath: "cryptokitties.png",
    badgeImgPath: "KITTY-101-badge.svg",
    category: "Games",
    categoryColor: "#f29b44",
    prerequisite: "",
    points: 250,
    progress: 0,
  },
  MANA1: {
    name: "MANA-101",
    type: "track",
    blurb: "Create your Decentraland Passport",
    task: "Create your Decentraland Passport",
    description:
      "Customize your look, grab your Passport to manage your digital identity, and set off on an adventure. A single sign-on to connect all of your experiences in Decentraland.",
    resource: "https://avatars.decentraland.org/",
    platform: "Decentraland",
    color: "#FF0055",
    imgPath: "mana.svg",
    badgeImgPath: "MANA-101-badge.svg",
    category: "Games",
    categoryColor: "#f29b44",
    prerequisite: "",
    points: 500,
    progress: 0,
  },
  MANA2: {
    name: "MANA-201",
    type: "side-quest",
    blurb: "Obtain some Decentraland LAND",
    task: "Get yourself some LAND",
    description:
      "Venturing into new territory. Grab some land and build up a scene to share with the 3d world inside Decentraland.",
    resource: "https://marketplace.decentraland.org/",
    platform: "Decentraland",
    color: "#FF0055",
    imgPath: "mana.svg",
    badgeImgPath: "MANA-201-badge.svg",
    category: "Games",
    categoryColor: "#f29b44",
    prerequisite: "",
    points: 1000,
    progress: 0,
  },
  MKR1: {
    name: "MKR-101",
    type: "track",
    blurb: "Lock Dai in DSR and earn 1$ in interest",
    task: "Lock Dai in DSR and earn 1$ in interest",
    description:
      "The Dai Savings Rate (DSR) is a variable rate of accrual earned by locking Dai in the DSR smart contract. Dai holders can earn savings automatically and natively while retaining control of their Dai.",
    resource: "https://oasis.app/save",
    platform: "Maker Protocol",
    color: "#1aaa9b",
    imgPath: "makerdao.png",
    badgeImgPath: "MKR-101-badge.svg",
    category: "Finance",
    categoryColor: "#6ed16b",
    prerequisite: "",
    points: 250,
    progress: 0,
  },
  MKR2: {
    name: "MKR-102",
    type: "side-quest",
    blurb: "Open a Vault in MakerDAO",
    task: "Open a Vault and create at least 1 Dai",
    description:
      "Any user who wishes to generate Dai may deposit Collateral into a Vault and do so, paying a Stability Fee on the generated Dai balance.",
    resource: "https://oasis.app/borrow",
    platform: "Maker Protocol",
    color: "#1aaa9b",
    imgPath: "makerdao.png",
    badgeImgPath: "MKR-102-badge.svg",
    category: "Finance",
    categoryColor: "#6ed16b",
    prerequisite: "MKR-101",
    points: 200,
    progress: 0,
  },
  MKR3: {
    name: "MKR-103",
    type: "side-quest",
    blurb: "Vote on Governance Poll in MakerDAO",
    task: "Vote on Governance Poll",
    description:
      "These occur on-chain and can be accessed through the Maker Foundation's Voting Portal. Governance Polls measure the sentiment of MKR voters.",
    resource: "https://vote.makerdao.com/",
    platform: "Maker Protocol",
    color: "#1aaa9b",
    imgPath: "makerdao.png",
    badgeImgPath: "MKR-103-badge.svg",
    category: "Finance",
    categoryColor: "#6ed16b",
    prerequisite: "MKR-102",
    points: 200,
    progress: 0,
  },
  MKR4: {
    name: "MKR-104",
    type: "track",
    blurb: "Vote on Executive Spell",
    task: "Vote on Executive Spell",
    description:
      "Executive Votes \"execute\" technical changes to the Maker Protocol. When active, each Executive Vote has a proposed set of changes being made on the Maker Protocol's smart-contracts. Unlike the other types of votes, Executive Votes use a 'Continuous Approval Voting' model.",
    resource: "https://vote.makerdao.com/",
    platform: "Maker Protocol",
    color: "#1aaa9b",
    imgPath: "makerdao.png",
    badgeImgPath: "3box.png",
    category: "Finance",
    categoryColor: "#6ed16b",
    prerequisite: "",
    points: 500,
    progress: 0,
  },
  MOJI1: {
    name: "MOJI-101",
    type: "side-quest",
    blurb: "Create an ethmoji",
    task: "Own at least 1 ethmoji.",
    description: "Ethmoji is an avatar that you can digitally own. Create one to represent your new digital identity",
    resource: "https://ethmoji.io/",
    platform: "Ethmoji",
    color: "#E052B8",
    imgPath: "ethmoji.png",
    badgeImgPath: "MOJI-101-badge.svg",
    category: "Profile",
    categoryColor: "#4c6ae0",
    prerequisite: "",
    points: 500,
    progress: 0,
  },
  NEXUS1: {
    name: "NEXUS-101",
    type: "side-quest",
    blurb: "Own a piece of nexus mutual",
    task: "Buy NXM from Nexus Mutual to become a backer in the system.",
    description:
      "Secure risk and potential bugs in smart contract code. Be covered for events like The DAO hack or Parity multi-sig wallet issues.",
    resource: "https://nexusmutual.io/",
    platform: "Nexus Mutual",
    color: "#60D3A2",
    imgPath: "nexus.jpg",
    badgeImgPath: "3box.png",
    category: "Finance",
    categoryColor: "#6ed16b",
    prerequisite: "",
    points: 250,
    progress: 0,
  },
 
  POAP2: {
    name: "POAP-201",
    type: "side-quest",
    blurb: "Attend an EF event",
    task: "Acquire a POAP NFT for attending an EF event.",
    description:
      "When at an Ethereum Foundation event find a POAP representative to receive your badge and NFT.",
    resource: "https://www.poap.xyz/",
    platform: "POAP",
    color: "#DC6BE5",
    imgPath: "poap.png",
    badgeImgPath: "POAP-201-badge.svg",
    category: "Events",
    categoryColor: "#e063c7",
    prerequisite: "",
    points: 1000,
    progress: 0,
  },
  POOL1: {
    name: "POOL-101",
    type: "track",
    blurb: "Enter the no-loss lottery, PoolTogether",
    task: "Enter the no-loss lottery, PoolTogether",
    description:
      "On PoolTogether, each savings ticket gives you a chance to win a prize, but even if you don’t win, you keep all your money! PoolTogether lets you have the best of both worlds -- saving money and the chance to win a prize!",
    resource: "https://app.pooltogether.com/",
    platform: "PoolTogether",
    color: "#5029ab",
    imgPath: "pooltogether.jpg",
    badgeImgPath: "POOL-101-badge.svg",
    category: "Finance",
    categoryColor: "#6ed16b",
    prerequisite: "",
    points: 250,
    progress: 0,
  },
  POOL2: {
    name: "POOL-201",
    type: "track",
    blurb: "Chill in the Pool for 5 drawings",
    task: "Chill in the Pool for 5 drawings",
    description:
      "You can automatically re-join the weekly pool by leaving your assets in PoolTogether. Chill in the pool and cross your fingers!",
    resource: "https://app.pooltogether.com/",
    platform: "PoolTogether",
    color: "#5029ab",
    imgPath: "pooltogether.jpg",
    badgeImgPath: "POOL-201-badge.svg",
    category: "Finance",
    categoryColor: "#6ed16b",
    prerequisite: "",
    points: 500,
    progress: 0,
  },
  POOL3: {
    name: "POOL-301",
    type: "track",
    blurb: "Stay in the pool for 20 draws",
    task: "Stay in the pool for 20 draws",
    description: "Stay in the pool for 20 draws",
    resource: "https://app.pooltogether.com/",
    platform: "PoolTogether",
    color: "#5029ab",
    imgPath: "pooltogether.jpg",
    badgeImgPath: "POOL-301-badge.svg",
    category: "Finance",
    categoryColor: "#6ed16b",
    prerequisite: "",
    points: 750,
    progress: 0,
  },
  SEA1: {
    name: "SEA-101",
    type: "track",
    blurb: "Successfully auction an item on OpenSea",
    task: "Successfully auction an item on OpenSea",
    description:
      "The sea is full of so many shiny kitties. Maybe I'll find one that I  like. Yours sure does look purrty.",
    resource: "https://opensea.io/",
    platform: "OpenSea",
    color: "#4ba1ef",
    imgPath: "opensea.jpg",
    badgeImgPath: "SEA-101-badge.svg",
    category: "Finance",
    categoryColor: "#6ed16b",
    prerequisite: "",
    points: 500,
    progress: 0,
  },
  SEA2: {
    name: "SEA-201",
    type: "track",
    blurb: "Bid on an item on OpenSea",
    task: "Bid on an item on OpenSea",
    description:
      "You know what they say on the open seas. Bidders are winners.",
    resource: "https://opensea.io/",
    platform: "OpenSea",
    color: "#4ba1ef",
    imgPath: "opensea.jpg",
    badgeImgPath: "SEA-201-badge.svg",
    category: "Finance",
    categoryColor: "#6ed16b",
    prerequisite: "SEA-101",
    points: 250,
    progress: 0,
  },
  SET1: {
    name: "SET-101",
    type: "track",
    blurb: "Buy a token set on Set Protocol",
    task: "Buy a token set on Set Protocol.",
    description:
      "Set Protocol is a platform on Ethereum that enhances your portfolio with automated asset management strategies.",
    resource: "https://www.tokensets.com/explore",
    platform: "Set Protocol",
    color: "#ECC251",
    imgPath: "set.svg",
    badgeImgPath: "SET-101-badge.svg",
    category: "Finance",
    categoryColor: "#6ed16b",
    prerequisite: "",
    points: 500,
    progress: 0,
  },
  UNI1: {
    name: "UNI-101",
    type: "track",
    blurb: "Make a token swap on Uniswap",
    task: "Exchange tokens on Uniswap",
    description:
      "Uniswap is a fully decentralized protocol for automated liquidity provision on Ethereum.",
    resource: "https://www.uniswap.exchange/swap",
    platform: "Uniswap",
    color: "#DC6BE5",
    imgPath: "uniswap.png",
    badgeImgPath: "UNI-101-badge.svg",
    category: "Finance",
    categoryColor: "#6ed16b",
    prerequisite: "",
    points: 250,
    progress: 0,
  },
  UNI2: {
    name: "UNI-201",
    type: "side-quest",
    blurb: "Supply liquidity in Uniswap",
    task: "Supply liquidity to at least 1 pool on Uniswap.",
    description:
      "In order to make the unicorn run, you need to supply some assets into the liquidity pool.",
    resource: "https://www.uniswap.exchange/add-liquidity",
    platform: "Uniswap",
    color: "#DC6BE5",
    imgPath: "uniswap.png",
    badgeImgPath: "UNI-201-badge.svg",
    category: "Finance",
    categoryColor: "#6ed16b",
    prerequisite: "SET-101",
    points: 500,
    progress: 0,
  },
  UNI3: {
    name: "UNI-301",
    type: "side-quest",
    blurb: "Redeem a Unisocks token and obtain proof",
    task: "Own a Unisocks token",
    description:
      "I heard you're a big fan of Supreme. Well, there's these things called Unisocks, and they're selling like hot pockets. Go get yourself a pair.",
    resource: "https://unisocks.exchange/",
    platform: "Uniswap",
    color: "#DC6BE5",
    imgPath: "uniswap.png",
    badgeImgPath: "UNI-301-badge.svg",
    category: "Games",
    categoryColor: "#f29b44",
    prerequisite: "UNI-201",
    points: 250,
    progress: 0,
  },
}

export const fetchQuests = async function(ENSName, account) {
  var request = require("request")

  if (account) {
    var poapOptions = {
      method: "GET",
      url:
        "https://api.opensea.io/api/v1/assets?owner=" +
        account +
        "&asset_contract_address=0x22c1f6050e56d2876009903609a2cc3fef83b415",
    }
    var openSeaOptions = {
      method: "GET",
      url:
        "https://api.opensea.io/api/v1/events?event_type=successful&account_address=" +
        account,
    }
    var dclOptions = {
      method: "GET",
      url:
        "https://api.opensea.io/api/v1/assets?owner=" +
        account +
        "&asset_contract_address=0x2a187453064356c898cae034eaed119e1663acb8",
    }
    var socksOptions = {
      method: "GET",
      url:
        "https://api.opensea.io/api/v1/assets?owner=" +
        account +
        "&asset_contract_address=0x2a187453064356c898cae034eaed119e1663acb8",
    }
    return Promise.all(
      Object.keys(questList).map(async (key) => {
        let quest = questList[key]
        if (key === "BOX1") {
          const profile = await Box.getProfile(account)
          // check if user has a username set - confirm if user can have account without name - default should be address name
          if (profile.name) {
            quest.progress = 100
          }
        }
        if (key === "BOX2") {
          const profile = await Box.getProfile(account)
          const verifiedAccounts = await Box.getVerifiedAccounts(profile)
          // check if user has either a verified github or verified twitter
          if (verifiedAccounts.github || verifiedAccounts.twitter) {
            quest.progress = 100
          }
        }
        if (key === "BOX3") {
          const spaceList = await Box.listSpaces(account)
          // spaceList contains all the spaces they are in. Everyone should have MyFollowing, so they have at least 1/4.
          // TODO: give user a hint that they can join spaces via rabbithole
          if (spaceList) {
            quest.progress = Math.min(
              Math.round((spaceList.length / 4) * 100),
              100
            )
            // This math is to test out the logic to make sure if a user has more than 4 rooms, he just has 100% progress
          }
        }
        if (key === "COMP1") {
          let result = await compoundClient.query({
            query: COMPOUND_QUERY,
            fetchPolicy: "cache-first",
            variables: {
              user: account.toLowerCase(),
            },
          })
          if (result.data.account) {
            if (parseFloat(result.data.account.totalCollateralValueInEth) > 0) {
              quest.progress = 100
            }
          }
        }
        if (key === "COMP2") {
          let result = await compoundClient.query({
            query: COMPOUND_QUERY,
            fetchPolicy: "cache-first",
            variables: {
              user: account.toLowerCase(),
            },
          })
          if (result.data.account) {
            if (parseFloat(result.data.account.totalBorrowValueInEth) > 0.005) {
              quest.progress = 100
            }
          }
        }
        if (key === "COMP3") {
          let result = await compoundClient.query({
            query: COMPOUND_INTEREST_QUERY,
            fetchPolicy: "cache-first",
            variables: {
              user: account.toLowerCase(),
            },
          })
          if (result.data.account) {
            let totalSupplyInterest = 0
            result.data.account.tokens.map((lentToken) => {
              totalSupplyInterest =
                totalSupplyInterest +
                parseFloat(lentToken.lifetimeSupplyInterestAccrued)
              return true
            })
            if (totalSupplyInterest > 0) {
              quest.progress = (totalSupplyInterest / 0.005) * 100
            }
          }
        }

        if (key === "ENS1") {
          if (ENSName) {
            quest.progress = 100
          }
        }
        if (key === "KITTY1") {
          let result = await cryptoKittiesClient.query({
            query: KITTIES_BRED_QUERY,
            fetchPolicy: "cache-first",
            variables: {
              user: account,
            },
          })
          if (result.data.births) {
            quest.progress = 100
          }
        }
        if (key === "MANA1") {
          request(dclOptions, function(error, response, body) {
            if (!error && body.length > 0) {
              var result = JSON.parse(body)
              if (result.assets.length > 0) {
                quest.progress = 100
              }
            }
          })
        }
        if (key === "MANA2") {
          let result = await manaClient.query({
            query: MANA_QUERY,
            fetchPolicy: "cache-first",
            variables: {
              user: account.toLowerCase(),
            },
          })
          if (result.data.user && result.data.user.parcels) {
            quest.progress = 100
          }
        }
        if (key === "MKR3") {
          let result = await makerGovClient.query({
            query: MKR_POLL_VOTES_QUERY,
            fetchPolicy: "cache-first",
            variables: {
              user: account.toLowerCase(),
            },
          })

          if (result.data.pollVotes.length > 0) {
            quest.progress = 100
          }
        }
        if (key === "MKR4") {
          let result = await makerGovClient.query({
            query: MKR_SPELL_VOTES_QUERY,
            fetchPolicy: "cache-first",
            variables: {
              user: account.toLowerCase(),
            },
          })
          var votes = 0

          result.data.votingActions.map((action) => {
            if (action.id.search("ADD-ARRAY")) {
              votes += 1
            }
            return true
          })
          if (votes > 0) {
            quest.progress = 100
          }
        }
        if (key === "MOJI1") {
          const ethmojiAPI = new EthmojiAPI(global.web3.currentProvider)
          try {
            await ethmojiAPI?.init()
            const avatar = await ethmojiAPI?.getAvatar(account)
            if (avatar) {
              quest.progress = 100
            }
          } catch (error) {
            console.log(error.message)
          }
        }
        if (key === "NEXUS1") {
          try {
            let result = await nexusClient.query({
              query: NEXUS_QUERY,
              fetchPolicy: "cache-first",
              variables: {
                user: account,
              },
            })
            if (result.data.member) {
              quest.progress = 100
            }
          } catch (e) {}
        }
        if (key === "POAP1") {
          request(poapOptions, function(error, response, body) {
            if (!error && body.length > 0) {
              var result = JSON.parse(body)
              result.assets.map((badge) => {
                if (badge.name === "Berlin Blockchain week - 2019") {
                  // change to Topaz ceremony or other relevant meetup
                  quest.progress = 100
                }
                return true
              })
            }
          })
        }
        if (key === "POAP2") {
          request(poapOptions, function(error, response, body) {
            if (!error && body.length > 0) {
              var result = JSON.parse(body)
              if (result.assets?.length > 0) {
                quest.progress = 100
              }
            }
          })
        }
        if (key === "POOL1") {
          let result = await poolTogetherClient.query({
            query: POOL_TOGETHER_QUERY,
            fetchPolicy: "cache-first",
            variables: {
              user:
                "player-" +
                account.toLowerCase() +
                "_pool-0x29fe7d60ddf151e5b52e5fab4f1325da6b2bd958",
            },
          })
          if (result.data.player) {
            if (
              parseInt(result.data.player.consolidatedBalance) / 10 ** 18 >=
                1 &&
              parseInt(result.data.player.latestBalance) / 10 ** 18 >= 1
            ) {
              quest.progress = 100
            }
          }
        }
        if (key === "POOL2") {
          let result = await poolTogetherClient.query({
            query: POOL_TOGETHER_QUERY,
            fetchPolicy: "cache-first",
            variables: {
              user:
                "player-" +
                account.toLowerCase() +
                "_pool-0x29fe7d60ddf151e5b52e5fab4f1325da6b2bd958",
            },
          })
          if (result.data.player) {
            quest.progress =
              ((parseInt(result.data.player.latestDrawId) -
                parseInt(result.data.player.firstDepositDrawId)) /
                5) *
              100
          }
        }
        if (key === "POOL3") {
          let result = await poolTogetherClient.query({
            query: POOL_TOGETHER_QUERY,
            fetchPolicy: "cache-first",
            variables: {
              user:
                "player-" +
                account.toLowerCase() +
                "_pool-0x29fe7d60ddf151e5b52e5fab4f1325da6b2bd958",
            },
          })
          if (result.data.player) {
            quest.progress =
              ((parseInt(result.data.player.latestDrawId) -
                parseInt(result.data.player.firstDepositDrawId)) /
                20) *
              100
          }
        }
        if (key === "SEA1") {
          request(openSeaOptions, function(error, response, body) {
            if (!error && body.length > 0) {
              var result = JSON.parse(body)
              var itemsSold = 0
              result["asset_events"].map((event) => {
                if (event.seller.address === account.toLowerCase()) {
                  itemsSold += 1
                }
                return true
              })
              if (itemsSold > 1) {
                quest.progress = 100
              }
            }
          })
        }
        if (key === "SEA2") {
          request(openSeaOptions, function(error, response, body) {
            if (!error && body.length > 0) {
              var result = JSON.parse(body)
              if (result["asset_events"]) {
                quest.progress = 100
                return true
              }
            }
          })
        }
        if (key === "SET1") {
          let result = await setClient.query({
            query: SET_OWNER_QUERY,
            fetchPolicy: "cache-first",
            variables: {
              user: account,
            },
          })
          if (result.data) {
            if (result.data.issuances && result.data.issuances.length > 0) {
              quest.progress = 100
            }
          }
        }
        if (key === "UNI1") {
          let result = await uniClient.query({
            query: UNI_POOL_QUERY,
            fetchPolicy: "cache-first",
            variables: {
              user: account,
            },
          })
          if (result.data.userExchangeDatas) {
            let supplied = false
            Object.keys(result.data.userExchangeDatas).map((key) => {
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
        if (key === "UNI2") {
          let result = await uniClient.query({
            query: UNI_POOL_QUERY,
            fetchPolicy: "cache-first",
            variables: {
              user: account,
            },
          })
          if (result.data.userExchangeDatas) {
            let supplied = 0
            Object.keys(result.data.userExchangeDatas).map((key) => {
              let exchange = result.data.userExchangeDatas[key]
              supplied += parseFloat(exchange.ethDeposited)
              return true
            })
            quest.progress = (parseFloat(supplied) / 0.5) * 100
          }
        }
        if (key === "UNI3") {
          request(socksOptions, function(error, response, body) {
            if (!error && body.length > 0) {
              var result = JSON.parse(body)
              if (result.assets.length > 0) {
                quest.progress = 100
              }
            }
          })
        }
        return quest
      })
    )
  }
}
