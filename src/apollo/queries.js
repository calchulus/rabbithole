import gql from 'graphql-tag'

export const COMPOUND_BORROWING = gql`
  query acount {
    account(id: "0x00000000af5a61acaf76190794e3fdf1289288a1") {
      id
    }
  }
`

export const POOL_TOGETHER = gql`
  query player($user: String!) {
    player(id: $user) {
      id
      entries
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

export const SET_OWNER_QUERY = gql`
  query issuances($user: String!) {
    issuances(where: { account: $user }) {
      id
      amount
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

export const MANA_QUERY = gql`
  query user($user: String!) {
    user(id: $user) {
      parcels
    }
  }
`
