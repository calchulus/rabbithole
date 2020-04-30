import React, { useState } from "react"
import styled from "styled-components"
import { useWeb3React } from "@web3-react/core"
import { useMedia } from "use-media"
import Copy from "../AccountDetails/Copy"
import Spinner from "../Spinner"
import { useQuests } from "../../contexts/Application"

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "profile history" \n"footer footer";
  grid-template-rows: auto 100px;
  grid-template-columns: 40% 60%;
  width: 100%;

  @media (max-width: 930px) {
    grid-template-areas: "switch" \n"current" \n"footer";
    grid-template-rows: 40px auto 50px;
    grid-template-columns: auto;
    margin: 0 auto;
  }
`

const Switcher = styled.div`
  grid-area: switch;
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;

  & > div {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1f1f1f;
    border-bottom: 1px solid ${({ theme }) => theme.outlinePurple};

    &:first-of-type {
      border-right: 1px solid ${({ theme }) => theme.outlinePurple};
    }
  }
`

const Profile = styled.div`
  grid-area: profile;
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

  @media (max-width: 930px) {
    grid-area: current;
    display: ${({ isCurrent }) => (isCurrent ? "block" : "none")};
    width: 90%;
    margin-top: 20px;

    & > div {
      margin-left: 0;
    }
  }
`

const SubHeading = styled.span`
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #a1a4b1;
`

const BadgeList = styled.div`
  display: flex;
  justify-content: space-around;
  border: 1px solid ${({ theme }) => theme.outlinePurple};
  border-radius: 10px;
  background: #1f1f1f;
  padding: 10px;
  margin: auto;
  margin-top: 48px;
  width: 80%;
`

const Badge = styled.img`
  width: 80px;
  margin 10px;
`

const History = styled.div`
  margin-top: 25px;
  margin-left: 30px;
  grid-area: history;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  display: grid;
  grid-template-areas: ". header link" \n"activities activities activities";
  grid-template-columns: 30% 40% 30%;
  grid-template-rows: 100px auto;

  @media (max-width: 930px) {
    grid-area: current;
    display: ${({ isCurrent }) => (isCurrent ? "grid" : "none")};
    grid-template-areas: "header" \n"activities";
    grid-template-columns: auto;
    grid-template-rows: 70px auto;
    margin: auto;
    margin-top: 20px;
  }

  @media (max-width: 550px) {
    width: 90%;
  }
`

const CopyLink = styled.div`
  grid-area: link;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    max-width: 180px;
    color: #A1A4B1;
    font-size: 12px;
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
  display: grid;
  grid-template-columns: 75px auto 100px;
  grid-template-areas: "icon main points";
  border: 1px solid ${({ theme }) => theme.outlinePurple};
  border-radius: 10px;
  background: #1f1f1f;
  height: 75px;
  text-align: left;
  margin: 10px auto;
  width: 90%;

  &: hover {
    background-color: #141516;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  @media (min-width: 1440px) {
    grid-template-columns: 100px auto 100px;
    width: 80%;
  }

  @media (max-width: 550px) {
    grid-template-columns: 50px auto 100px;
    width: 100%;
    margin: 10px 0;
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
  color: ${({ color }) => color};
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

const Footer = styled.div`
  grid-area: footer;
`

export default function ActivityHistory() {
  const quests = useQuests()

  const { account } = useWeb3React()

  const isExtraSmall = useMedia({ maxWidth: "970px" })

  const isXXSmall = useMedia({ maxWidth: "930px" })

  const [currentPanel, setCurrentPanel] = useState("history")

  function toggleCurrentPanel(newPanel) {
    setCurrentPanel(newPanel)
  }

  return (
    <>
      {" "}
      {quests.length > 0 ? (
        <Wrapper>
          {isXXSmall && (
            <Switcher>
              <div onClick={() => toggleCurrentPanel("profile")}>Badges</div>
              <div onClick={() => toggleCurrentPanel("history")}>History</div>
            </Switcher>
          )}
          <Profile isCurrent={currentPanel === "profile"}>
            <div>
              Badges
              <SubHeading>Badges you've earned so far</SubHeading>
            </div>
            <BadgeList>
              {quests &&
                quests.map((quest) => {
                  if (quest.progress >= 100) {
                    return (
                      <Badge
                        src={require("../../assets/images/" +
                          quest.badgeImgPath)}
                        alt=""
                        key={quest.name}
                      />
                    )
                  }
                  return true
                })}
            </BadgeList>
          </Profile>
          <History isCurrent={currentPanel === "history"}>
            <div style={{ gridArea: "header" }}>
              History
              <SubHeading>Quests you've completed so far</SubHeading>
            </div>
            {!isExtraSmall && (
              <CopyLink>
                <div>
                  Share your stats{" "}
                  <Copy toCopy={"https://rabithole.gg/" + account} />
                </div>
              </CopyLink>
            )}
            <div style={{ gridArea: "activities" }}>
              {quests &&
                quests.map((quest) => {
                  if (quest.progress >= 100) {
                    return (
                      <Activity key={quest.name}>
                        <Icon>
                          <img
                            src={require("../../assets/images/" +
                              quest.imgPath)}
                            alt=""
                          />
                        </Icon>
                        <QuestOverview>
                          <Platform color={quest.color}>
                            {quest.platform}
                          </Platform>
                          <BlurbWrapper>{quest.blurb}</BlurbWrapper>
                        </QuestOverview>
                        <Points style={{ gridArea: "points" }}>
                          {quest.points} XP
                        </Points>
                        {false && (
                          <Link>
                            <a href={quest.url}>
                              <img
                                src={require("../../assets/images/globe.png")}
                                alt="etherscan link"
                              />
                            </a>
                          </Link>
                        )}
                      </Activity>
                    )
                  }
                  return true
                })}
            </div>
          </History>
          <Footer />
        </Wrapper>
      ) : (
        <Loading>
          <Spinner />
        </Loading>
      )}
    </>
  )
}
