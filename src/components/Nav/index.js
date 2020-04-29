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
  max-width: 100px;
  height: 32px;
  color: #8dfbc9;
  padding: 0 10px;
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
  display: none;

  @media (max-width: 970px) {
    display: ${({ sidebarOpen }) => (sidebarOpen ? "flex" : "none")};
    width: 75%;
    height: 100%;
    background: #050b14;
    position: absolute;
    z-index: 2;
    flex-direction: column;
  }
`

const SidebarBrandWrapper = styled.div`
  margin 15px auto;
`

const SidebarList = styled.div`
  display: flex;
  margin-top: 15px;
  height: 40%;
  padding: 0;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const SidebarItem = styled.div`
  font-weight: bold;
  padding: 15px 0;
  width: 60%;
  font-size: 16px;
  text-decoration: none;
  text-align: center;
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

const SidebarScore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Inter;
  font-weight: bold;
  max-width: 100px;
  padding: 0 10px;
  height: 32px;
  color: #8dfbc9;
  border: 1px solid #8dfbc9;
  border-radius: 30px;

  @media (max-width: 580px) {
    margin: 15px auto;
  }
`

const SidebarLoginWrapper = styled.div`
  max-width: 200px;
  height: 35px;
  margin: 10px auto;
`

function Nav({ history }) {
  const [sidebarOpen, toggleSidebarOpen] = useState(false)

  const isExtraSmall = useMedia({ maxWidth: "970px" })

  const score = useScore()

  function toggleSidebar(sidebarOpen) {
    toggleSidebarOpen(sidebarOpen === true ? false : true)
  }

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
        <AccountWrapper>
          {!isExtraSmall && (
            <LoginWrapper>
              <Web3Status />
            </LoginWrapper>
          )}
          <Score onClick={() => {
            toggleSidebar(sidebarOpen)
          }}
          >
            {score} XP
          </Score>
        </AccountWrapper>
      </NavWrapper>
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        onDismiss={() => {
          toggleSidebar(true)
        }}
      >
        <SidebarBrandWrapper>
          <a href="/">
            <Logo
              src={require("../../assets/images/rabbithole.png")}
              alt="rabbithole logo"
            />
          </a>
        </SidebarBrandWrapper>
        <SidebarScore>
          {score} XP
        </SidebarScore>
        <SidebarList>
          <SidebarItem 
            onClick={() => {
              history.push("/")
              toggleSidebar(sidebarOpen)
            }} 
            active={history.location.pathname === "/"}
          >
            Dashboard
          </SidebarItem>
          <SidebarItem 
            onClick={() => {
              history.push("/activity")
              toggleSidebar(sidebarOpen)
            }} 
            active={history.location.pathname === "/activity"}
          >
            Activity
          </SidebarItem>
          <SidebarItem 
            onClick={() => {
              history.push("/progress")
              toggleSidebar(sidebarOpen)
            }} 
            active={history.location.pathname === "/progress"}
          >
            Progress
          </SidebarItem>
          <SidebarItem 
            onClick={() => {
              history.push("/faq")
              toggleSidebar(sidebarOpen)
            }}
            active={history.location.pathname === "/faq"}
          >
            FAQ
          </SidebarItem>
        </SidebarList>
        <SidebarLoginWrapper>
          <Web3Status />
        </SidebarLoginWrapper>
      </Sidebar>
    </>
  )
}

export default withRouter(Nav)
