import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { fetchQuests } from '../../quests'
import { useWeb3React } from '@web3-react/core'
import { useENSName } from '../../hooks'
import Copy from '../AccountDetails/Copy'
import Spinner from '../Spinner'

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "leaderboard history";
  grid-template-rows: auto;
  grid-template-columns: 500px 1fr;
`

const Leaderboard = styled.div`
  grid-area: leaderboard;
  width: 80%;
  margin: auto;
  margin-top: 25px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;

  & > img {
    width: 45px;
    height: 58px;
  }

  & > div {
    display: inline-block;
    margin-left: 15px;
  }
`

const SubHeading = styled.span`
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #A1A4B1;
`

const History = styled.div`
  margin-top: 25px;
  grid-area: history;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  display: grid;
  grid-template-areas: "header link"\n"activities activities";
  grid-template-columns: 500px 160px;
  grid-template-rows: 100px auto;
`

const CopyLink = styled.div`
  grid-area: link;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    max-width: 150px;
    color: #A1A4B1;
    font-size: 10px;
    height: 27px;
    border: 1px solid ${({ theme }) => theme.outlinePurple};
    border-radius: 20px;
    background: #1F1F1F;
    padding 0 15px;
    display: flex;
    align-items: center;
  }
`

const Activity = styled.div`
  display: grid
  grid-template-columns: 75px auto 75px 75px; 
  grid-template-areas: "icon main points link";
  border: 1px solid ${({ theme }) => theme.outlinePurple};
  border-radius: 10px;
  background: #1F1F1F;
  height: 75px;
  text-align: left;
  margin-bottom: 20px;
  vertical-align: center;

  &: hover {
    background-color: #141516;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

const Icon = styled.div`
  grid-area: icon;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #343434;
  height: 40px;
  width: 40px;
  border-radius: 50%;

  & > * {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }

  @media (max-width: 970px) {
    margin-left: 1rem;
  }

  @media (max-width: 525px) {
    margin-left: 0.5rem;
  }
`

const QuestOverview = styled.div`
  grid-area: main;
  width: 100%;
  padding-left: 15px;
  display: flex;
  flex-flow: column;
  justify-content: center;
`

const Platform = styled.div`
  font-size: 10px;
  color: ${({color}) => color};
  text-transform: uppercase;
`

const BlurbWrapper = styled.div`
  width: fit-content;
  font-size: 14px;

  @media (max-width: 670px) {
    width: 200px;
  }
`

const Points = styled.div`
  grid-area: points;
  border: 1px solid rgba(141, 251, 201, 0.4);
  border-radius: 15px;
  color: #8DFBC9;
  height: 27px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Inter;
  font-size 13px;
  font-weight: bold;
  margin: auto;
`

const DripSymbol = styled.img`
  height: 15px;
  margin-left: 3px;
`

const Link = styled.div`
  grid-area: link;
  display: flex;
  justify-content: center;
  align-items: center;

  & > a > img {
    padding-top: 4px;
  }
`

const Loading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export default function ActivityHistory() {
  const [quests, setQuests] = useState([])

  const { account } = useWeb3React()

  const ENSName = useENSName(account)

  useEffect(() => {
    fetchQuests(ENSName, account).then(data => {
      console.log(data)
      setQuests(data)
    })
  }, [ENSName, account])

  return (
    <> { quests.length > 0 ?
      <Wrapper>
        <Leaderboard>
          <img src={require('../../assets/images/drip_symbol.svg')} alt="Drip" />
          <div>
            Leaderboard
            <SubHeading>Who's got more drip?</SubHeading>
          </div>
        </Leaderboard>
        <History>
          <div style={{ gridArea: 'header' }}>
            History
            <SubHeading>Ode to the journey</SubHeading>
          </div>
          <CopyLink>
            <div>
              Copy link <Copy toCopy={'https://rabithole.gg/' + account} />
            </div>
          </CopyLink>
          <div style={{ gridArea: 'activities' }}>
            {quests ?
            quests.map(quest => {
              if (quest.progress >= 100) {
                return (
                  <Activity key={quest.name}>
                    <Icon>
                      <img src={require('../../assets/images/' + quest.imgPath)} alt="" />
                    </Icon>
                    <QuestOverview>
                      <Platform color={quest.color}>{quest.platform}</Platform>
                      <BlurbWrapper>{quest.blurb}</BlurbWrapper>
                    </QuestOverview>
                    <Points style={{ gridArea: 'points' }}>{quest.points}<DripSymbol src={require('../../assets/images/drip_symbol.svg')}/></Points>
                    <Link>
                      <a href={quest.url}><img src={require('../../assets/images/globe.png')} alt="etherscan link" /></a>
                    </Link>
                  </Activity>
                )
              }}) : null}
          </div>
        </History>
    </Wrapper> : <Loading><Spinner /></Loading>}
  </>);
}
