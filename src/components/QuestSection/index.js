import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { fetchQuests } from '../../quests'
import { useWeb3React } from '@web3-react/core'
import { useENSName } from '../../hooks'
import Web3Status from '../Web3Status'
import useMedia from 'use-media'
import Modal from '../Modal'
const EthmojiAPI = require('ethmoji-js').default

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  padding-top: ${({ theme }) => theme.bigPadding};
`

const Heading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  font-size: 20px;
  height: 80px;
  font-weight: 700;
  margin-bottom: 2rem;
`

const SectionHeading = styled.div`
  width: 100%;
  height: 32px;
  background-color: #35363b;
  display: flex;
  align-items: center;
  font-weight: 700;
  * {
    margin-left: 32px;
  }
`

const Quest = styled.div`
  width: 100%;
  display: grid;
  grid-templatealign-items: center;
  width: 100%;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
  grid-template-columns: 68px 120px 340px auto auto 100px;
  grid-column-gap: 20px;

  &:hover {
    cursor: pointer;
    background-color: #202020;
  }

  @media (max-width: 1400px) {
    grid-template-columns: 68px 340px auto auto 100px;
  }

  @media (max-width: 970px) {
    grid-template-columns: 68px 340px auto 100px;
  }

  @media (max-width: 820px) {
    grid-template-columns: 68px 300px auto 80px;
  }

  @media (max-width: 670px) {
    grid-template-columns: 68px 200px auto 80px;
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

const Icon = styled.div`
  margin-left: 32px;
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

const QuestName = styled.div`
  color: grey;
  font-size: 18px;
`

const Flag = styled.div`
  padding: 2px 14px;
  display: flex;
  height: 30px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  width: fit-content;
  border: 1px solid ${({ color }) => color};
  white-space: nowrap;
`

const FlagGroup = styled.div`
  display: flex;
  flex-direction: row;

  & > div {
    margin-right: 20px;
  }
`

const QuestWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`

const JustifyEnd = styled.div`
  justify-self: end;
  margin-right: 20px;
`

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 2rem 3rem 2rem;
`

const ModalRow = styled.div`
  padding-top: 2rem;
  display: grid;
  row-gap: 20px;
`

const ContentHeader = styled.div`
  font-weight: 600;
`

const ContentBody = styled.span`
  color: #bebfc1;
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

const LoginWrapper = styled.div`
  width: 140px;
  padding-right: 1rem;
`

export default function QuestSection() {
  const [quests, setQuests] = useState([])

  const { account } = useWeb3React()

  const ENSName = useENSName(account)

  const [modalOpen, toggleModal] = useState(false)

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
      setQuests(data)
    })
  }, [ENSName, account])

  return (
    <Wrapper>
      <Modal
        isOpen={modalOpen}
        onDismiss={() => {
          toggleModal(false)
        }}
      >
        <ModalContent>
          {OpenQuest && (
            <>
              <ModalRow>
                <span style={{ color: '#00D395' }}>{OpenQuest.name}</span>
              </ModalRow>
              <ModalRow>
                <ContentHeader>Platform</ContentHeader>
                <ContentBody>{OpenQuest.description}</ContentBody>
              </ModalRow>
              <ModalRow>
                <ContentHeader>Challenge</ContentHeader>
                <ContentBody>{OpenQuest.task}</ContentBody>
              </ModalRow>
              <ModalRow>
                <ContentHeader>Where to Start</ContentHeader>
                <ContentBody>{OpenQuest.resource}</ContentBody>
              </ModalRow>
            </>
          )}
        </ModalContent>
      </Modal>
      <Heading>
        <div style={{ paddingLeft: '2rem' }}>{isXXSmall ? 'Janus' : 'Challenges'}</div>
        {!isXXSmall ? (
          <MojiWrapper style={{ paddingRight: '1rem' }}>{ethMoji && <img src={ethMoji.imageUrl} alt="" />}</MojiWrapper>
        ) : (
          <LoginWrapper>
            <Web3Status />
          </LoginWrapper>
        )}
      </Heading>
      <SectionHeading>
        <div>Uncompleted</div>
      </SectionHeading>
      <QuestWrapper>
        {quests.map((quest, i) => {
          let icon = require('../../assets/images/' + quest.imgPath)
          if (quest.progress < 100) {
            return (
              <Quest
                key={i}
                onClick={() => {
                  setOpenQuest(quest)
                  toggleModal(true)
                }}
              >
                <Icon>
                  <img src={icon} alt="" />
                </Icon>
                {!isMedium && <QuestName>{quest.name}</QuestName>}
                <BlurbWrapper>{quest.blurb}</BlurbWrapper>
                {!isExtraSmall && (
                  <FlagGroup>
                    {!isSmall && <Flag color={quest.color}>{quest.platform}</Flag>}
                    <Flag color="#7BB189">{quest.category}</Flag>
                  </FlagGroup>
                )}
                {!isXXXSmall && <JustifyEnd>{quest.points + ' points'}</JustifyEnd>}
                <JustifyEnd>
                  {(isXXXSmall ? (quest.progress * 100).toFixed(0) : (quest.progress * 100).toFixed(4)) + '%'}
                </JustifyEnd>
              </Quest>
            )
          }
          return true
        })}
      </QuestWrapper>
      <SectionHeading>
        <div>Completed</div>
      </SectionHeading>
      <QuestWrapper>
        {quests.map((quest, i) => {
          if (quest.progress === 100) {
            return (
              <Quest
                key={i}
                onClick={() => {
                  setOpenQuest(quest)
                  toggleModal(true)
                }}
              >
                <Icon>
                  <img src={require('../../assets/images/' + quest.imgPath)} alt="" />
                </Icon>
                {!isMedium && <QuestName>{quest.name}</QuestName>}
                <BlurbWrapper>{quest.blurb}</BlurbWrapper>
                {!isExtraSmall && (
                  <FlagGroup>
                    {!isSmall && <Flag color={quest.color}>{quest.platform}</Flag>}
                    <Flag color="#7BB189">{quest.category}</Flag>
                  </FlagGroup>
                )}
                {!isXXXSmall && <JustifyEnd>{quest.points + ' points'}</JustifyEnd>}
                <JustifyEnd style={{ color: 'green' }}>{isXXXSmall ? '✓' : 'Completed'}</JustifyEnd>
              </Quest>
            )
          }
          return true
        })}
      </QuestWrapper>
    </Wrapper>
  )
}
