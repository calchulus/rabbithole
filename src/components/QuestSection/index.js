import React, { useState, useEffect, Suspense } from "react"
import styled from "styled-components"
import { useWeb3React } from "@web3-react/core"
import {
  useENSName,
  // useBoxStorage,
  // useNotificationThread,
  // useThreadPosts,
} from "../../hooks"
import Spinner from "../Spinner"
import useMedia from "use-media"
import { useQuests } from "../../contexts/Application"
import { financeTrack, gamingTrack } from "../../quests"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 65%;
  margin: auto;
  align-items: flex-start;
  justify-content: center;
  padding-top: ${({ theme }) => theme.bigPadding};

  @media (max-width: 1200px) {
    width: 80%;
  }

  @media (max-width: 970px) {
    width: 90%;
  }

  @media (max-width: 550px) {
    with: 100%;
    padding-top: 5px;
  }
`

const Section = styled.div`
  display: grid;
  grid-template-areas: "header header" \n"gutter quests";
  grid-template-columns: 21px auto;
  grid-template-rows: 115px auto;
  width: 100%;

  @media (max-width: 525px) {
    grid-template-areas: "header header" \n"quests quests";
  }
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
    color: #a1a4b1;
  }

  @media (max-width: 550px) {
    text-align: center;
    width: 75%;
    margin: auto;
  }
`

const Gutter = styled.div`
  grid-area: gutter;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
`

const Quest = styled.div`
  width: 100%;
  display: grid;
  height: ${({ isOpen }) => (isOpen ? "auto" : "75px")};
  font-size: 14px;
  align-items: center;
  background-color: #1f1f1f;
  border: 1px solid ${({ theme }) => theme.outlinePurple};
  border-radius: 10px;
  grid-template-columns: 68px 120px auto 75px 75px 120px 75px;
  grid-template-rows: ${({ isOpen }) => (isOpen ? "75px auto 60px" : "75px")};
  grid-template-areas: ${({ isOpen }) =>
    isOpen
      ? '"exp icon main perc type track points"\n"desc desc desc desc desc desc desc"\n"resc resc resc resc cta cta cta"'
      : '"exp icon main perc type track points"'};
  margin-bottom: 13px;

  &:hover {
    cursor: pointer;
    background-color: #141516;
  }

  &:first-of-type {
    margin-top: 10px;
  }

  @media (max-width: 1400px) {
    grid-template-areas: ${({ isOpen }) =>
      isOpen
        ? '"exp icon main perc type track points"\n"desc desc desc desc desc desc desc"\n"resc resc resc resc cta cta cta"'
        : '"exp icon main perc type track points"'};
    grid-template-columns: 40px 50px auto 75px 75px 120px 75px;
  }

  @media (max-width: 970px) {
    grid-template-areas: ${({ isOpen }) =>
      isOpen
        ? '"exp icon main track points"\n"desc desc desc desc desc"\n"resc resc resc cta cta"'
        : '"exp icon main track points"'};
    grid-template-columns: 40px 50px auto 120px 75px;
    grid-template-rows: ${({ isOpen }) => (isOpen ? "75px auto 60px" : "75px")};
  }

  @media (max-width: 820px) {
    grid-template-columns: 40px 50px auto 120px 80px;
  }

  @media (max-width: 670px) {
    grid-template-columns: 40px 50px auto 120px 80px;
  }

  @media (max-width: 525px) {
    grid-template-rows: ${({ isOpen }) => (isOpen ? "75px auto 40px" : "75px")};
    grid-template-areas: ${({ isOpen }) =>
      isOpen
        ? '"exp icon main points"\n"desc desc desc desc"\n"resc resc resc cta"\n"track track track cta"'
        : '"exp icon main points"'};
    grid-template-columns: 15px 45px auto 75px;
    grid-template-rows: ${({ isOpen }) =>
      isOpen ? "75px auto 30px 45px" : "75px"};
    grid-column-gap: 2px;
  }
`

const BlurbWrapper = styled.div`
  width: fit-content;

  @media (max-width: 670px) {
    width: 200px;
    font-weight: bold;
  }
`

const Collapser = styled.img`
  grid-area: exp;
  margin: auto;
  height: 15px;
  width: 8px;
  transform: rotate(${({ isOpen }) => (isOpen ? "none" : "-90deg")});
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
  font-size: 12px;
  font-weight: bold;
  color: ${({ color }) => color};
  text-transform: uppercase;
`

const Track = styled.div`
  grid-area: track;
  padding: 0 14px;
  display: flex;
  width: 70px;
  height: 24px;
  font-size: 13px;
  color: ${({ color }) => color};
  background-color: none;
  border: 1px solid ${({ color }) => color};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  white-space: nowrap;

  @media (max-width: 550px) {
    grid-area: none;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  }
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

const QuestType = styled.div`
  grid-area: type;
`

const Description = styled.div`
  width: 90%;
  grid-area: desc;
  margin: auto;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  padding-bottom: 20px;
`

const Resource = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  grid-area: resc;
  font-size: 13px;
  text-align: center;

  & > a {
    color: #8dfbc9;

    :visited {
      color: #8dfbc9;
    }
  }
`

const CTA = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  grid-area: cta;
  font-size: 10px;
  color: ${({ color }) => color};
  text-transform: uppercase;
`

const Loading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Footer = styled.div`
  height: 100px;

  media (max-width: 550px) {
    height: 30px;
  }
`

export default function QuestSection() {
  const [weeklyQuests, setWeeklyQuests] = useState([])

  const [sideQuests, setSideQuests] = useState([])

  const { account } = useWeb3React()

  const ENSName = useENSName(account)

  // const userSpace = useBoxStorage(account, global.web3.currentProvider)

  // const notificationThread = useNotificationThread(userSpace, account)

  // const notificationPosts = useThreadPosts(notificationThread)

  const [OpenQuest, setOpenQuest] = useState()

  const quests = useQuests()

  const isExtraSmall = useMedia({ maxWidth: "970px" })

  const isXXSmall = useMedia({ maxWidth: "930px" })

  const isXXXSmall = useMedia({ maxWidth: "525px" })

  const root0 = "COMP-101"
  const root1 = "KITTY-101"

  useEffect(() => {
    let weeklyQuests = 0
    let sideQuests = 0
    quests &&
      quests.map((quest) => {
        if (quest.type === "weekly" && quest.progress < 100) {
          weeklyQuests += 1
        }
        if (quest.type === "side-quest" && quest.progress < 100) {
          sideQuests += 1
        }
        return true
      })
    setSideQuests(sideQuests)
    setWeeklyQuests(weeklyQuests)
  }, [ENSName, account, quests])

  const [formattedQuests, setFormattedQuests] = useState()

  useEffect(() => {
    if (quests) {
      const newFormatted = {}
      quests.map((quest) => {
        return (newFormatted[quest.name] = quest)
      })
      setFormattedQuests(newFormatted)
    }
  }, [quests])

  function renderQuest(quest, locked, track) {
    return (
      quest && (
        <>
          {quest?.progress < 100 && !locked && (
            <QuestItem quest={quest} key={quest.name} />
          )}
          {formattedQuests &&
            track[quest?.name]?.children &&
            track[quest?.name]?.children?.map((childQuest) => {
              return renderQuest(
                formattedQuests[childQuest],
                !(quest?.progress >= 100 && !locked),
                track
              )
            })}
        </>
      )
    )
  }

  const QuestItem = ({ quest }) => (
    <Quest
      key={quest.name}
      isOpen={OpenQuest === quest}
      onClick={() => {
        if (OpenQuest === quest) {
          setOpenQuest(null)
        } else {
          setOpenQuest(quest)
        }
      }}
    >
      <Collapser
        isOpen={OpenQuest === quest}
        src={require("../../assets/images/carat.svg")}
      ></Collapser>
      <Icon>
        <img src={require("../../assets/images/" + quest?.imgPath)} alt="" />
      </Icon>
      <QuestOverview>
        <Platform color={quest.color}>
         {quest.name}
        </Platform>
        <BlurbWrapper>{quest.blurb}</BlurbWrapper>
      </QuestOverview>
      {!isExtraSmall && (
        <JustifyEnd style={{ gridArea: "perc" }}>
          {quest.progress.toFixed(1) + "%"}
        </JustifyEnd>
      )}
      {!isExtraSmall && (
        <QuestType>
          <img
            src={require("../../assets/images/track.svg")}
            alt={quest.type}
          />
        </QuestType>
      )}
      {!isXXXSmall ? (
        <Track color={quest.categoryColor} isOpen={OpenQuest === quest}>
          {quest.category}
        </Track>
      ) : (
        <div
          style={{
            gridArea: "track",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Track color={quest.categoryColor} isOpen={OpenQuest === quest}>
            {quest.category}
          </Track>
        </div>
      )}
      <Points>{quest.points} XP</Points>
      <Description isOpen={OpenQuest === quest}>
        {quest.description}
      </Description>
      <Resource isOpen={OpenQuest === quest}>
        <a href={quest.resource} target="_blank" rel="noopener noreferrer">
          {quest.resource}
        </a>
      </Resource>
      <CTA isOpen={OpenQuest === quest}>{quest.platform}</CTA>
    </Quest>
  )

  return (
    <Suspense fallback={null}>
      {quests.length > 0 ? (
        <Wrapper>
          {weeklyQuests > 0 && (
            <Section>
              <Heading>
                <div>
                  Weekly Quests
                  <span>Complete these challenges before they expire</span>
                </div>
              </Heading>
              {!isXXSmall ? <Gutter /> : null}
              <QuestWrapper>
                {quests
                  .sort((a, b) => {
                    if (a?.points >= b?.points) {
                      return -1
                    } else {
                      return 1
                    }
                  })
                  .map((quest, i) => {
                    if (quest.type === "weekly" && quest.progress < 100) {
                      return <QuestItem quest={quest} />
                    }
                    return true
                  })}
              </QuestWrapper>
            </Section>
          )}
          <Section>
            <Heading>
              <div>
                Quests in progress
                <span>
                  Complete these quests to move onto the next level in its
                  track. View your current journey on the Progress page.
                </span>
              </div>
            </Heading>
            {!isXXSmall && <Gutter />}
            <QuestWrapper>
              {formattedQuests &&
                renderQuest(formattedQuests[root0], false, financeTrack)}
              {formattedQuests &&
                renderQuest(formattedQuests[root1], false, gamingTrack)}
            </QuestWrapper>
          </Section>
          {sideQuests > 0 && (
            <Section>
              <Heading>
                <div>
                  Bonus Challenges
                  <span>Complete these challenges before they expire</span>
                </div>
              </Heading>
              {!isXXSmall && <Gutter />}
              <QuestWrapper>
                {quests
                  .map((quest, i) => {
                    if (quest.type === "side-quest" && quest.progress < 100) {
                      return <QuestItem quest={quest} />
                    }
                    return true
                  })}
              </QuestWrapper>
            </Section>
          )}
          <Footer />
        </Wrapper>
      ) : (
        <Loading>
          <Spinner />
        </Loading>
      )}
    </Suspense>
  )
}
