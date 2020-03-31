import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

export const compoundClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2'
  }),
  cache: new InMemoryCache()
})

export const poolTogetherClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/asselstine/pooltogether'
  }),
  cache: new InMemoryCache()
})

export const uniClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap'
  }),
  cache: new InMemoryCache()
})

export const setClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/destiner/token-sets'
  }),
  cache: new InMemoryCache()
})

export const nexusClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/wtait/nexus-mutual'
  }),
  cache: new InMemoryCache()
})

export const manaClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/graphprotocol/decentraland'
  }),
  cache: new InMemoryCache()
})
