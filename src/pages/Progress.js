import React, { useState } from "react"
import styled from "styled-components"
import { withRouter } from "react-router-dom"

import Confetti from "canvas-confetti"
import Star from "../assets/images/star.png"
import Lock from "../assets/images/lock.png"
import Modal from "../components//Modal"
import { Text } from "rebass"
import { AutoColumn } from "../components/Column"
import Row, { RowBetween } from "../components/Row"

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
    box-shadow: ${({ locked }) =>
      !locked &&
      "0 14px 28px rgba(122, 194, 168, 0.8),  0 6px 6px rgba(122, 194, 168, 0.8);"};
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
  min-height: 60px;
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

const mockQuests = {
  quest0: {
    progress: 100,
  },
  quest1: {
    progress: 0,
  },
  quest2: {
    progress: 0,
  },
  quest3: {
    progress: 0,
  },
  quest4: {
    progress: 0,
  },
}

const rootId = "quest0"

const mockData = {
  quest0: {
    children: ["quest1", "quest2"],
  },
  quest1: {
    children: ["quest3"],
  },
  quest2: {
    children: ["quest4", "quest3", "quest3"],
  },
  quest3: {
    children: null,
  },
  quest4: {
    children: null,
  },
}

const mockQuest = {
  name: "MANA-101",
  blurb: "Own a parcel of Decentraland",
  task: "Obtain at least 1 LAND parcel in your wallet.",
  description:
    "Decentraland is a virtual reality platform powered by the Ethereum blockchain that allows users to create, experience, and monetize content and applications",
  resource: "https://decentraland.org/",
  platform: "Decentraland",
  color: "#FF0055",
  imgPath: "mana.svg",
  type: "track",
  points: 200,
  progress: 0,
}

function Progress({ history }) {
  const [openQuest, setOpenQuest] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [activeSection, setActiveSection] = useState("finance")

  function triggerConfetti() {
    Confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const textColorLight = activeSection === "finance" ? "#62CF9E" : "#463512"
  const textColorDark = activeSection === "finance" ? "#275440" : "#463512"

  const Item = ({
    onClick,
    locked = false,
    complete = false,
    offset = false,
  }) => {
    return (
      <TrackCard
        onClick={onClick}
        locked={locked}
        complete={complete}
        offset={offset}
        type={activeSection}
      >
        {locked && (
          <LockedWrapper>
            <img src={Lock} alt="lock" />
          </LockedWrapper>
        )}
        <AutoColumn gap="10px">
          <RowBetween>
            <Text color={textColorLight} fontWeight={700} fontSize={"12px"}>
              COMP-101
            </Text>
            <Text color={textColorLight} fontWeight={600} fontSize={"12px"}>
              0%
            </Text>
          </RowBetween>
          <TrackCardInner type={activeSection}>
            <AutoColumn gap="10px" justify="center">
              {!locked && (
                <Text
                  fontWeight={600}
                  color={textColorDark}
                  textAlign="center"
                  fontSize={"12px"}
                >
                  Supply assets to Compound.
                </Text>
              )}
              {!locked && (
                <img
                  src={Star}
                  alt=""
                  style={{ height: "40px", width: "40px" }}
                />
              )}
            </AutoColumn>
          </TrackCardInner>
          {complete && (
            <Row style={{ justifyContent: "center" }}>
              <Text fontWeight={600} color={textColorDark} textAlign="center">
                Redeemed
              </Text>
            </Row>
          )}
          {!complete && (
            <RowBetween>
              <div></div>
              <ScoreWrapper>
                <Text color="#62CF9E" fontWeight={600} fontSize={"12px"}>
                  100 XP
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
        {mockQuests[questId].progress === 0 && !locked && (
          <ActiveWrapper type={activeSection}>
            <AutoColumn>
              <Item
                key={questId}
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
        {mockQuests[questId].progress === 100 && (
          <Item
            key={questId}
            complete={true}
            onClick={() => {
              setOpenQuest(questId)
              setShowModal(true)
              triggerConfetti()
            }}
            type={activeSection}
          />
        )}
        {locked && <Item key={questId} locked={true} type={activeSection} />}
        {mockData[questId].children && (
          <ul>
            {mockData[questId].children.map((childQuest) => {
              return renderQuest(
                childQuest,
                mockQuests[questId].progress !== 100
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
            {mockQuest.name}
          </Text>
          <AutoColumn gap="10px">
            <Text fontWeight={400} color="#CBC9BC" fontSize={16}>
              Quest Details
            </Text>
            <Text fontWeight={600} color="white" fontSize={16}>
              CryptoKitties is one of the world’s first blockchain games. Each
              kitty has a unique genome that defines its appearance and traits.
              Players can breed their kitties to create new furry friends and
              unlock rare cattributes.
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
              Reward
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
        <Selector
          onClick={() =>
            setActiveSection(activeSection === "finance" ? "gaming" : "finance")
          }
        >
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
          <Tree type={activeSection}>{renderQuest(rootId)}</Tree>
        </TrackSection>
      </AutoColumn>
    </ProgressWrapper>
  )
}

export default withRouter(Progress)
