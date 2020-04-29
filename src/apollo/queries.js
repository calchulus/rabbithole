import gql from "graphql-tag"

export const COMPOUND_QUERY = gql`
  query account($user: ID!) {
    account(id: $user) {
      id
      totalBorrowValueInEth
      totalCollateralValueInEth
    }
  }
`

export const COMPOUND_INTEREST_QUERY = gql`
  query account($user: ID!) {
    account(id: $user) {
      id
      tokens {
        id
        lifetimeSupplyInterestAccrued
      }
    }
  }
`

export const KITTIES_BRED_QUERY = gql`
  query births($user: String!) {
    births(where: { owner: $user }) {
      id
      kittyId
      sireId
      matronId
      owner
    }
  }
`

export const MANA_QUERY = gql`
  query user($user: String!) {
    user(id: $user) {
      id
      parcels {
        id
      }
    }
  }
`

export const MKR_SPELL_VOTES_QUERY = gql`
  query votingActions($user: String!) {
    votingActions(where: { sender: $user }) {
      id
    }
  }
`

export const MKR_POLL_VOTES_QUERY = gql`
  query pollVotes($user: String!) {
    pollVotes(where: {voter: $user}) {
      id
      voter
    }
  }
`

export const NEXUS_QUERY = gql`
  query member($user: String!) {
    member(id: $user) {
      id
    }
  }
`

export const POOL_TOGETHER_QUERY = gql`
  query player($user: String!) {
    player(id: $user) {
      id
      consolidatedBalance
      latestBalance
      firstDepositDrawId
      latestDrawId
    }
  }
`

export const SET_OWNER_QUERY = gql`
  query issuances($user: String!) {
    issuances(where: { account: $user }) {
      id
      amount
    }
  }
`

export const UNI_POOL_QUERY = gql`
  query userExchangeDatas($user: String!) {
    userExchangeDatas(where: { userAddress: $user }) {
      tokensDeposited
      ethDeposited
      tokensBought
    }
  }
`
