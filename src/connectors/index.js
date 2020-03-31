import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { FortmaticConnector } from '@web3-react/fortmatic-connector'

import { InjectedConnector } from './Injected'
import { NetworkConnector } from './Network'

const POLLING_INTERVAL = 10000

export const injected = new InjectedConnector({
  supportedChainIds: [1]
})

export const network = new NetworkConnector({
  urls: { 1: process.env.REACT_APP_NETWORK_URL },
  pollingInterval: POLLING_INTERVAL
})

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: process.env.REACT_APP_NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: false,
  pollingInterval: POLLING_INTERVAL
})

export const fortmatic = new FortmaticConnector({
  apiKey: 'pk_live_F937DF033A1666BF',
  chainId: 1
})

// export const Portis = new PortisConnector({

// })

export const walletlink = new WalletLinkConnector({
  url: process.env.REACT_APP_NETWORK_URL,
  appName: 'Adevnture 51',
  appLogoUrl: ''
})
