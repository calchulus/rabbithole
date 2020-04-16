import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { fetchQuests } from '../../quests'
import { useWeb3React } from '@web3-react/core'
import { useENSName } from '../../hooks'
import useMedia from 'use-media'
const EthmojiAPI = require('ethmoji-js').default

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 65%;
  margin: auto;
  align-items: flex-start;
  justify-content: center;
  padding-top: ${({ theme }) => theme.bigPadding};
`

const Section = styled.div`
  display: grid;
  grid-template-areas: "header header"\n"gutter quests";
  grid-template-columns: 21px auto;
  grid-template-rows: 115px auto;
  width: 100%;
`

const Heading = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  font-size: 24px;
  height: 80px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 2rem;

  & > div > span {
    display: block;
    font-size: 16px;
    margin-top: 5px;
    color: #A1A4B1;
  }
`

const Gutter = styled.div`
  grid-area: gutter;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
`

const Quest = styled.div`
  width: 100%;
  display: grid;
  width: 100%;
  height: ${({isOpen}) => isOpen ? '150px' : '75px' };
  font-size: 14px;
  align-items: center;
  background-color: #1F1F1F;
  border: 1px solid ${({theme}) => theme.outlinePurple};
  border-radius: 10px;
  grid-template-columns: 68px 120px auto 75px 75px auto 75px; 
  grid-template-rows: ${({isOpen}) => isOpen ? '75px 50px' : '75px' };
  grid-template-areas: ${({isOpen}) => isOpen ? '"exp icon main points type track perc"\n"desc desc desc desc desc desc desc"' : '"exp icon main points type track perc"' };
  margin-bottom: 13px;

  &:hover {
    cursor: pointer;
    background-color: #202020;
  }

  &:first-of-type {
    margin-top: 10px;
  }

  @media (max-width: 1400px) {
    grid-template-columns: 40px 50px auto 75px 75px 120px 75px;
  }

  @media (max-width: 970px) {
    grid-template-columns: 40px 50px auto 75px 75px 120px 75px;
  }

  @media (max-width: 820px) {
    grid-template-columns: 40px 50px 300px auto 80px;
  }

  @media (max-width: 670px) {
    grid-template-columns: 40px 50px 200px auto 80px;
  }

  @media (max-width: 525px) {
    grid-template-columns: auto auto auto;
    grid-column-gap: 12px;
  }
`

const BlurbWrapper = styled.div`
  width: fit-content;

  @media (max-width: 670px) {
    width: 200px;
  }
`

const Collapser = styled.img`
  grid-area: exp;
  margin: auto;
  height: 15px;
  width: 8px;
  transform: rotate(${({isOpen}) => isOpen ? 'none': '-90deg'});
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

const Platform = styled.div`
  font-size: 10px;
  color: ${({color}) => color};
  text-transform: uppercase;
`

const Track = styled.div`
  grid-area: track;  
  padding: 0 14px;
  display: flex;
  width: 70px;
  height: 24px;
  font-size: 16px;
  color: rgba(245, 245, 253, 0.2);
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  white-space: nowrap;
`

const QuestWrapper = styled.div`
  grid-area: quests;
`

const QuestOverview = styled.div`
  grid-area: main;
  width: 100%;
  padding-left: 15px;
`

const JustifyEnd = styled.div`
  justify-self: end;
  margin-right: 20px;
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
`

const DripSymbol = styled.img`
  height: 15px;
  margin-left: 3px;
`

const QuestType = styled.div`
  grid-area: type;
`

const MojiWrapper = styled.div`
  height: 70px;
  width: 70px;
  margin-top: 2rem;

  img {
    height: 70px;
    width: 70px;
  }
`

const Description = styled.div`
  width: 90%;
  grid-area: desc;
  margin: auto;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none' };
`

export default function QuestSection() {
  const [quests, setQuests] = useState([])

  const [weeklyQuests, setWeeklyQuests] = useState([])

  const [sideQuests, setSideQuests] = useState([])

  const { account } = useWeb3React()

  const ENSName = useENSName(account)

  const [OpenQuest, setOpenQuest] = useState()

  const [ethMoji, setEthmoji] = useState()

  const isMedium = useMedia({ maxWidth: '1400px' })

  const isSmall = useMedia({ maxWidth: '1100px' })

  const isExtraSmall = useMedia({ maxWidth: '970px' })

  const isXXSmall = useMedia({ maxWidth: '930px' })

  const isXXXSmall = useMedia({ maxWidth: '525px' })

  useEffect(() => {
    const getEthmoji = async () => {
      const ethmojiAPI = new EthmojiAPI(global.web3.currentProvider)
      await ethmojiAPI.init()
      const avatar = await ethmojiAPI.getAvatar(account)
      if (avatar) {
        setEthmoji(avatar)
      }
    }
    getEthmoji()
  })

  useEffect(() => {
    fetchQuests(ENSName, account).then(data => {
      let weeklyQuests = 0;
      let sideQuests = 0;
      data.map((quest) => {
        if (quest.type === 'weekly') {
          weeklyQuests += 1;
        } 
        if (quest.type === 'side-quest') {
          sideQuests += 1;
        }
      })
      setSideQuests(sideQuests)
      setWeeklyQuests(weeklyQuests)
      setQuests(data)
    })
  }, [ENSName, account])

  return (
    <Wrapper>
      {weeklyQuests > 0 ?
        <Section>
          <Heading>
            <div>Weekly Quests<span>Complete these challenges before they expire</span></div>
            {!isXXSmall ? (
              <MojiWrapper style={{ paddingRight: '1rem' }}>{ethMoji && <img src={ethMoji.imageUrl} alt="" />}</MojiWrapper>
            ) : null}
          </Heading>

          <Gutter />

          <QuestWrapper>
            {quests.map((quest, i) => {
              let icon = require('../../assets/images/' + quest.imgPath)
              if (quest.type === 'weekly') {
                return (
                  <Quest
                    key={i}
                    isOpen={OpenQuest === quest}
                    onClick={() => {
                      setOpenQuest(quest)
                    }}
                  >
                    <Collapser isOpen={OpenQuest === quest} src={require('../../assets/images/carat.svg')}></Collapser>
                    <Icon>
                      <img src={icon} alt="" />
                    </Icon>
                    <QuestOverview>
                      <Platform color={quest.color}>{quest.platform}</Platform>
                      <BlurbWrapper>{quest.blurb}</BlurbWrapper>
                    </QuestOverview>
                    <JustifyEnd style={{ gridArea: 'perc' }}>
                      {(isXXXSmall ? (quest.progress).toFixed(0) : (quest.progress).toFixed(1)) + '%'}
                    </JustifyEnd>
                    {!isXXXSmall && <QuestType><img src={require('../../assets/images/track.svg')} alt={quest.type} /></QuestType>}
                    {!isExtraSmall && <Track>{quest.track}</Track>}
                    {!isXXXSmall && <Points>{quest.points}<DripSymbol src={require('../../assets/images/drip_symbol.svg')}/></Points>}
                    {<Description isOpen={OpenQuest === quest}>{quest.description}</Description>}
                  </Quest>
                )
              }
              return true
            })}
          </QuestWrapper>
        </Section>
       : null }

      <Section>
        <Heading>
          <div>Tracks<span>Progress through each application’s track and earn rewards</span></div>
        </Heading>

        <Gutter />

        <QuestWrapper>
          {quests.map((quest, i) => {
            if (quest.type === 'track' && quest.progress < 100) {
              return (
                <Quest
                  key={i}
                  isOpen={OpenQuest === quest}
                  onClick={() => {
                    setOpenQuest(quest)
                  }}
                >

                  <Collapser isOpen={OpenQuest === quest} src={require('../../assets/images/carat.svg')}></Collapser>
                  <Icon>
                    <img src={require('../../assets/images/' + quest.imgPath)} alt="" />
                  </Icon>
                  <QuestOverview>
                    <Platform color={quest.color}>{quest.platform}</Platform>
                    <BlurbWrapper>{quest.blurb}</BlurbWrapper>
                  </QuestOverview>
                  <JustifyEnd style={{ gridArea: 'perc' }}>
                    {(isXXXSmall ? (quest.progress).toFixed(0) : (quest.progress).toFixed(1)) + '%'}
                  </JustifyEnd>
                  {!isXXXSmall && <QuestType><img src={require('../../assets/images/' + quest.type + '.svg')} alt={quest.type} /></QuestType>}
                  {!isExtraSmall && <Track>{quest.category}</Track>}
                  {!isXXXSmall && <Points style={{ gridArea: 'points' }}>{quest.points}<DripSymbol src={require('../../assets/images/drip_symbol.svg')}/></Points>}
                  {<Description isOpen={OpenQuest === quest}>{quest.description}</Description>}
                </Quest>
              )
            }
            return true
          })}
        </QuestWrapper>
      </Section>

      {sideQuests > 0 ?
        <Section>
          <Heading>
            <div>Bonus Challenges<span>Complete these challenges before they expire</span></div>
            {!isXXSmall ? (
              <MojiWrapper style={{ paddingRight: '1rem' }}>{ethMoji && <img src={ethMoji.imageUrl} alt="" />}</MojiWrapper>
            ) : null}
          </Heading>

          <Gutter />

          <QuestWrapper>
            {quests.map((quest, i) => {
              let icon = require('../../assets/images/' + quest.imgPath)
              if (quest.type === 'side-quest' && quest.progress < 100) {
                return (
                  <Quest
                    key={i}
                    isOpen={OpenQuest === quest}
                    onClick={() => {
                      setOpenQuest(quest)
                    }}
                  >
                    <Collapser isOpen={OpenQuest === quest} src={require('../../assets/images/carat.svg')}></Collapser>
                    <Icon>
                      <img src={icon} alt="" />
                    </Icon>
                    <QuestOverview>
                      <Platform color={quest.color}>{quest.platform}</Platform>
                      <BlurbWrapper>{quest.blurb}</BlurbWrapper>
                    </QuestOverview>
                    <JustifyEnd style={{ gridArea: 'perc' }}>
                      {(isXXXSmall ? (quest.progress).toFixed(0) : (quest.progress).toFixed(1)) + '%'}
                    </JustifyEnd>
                    {!isXXXSmall && <QuestType><img src={require('../../assets/images/' + quest.type + '.svg')} alt={quest.type} /></QuestType>}
                    {!isExtraSmall && <Track>{quest.track}</Track>}
                    {!isXXXSmall && <Points>{quest.points}<DripSymbol src={require('../../assets/images/drip_symbol.svg')}/></Points>}
                    {<Description isOpen={OpenQuest === quest}>{quest.description}</Description>}
                  </Quest>
                )
              }
              return true
            })}
          </QuestWrapper>
        </Section>
       : null }
    </Wrapper>
  )
}
