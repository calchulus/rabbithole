import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { withRouter } from "react-router-dom"

import { financeTrack, gamingTrack } from "../quests"
import Confetti from "canvas-confetti"
import Lock from "../assets/images/lock.png"
import Modal from "../components//Modal"
import { Text } from "rebass"
import { AutoColumn } from "../components/Column"
import { Link } from "../theme/components"
import Row, { RowBetween } from "../components/Row"
import { useQuests } from "../contexts/Application"

const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  margin-top: 40px;
  width: calc(100% - 80px);
`

const TrackSection = styled(AutoColumn)`
  position: relative;
  width: 100%;
  border-radius: 20px;
  margin-bottom: 100px;
`

const Selector = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  width: 300px;
  border-radius: 5px;

  div {
    :hover {
      cursor: pointer;
    }
  }
`

const FinanceSelector = styled(Row)`
  width: 50%;
  height: 100%;
  background-color: ${({ active }) => active && "#8dfbc9"};
  border: ${({ active }) => !active && "1px solid #1F1F1F;"};
  border-right: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`

const GamingSelector = styled(Row)`
  width: 50%;
  height: 100%;
  background-color: ${({ active }) => active && "#FFD683"};
  border: ${({ active }) => !active && "1px solid #1F1F1F;"};
  border-left: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`

const ActiveWrapper = styled.span`
  padding: 6px;
  width: fit-content;
  border-radius: 10px;
  background: ${({ type }) => (type === "finance" ? "#cbffec" : "#FFD683")};
  background: ${({ type }) =>
    type === "finance"
      ? "linear-gradient(3deg,rgba(64, 235, 82, 1) 0%,rgba(66, 255, 176, 1) 37%,rgba(148, 255, 199, 1) 100%);"
      : "linear-gradient(3deg, rgba(215,175,75,1) 0%, rgba(255,243,66,1) 37%, rgba(233,190,47,1) 100%);"}
  margin-top: 24px !important;
`

const TrackCard = styled.span`
  background: ${({ complete, type }) =>
    complete
      ? type === "finance"
        ? "rgba(122, 194, 168, 0.9)"
        : "#FFD683"
      : type === "finance"
      ? "#cbffec"
      : "#FFD683"};
  border-radius: 10px;
  width: 130px;
  padding: 14px;
  transition: all 0.14s cubic-bezier(0.25, 0.8, 0.25, 1);

  :hover {
    cursor: ${({ locked }) => !locked && "pointer"};
    box-shadow: ${({ locked, type }) =>
      !locked &&
      (type === "finance"
        ? "0 14px 28px rgba(122, 194, 168, 0.4),  0 6px 6px rgba(122, 194, 168, 0.4);"
        : "0 14px 28px rgba(215,175,75,1),  0 6px 6px rgba(215,175,75,1);")};
  }

  display: inline-block;
  margin: 0 0.2em 0.5em;
  margin: ${({ offset }) => offset && 0} !important;
  ::before {
    display: ${({ offset }) => offset && "none"} !important;
  }

  margin-top: 24px !important;
  margin-top: ${({ offset }) => offset && 0} !important;
`

const TrackCardInner = styled(AutoColumn)`
  padding: 10px;
  background-color: ${({ type }) =>
    type === "finance" ? "#7AC2A8" : "#D7AF4B"};
  border-radius: 10px;
  min-height: 100px;
`

const ScoreWrapper = styled.div`
  display: flex;
  border-radius: 30px;
  height: 16px;
  background-color: black;
  padding: 4px 10px;
`

const LockedWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: rgba(100, 100, 100, 0.8);
`

const Tree = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;

  margin: 0px 0 1em;
  text-align: center;

  display: table;
  width: fit-content;
  min-width: 830px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    display: table;
    width: 100%;
  }

  li {
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;

    display: table-cell;
    padding: 0.5em 0;
    vertical-align: top;
  }

  li::before {
    outline: 4px solid
      ${({ type }) => (type === "finance" ? "#2d4f43" : "#D7AF4B")};
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  li:first-child:before {
    left: 50%;
  }

  li:last-child:before {
    right: 50%;
  }
  code,
  span {
    display: inline-block;
    margin: 9px 0.2em 34px;
    position: relative;
  }

  ul:before,
  code:before,
  span:before {
    outline: 4px solid
      ${({ type }) => (type === "finance" ? "#2d4f43" : "#D7AF4B")};
    content: "";
    height: 27px;
    left: 50%;
    position: absolute;
  }

  ul:before {
    top: -30px;
  }
  code:before,
  span:before {
    top: -31px;
  }

  > li {
    margin-top: 0;
  }
  > li:before,
  > li:after,
  > li > code:before,
  > li > span:before {
    outline: none;
  }
`

function Progress({ history }) {
  const [openQuest, setOpenQuest] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [activeSection, setActiveSection] = useState("finance")

  const quests = useQuests()
  const [formattedQuests, setFormattedQuests] = useState()

  const rootId = activeSection === "finance" ? "COMP-101" : "KITTY-101"
  const trackStructure =
    activeSection === "finance" ? financeTrack : gamingTrack

  function toggleSection() {
    setActiveSection(activeSection === "finance" ? "gaming" : "finance")
  }

  useEffect(() => {
    if (quests) {
      const newFormatted = {}
      quests.map((quest) => {
        return (newFormatted[quest.name] = quest)
      })
      setFormattedQuests(newFormatted)
    }
  }, [quests])

  function triggerConfetti() {
    Confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const textColor = activeSection === "finance" ? "#275440" : "#463512"

  const Item = ({
    onClick,
    questId,
    locked = false,
    complete = false,
    offset,
  }) => {
    const icon = require("../assets/images/" + questId + "-badge.svg")
    return (
      <TrackCard
        onClick={onClick}
        locked={locked}
        complete={complete}
        offset={offset ? "offset" : ""}
        type={activeSection}
      >
        {locked && (
          <LockedWrapper>
            <img src={Lock} alt="lock" />
          </LockedWrapper>
        )}
        <AutoColumn gap="10px">
          <RowBetween>
            <Text color={textColor} fontWeight={700} fontSize={"12px"}>
              {formattedQuests[questId]?.name}
            </Text>
            {!locked && (
              <Text color={textColor} fontWeight={600} fontSize={"12px"}>
                {parseFloat(formattedQuests[questId]?.progress) >= 100
                  ? "100"
                  : Math.round(
                      parseFloat(formattedQuests[questId]?.progress) * 10
                    ) / 10}
                %
              </Text>
            )}
          </RowBetween>
          <TrackCardInner type={activeSection}>
            <AutoColumn gap="10px" justify="center">
              {!locked && (
                <Text
                  fontWeight={600}
                  color={textColor}
                  textAlign="center"
                  fontSize={"12px"}
                >
                  {formattedQuests[questId]?.blurb}
                </Text>
              )}
              {!locked && (
                <img
                  src={icon}
                  alt=""
                  style={{ height: "40px", width: "40px" }}
                />
              )}
            </AutoColumn>
          </TrackCardInner>
          {complete && (
            <Row style={{ justifyContent: "center" }}>
              <Text fontWeight={600} color={textColor} textAlign="center">
                Redeemed
              </Text>
            </Row>
          )}
          {!complete && (
            <RowBetween>
              <div></div>
              <ScoreWrapper>
                <Text color="#62CF9E" fontWeight={600} fontSize={"12px"}>
                  {formattedQuests[questId]?.points} XP
                </Text>
              </ScoreWrapper>
            </RowBetween>
          )}
        </AutoColumn>
      </TrackCard>
    )
  }

  function renderQuest(questId, locked) {
    return (
      <li key={questId}>
        {formattedQuests[questId]?.progress < 100 && !locked && (
          <ActiveWrapper type={activeSection}>
            <AutoColumn>
              <Item
                key={questId}
                questId={questId}
                offset={true}
                onClick={() => {
                  setOpenQuest(questId)
                  setShowModal(true)
                }}
                type={activeSection}
              />
            </AutoColumn>
          </ActiveWrapper>
        )}
        {formattedQuests[questId]?.progress >= 100 && !locked && (
          <Item
            key={questId}
            complete={true}
            questId={questId}
            onClick={() => {
              setOpenQuest(questId)
              setShowModal(true)
              triggerConfetti()
            }}
            type={activeSection}
          />
        )}
        {locked && (
          <Item
            key={questId}
            locked={true}
            type={activeSection}
            questId={questId}
          />
        )}
        {formattedQuests && trackStructure[questId]?.children && (
          <ul>
            {trackStructure[questId]?.children?.map((childQuest) => {
              return renderQuest(
                childQuest,
                !(formattedQuests[questId]?.progress >= 100 && !locked)
              )
            })}
          </ul>
        )}
      </li>
    )
  }

  const ModalContent = () => {
    return (
      <div style={{ padding: "30px", paddingBottom: "60px" }}>
        <AutoColumn gap="20px">
          <Text fontWeight={800} color="#404040" fontSize={24}>
            {openQuest}
          </Text>
          <AutoColumn gap="10px">
            <Text fontWeight={400} color="#CBC9BC" fontSize={16}>
              Quest Details
            </Text>
            <Text fontWeight={600} color="white" fontSize={16}>
              {formattedQuests[openQuest]?.blurb}
            </Text>
          </AutoColumn>
          <AutoColumn gap="10px">
            <Text fontWeight={400} color="#CBC9BC" fontSize={16}>
              Protocol Details
            </Text>
            <Text fontWeight={600} color="white" fontSize={16}>
              {formattedQuests[openQuest]?.description}
            </Text>
          </AutoColumn>
          <AutoColumn gap="10px">
            <Text fontWeight={400} color="#CBC9BC" fontSize={16}>
              Requirements
            </Text>
            <Text fontWeight={600} color="white" fontSize={16}>
              none
            </Text>
          </AutoColumn>
          <AutoColumn gap="10px">
            <Text fontWeight={400} color="#CBC9BC" fontSize={16}>
              Start here to complete
            </Text>
            <Text fontWeight={600} color="white" fontSize={16}>
              <Link href={formattedQuests[openQuest]?.resource}>
                {formattedQuests[openQuest]?.resource}
              </Link>
            </Text>
          </AutoColumn>
          <AutoColumn gap="10px">
            <Text fontWeight={400} color="#CBC9BC" fontSize={16}>
              Reward
            </Text>
            <Text fontSize={"20px"} color="#62CF9E">
              {formattedQuests[openQuest]?.points} XP
            </Text>
          </AutoColumn>
        </AutoColumn>
      </div>
    )
  }

  return (
    <ProgressWrapper>
      <Modal
        isOpen={showModal}
        onDismiss={() => {
          setShowModal(false)
        }}
      >
        <ModalContent />
      </Modal>
      <RowBetween>
        <AutoColumn gap="10px">
          <Text fontWeight={500} fontSize={28}>
            Quest Tree
          </Text>
          <Text>Progress through each track to earn rewards.</Text>
        </AutoColumn>
        <Selector onClick={toggleSection}>
          <FinanceSelector active={activeSection === "finance"}>
            <Text
              fontWeight={600}
              fontSize={18}
              color="#0D5736"
              textAlign="center"
              width="100%"
            >
              Finance
            </Text>
          </FinanceSelector>
          <GamingSelector active={activeSection === "gaming"} align="center">
            <Text
              fontWeight={600}
              fontSize={18}
              color="#1F1F1F"
              textAlign="center"
              width="100%"
            >
              Gaming
            </Text>
          </GamingSelector>
        </Selector>
      </RowBetween>
      <AutoColumn gap="40px" style={{ marginTop: "40px" }}>
        <TrackSection justify="center">
          <Tree type={activeSection}>
            {formattedQuests?.[rootId] && renderQuest(rootId, false)}
          </Tree>
        </TrackSection>
      </AutoColumn>
    </ProgressWrapper>
  )
}

export default withRouter(Progress)
