import React, { useState } from "react"
import styled from "styled-components"
import Web3Status from "../Web3Status"
import useMedia from "use-media"
import { useScore } from "../../contexts/Application"
import { withRouter } from "react-router-dom"

const NavWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 55px;
  align-items: center;

  @media (max-width: 970px) {
    justify-content: space-between;
  }
`

const BrandWrapper = styled.div`
  display: flex;
  width: 22%;
  justify-content: flex-start;
  align-items: center;
  margin-left: 35px;
  font-size: 45px;
`

const Logo = styled.img`
  width: 150px;
`

const NavList = styled.div`
  display: flex;
  width: 40%;
  padding: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const NavItem = styled.div`
  font-weight: bold;
  padding: 15px 25px;
  font-size: 16px;
  text-decoration: none;
  margin-right: 5px;
  color: ${({ active }) => (active ? "#EFEFEF" : "#A1A4B1")};
  background: ${({ active }) =>
    active
      ? "linear-gradient(180deg, rgba(141, 251, 201, 0) 0%, rgba(141, 251, 201, 0.1) 100%)"
      : "none"};

  border-bottom: ${({ active }) =>
    active ? "1px solid #8DFBC9" : "1px solid transparent"};

  :hover {
    cursor: pointer;
    border-bottom: 1px solid #8dfbc9;
  }
`

const AccountWrapper = styled.div`
  display: flex;
  margin-left: 30px;
  width: 25%;
  align-items: center;
  justify-content: space-around;
`

const LoginWrapper = styled.div`
  max-width: 200px;
  height: 35px;
`

const Score = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Inter;
  font-weight: bold;
  width: 75px;
  height: 32px;
  color: #8dfbc9;
  border: 1px solid #8dfbc9;
  border-radius: 30px;

  @media (max-width: 580px) {
    margin-right: 25px;
  }

  & > img {
    height: 20px;
    margin-left: 4px;
  }
`

const Sidebar = styled.div`
  display: ${({ sidebarOpen }) => (sidebarOpen ? "flex" : "none")};
  background: blue;
`

function Nav({ history }) {
  const [sidebarOpen, toggleSidebarOpen] = useState([])

  const isExtraSmall = useMedia({ maxWidth: "970px" })

  const score = useScore()

  return (
    <>
      <NavWrapper>
        <BrandWrapper>
          <a href="/">
            <Logo
              src={require("../../assets/images/rabbithole.png")}
              alt="rabbithole logo"
            />
          </a>
        </BrandWrapper>
        {!isExtraSmall && (
          <NavList>
            <NavItem
              onClick={() => history.push("/")}
              active={history.location.pathname === "/"}
            >
              Dashboard
            </NavItem>
            <NavItem
              onClick={() => history.push("/activity")}
              active={history.location.pathname === "/activity"}
            >
              Activity
            </NavItem>
            <NavItem
              onClick={() => history.push("/progress")}
              active={history.location.pathname === "/progress"}
            >
              Progress
            </NavItem>
            <NavItem
              onClick={() => history.push("/faq")}
              active={history.location.pathname === "/faq"}
            >
              FAQ
            </NavItem>
          </NavList>
        )}
        <AccountWrapper
          onClick={() => {
            toggleSidebarOpen(sidebarOpen)
          }}
        >
          {!isExtraSmall && (
            <LoginWrapper>
              <Web3Status />
            </LoginWrapper>
          )}
          <Score>
            {score}
            <img
              src={require("../../assets/images/drip_symbol.svg")}
              alt="score symbol"
            />
          </Score>
        </AccountWrapper>
      </NavWrapper>
      <Sidebar sidebarOpen={false}>
        <BrandWrapper>
          <a href="/">
            <Logo
              src={require("../../assets/images/rabbithole.png")}
              alt="rabbithole logo"
            />
          </a>
        </BrandWrapper>
        <Score>
          200{" "}
          <img
            src={require("../../assets/images/drip_symbol.svg")}
            alt="score symbol"
          />
        </Score>
        <NavList>
          <NavItem href="/" active={true}>
            Dashboard
          </NavItem>
          <NavItem href="/rewards" active={false}>
            Rewards
          </NavItem>
          <NavItem href="/activity" active={false}>
            Activity
          </NavItem>
          <NavItem href="/faq" active={false}>
            FAQ
          </NavItem>
        </NavList>
        <LoginWrapper>
          <Web3Status />
        </LoginWrapper>
      </Sidebar>
    </>
  )
}

export default withRouter(Nav)
