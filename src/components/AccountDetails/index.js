import React, { useState } from "react"
import styled from "styled-components"
import { useWeb3React } from "../../hooks"
import { isMobile } from "react-device-detect"
import Copy from "./Copy"
import { SUPPORTED_WALLETS } from "../../constants"
import { ReactComponent as Close } from "../../assets/images/x.svg"
import {
  injected,
  walletconnect,
  walletlink,
  fortmatic,
} from "../../connectors"
import CoinbaseWalletIcon from "../../assets/images/coinbaseWalletIcon.svg"
import WalletConnectIcon from "../../assets/images/walletConnectIcon.svg"
import FortmaticIcon from "../../assets/images/fortmaticIcon.png"
import Identicon from "../Identicon"
import ProfileHover from "profile-hover"
import { Text } from "rebass"
// import { Link } from "../../theme"
import Row from "../Row"
import { useScore } from "../../contexts/Application"

const Box = require("3box")

const Selector = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  width: 300px;
  border-radius: 5px;
  padding: 10px;

  div {
    :hover {
      cursor: pointer;
    }
  }
`

const PublicSelector = styled(Row)`
  width: 50%;
  height: 100%;
  background-color: ${({ active }) => active && "#8dfbc9"};
  border: ${({ active }) => !active && "1px solid #1F1F1F;"};
  border-right: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`

const PrivateSelector = styled(Row)`
  width: 50%;
  height: 100%;
  background-color: ${({ active }) => active && "#FFD683"};
  border: ${({ active }) => !active && "1px solid #1F1F1F;"};
  border-left: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`

const SharingSettings = styled.div`
  background-color: ${({ theme }) => theme.concreteGray};
  padding: 3rem 2.5rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0rem 1rem 1rem 1rem;`};
`

const OptionButton = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.royalBlue};
  color: ${({ theme }) => theme.royalBlue};
  padding: 8px 24px;

  &:hover {
    border: 1px solid ${({ theme }) => theme.malibuBlue};
    cursor: pointer;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 12px;
  `};
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1.5rem 1.5rem;
  font-weight: 500;
  color: ${(props) =>
    props.color === "blue" ? ({ theme }) => theme.royalBlue : "inherit"};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`

const UpperSection = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.concreteGray};

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const InfoCard = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.placeholderGray};
  border-radius: 20px;
`

const AccountGroupingRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};

  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }

  &:first-of-type {
    margin-bottom: 20px;
  }
`

const AccountSection = styled.div`
  background-color: ${({ theme }) => theme.concreteGray};
  padding: 0rem 1.5rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0rem 1rem 1rem 1rem;`};
`

const YourAccount = styled.div`
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`

const GreenCircle = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: center;
  align-items: center;

  &:first-child {
    height: 8px;
    width: 8px;
    margin-left: 12px;
    margin-right: 2px;
    margin-top: -6px;
    background-color: ${({ theme }) => theme.connectedGreen};
    border-radius: 50%;
  }
`

const GreenText = styled.div`
  color: ${({ theme }) => theme.connectedGreen};
`

const AccountControl = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  min-width: 0;

  font-weight: ${({ hasENS, isENS }) => (hasENS ? (isENS ? 500 : 400) : 500)};
  font-size: ${({ hasENS, isENS }) =>
    hasENS ? (isENS ? "1rem" : "0.8rem") : "1rem"};

  a:hover {
    text-decoration: underline;
  }

  a {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const ConnectButtonRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  margin: 30px;
`

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.chaliceGray};
  }
`

const WalletName = styled.div`
  padding-left: 0.5rem;
  width: initial;
`

const IconWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + "px" : "32px")};
    width: ${({ size }) => (size ? size + "px" : "32px")};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
`

export default function AccountDetails({
  toggleWalletModal,
  pendingTransactions,
  confirmedTransactions,
  ENSName,
  openOptions,
}) {
  const { account, connector } = useWeb3React()

  const score = useScore()

  const [privacy, setPrivacy] = useState("public")
  // console.log(privacy)

  async function togglePrivacy() {
    console.log(privacy)
    console.log("changingprivacy")
    // setPrivacy(privacy === "public" ? "private" : "public")
    setPrivacy(privacy === "public" ? "private" : "public")

    console.log(privacy)
    const isMetaMask = window.ethereum && window.ethereum.isMetaMask
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector &&
          (connector !== injected || isMetaMask === (k === "METAMASK"))
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0]

    const box = await Box.openBox(account, name)
    // Write this to 3box
    if (privacy === "public") {
      await box.public.set("rabbitholexp", score)
      console.log("public " + score)
      await box.public.set("description", "Rabbit Hole XP: " + score)
      // Optional override the individual's current description with their RabbitHole XP
      const profile = await Box.getProfile(account)
      console.log(profile)
      const check = await box.public.get("rabbitholexp")
      console.log("confirming public " + check)
      const checktwo = await box.public.get("description")
      console.log("confirming public desc " + checktwo)
    } else {
      await box.private.set("rabbitholexp", score)
      await box.public.remove("rabbitholexp")
      console.log("private " + score)
      const check = await box.private.get("rabbitholexp")
      console.log("confirming priv" + check)
      const checkpub = await box.public.get("rabbitholexp")
      console.log("confirming pub" + checkpub)
      // Need to delete if the user has any rabbithole score existing
    }
  }

  // const textColor = privacy === "finance" ? "#275440" : "#463512"

  function formatConnectorName() {
    const isMetaMask = window.ethereum && window.ethereum.isMetaMask
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector &&
          (connector !== injected || isMetaMask === (k === "METAMASK"))
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0]
    return <WalletName>{name}</WalletName>
  }

  function getStatusIcon() {
    if (connector === injected) {
      return (
        <IconWrapper size={16}>
          <Identicon /> {formatConnectorName()}
        </IconWrapper>
      )
    } else if (connector === walletconnect) {
      return (
        <IconWrapper size={16}>
          <img src={WalletConnectIcon} alt={""} /> {formatConnectorName()}
        </IconWrapper>
      )
    } else if (connector === walletlink) {
      return (
        <IconWrapper size={16}>
          <img src={CoinbaseWalletIcon} alt={""} /> {formatConnectorName()}
        </IconWrapper>
      )
    } else if (connector === fortmatic) {
      return (
        <IconWrapper size={16}>
          <img src={FortmaticIcon} alt={""} /> {formatConnectorName()}
        </IconWrapper>
      )
    }
  }

  return (
    <>
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor alt={"close icon"} />
        </CloseIcon>
        <HeaderRow>Account</HeaderRow>
        <AccountSection>
          <YourAccount>
            <InfoCard>
              <AccountGroupingRow>
                {getStatusIcon()}
                <GreenText>
                  <GreenCircle>
                    <div />
                  </GreenCircle>
                </GreenText>
              </AccountGroupingRow>
              <AccountGroupingRow>
                {ENSName ? (
                  <AccountControl hasENS={!!ENSName} isENS={true}>
                    <ProfileHover address={account} showName={true} />
                    <Copy toCopy={ENSName} />
                  </AccountControl>
                ) : (
                  <AccountControl hasENS={!!ENSName} isENS={false}>
                    <ProfileHover address={account} displayFull={true} />
                    <Copy toCopy={account} />
                  </AccountControl>
                )}
              </AccountGroupingRow>

              <SharingSettings>
                <label>
                  {" "}
                  Click Public to share your score on 3B0x
                  {/* <input type="checkbox"></input> */}
                </label>
                <Selector onClick={togglePrivacy}>
                  <PrivateSelector
                    active={privacy === "private"}
                    align="center"
                  >
                    <Text
                      fontWeight={600}
                      fontSize={18}
                      color="#a4a4a4"
                      textAlign="center"
                      width="100%"
                    >
                      Public
                    </Text>
                  </PrivateSelector>
                  <PublicSelector active={privacy === "public"}>
                    <Text
                      fontWeight={600}
                      fontSize={18}
                      color="#a4a4a4"
                      textAlign="center"
                      width="100%"
                    >
                      Private
                    </Text>
                  </PublicSelector>
                </Selector>
              </SharingSettings>
            </InfoCard>
          </YourAccount>
          {!isMobile && (
            <ConnectButtonRow>
              <OptionButton
                onClick={() => {
                  openOptions()
                }}
              >
                Connect to a different wallet
              </OptionButton>
            </ConnectButtonRow>
          )}
        </AccountSection>
      </UpperSection>
    </>
  )
}
