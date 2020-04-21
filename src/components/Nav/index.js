import React, { useState } from 'react'
import styled from 'styled-components'
import Web3Status from '../Web3Status'

const NavWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
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
  width: 75px;
  height: 29px;
`

const NavList = styled.div`
  display: flex;
  width: 40%;
  padding: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const NavItem = styled.a`
  font-weight: bold;
  padding: 15px 25px;
  font-size: 16px;
  text-decoration: none;
  margin-right: 5px;
  color: ${({ active }) => active ? '#EFEFEF' : '#A1A4B1'};
  background: ${({ active }) => active ? 'linear-gradient(180deg, rgba(141, 251, 201, 0) 0%, rgba(141, 251, 201, 0.1) 100%)' : 'none'};
  border-bottom: ${({ active }) => active ? '1px solid #8DFBC9' : 'none'};
`

const NavLink = styled.a`
  font-size: 16px;
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
  color: ${({ active }) => active ? '#EFEFEF' : '#A1A4B1'};
`

const AccountWrapper = styled.div`
  display: flex;
  margin-left: 30px;
  width: 25%;
  align-items: center;
  justify-content: space-around;
`

const LoginWrapper = styled.div`
  width: 150px;
  height: 35px;
`

const DripScore = styled.div`
  display: flex; 
  justify-content: center;
  align-items: center; 
  font-family: Inter;
  font-weight: bold;
  width: 75px;
  height: 32px;
  color: #8DFBC9;
  border: 1px solid #8DFBC9;
  border-radius: 30px;

  & > img {
    height: 20px;
    margin-left: 4px;
  }
`

export default function Nav() {
  const [active, setActive] = useState(true)

  return (
    <NavWrapper>
      <BrandWrapper><Logo src={require('../../assets/images/drip_logo.png')} alt="drip logo" /></BrandWrapper>
      <NavList>
        <NavItem href="/" active={active}>Dashboard</NavItem>
        <NavItem href="/rewards" active={false}>Rewards</NavItem>
        <NavItem href="/activity" active={false}>Activity</NavItem>
        <NavItem href="/faq" active={false}>FAQ</NavItem>
      </NavList>
      <AccountWrapper>
        <LoginWrapper>
          <Web3Status />
        </LoginWrapper>
        <DripScore>200 <img src={require('../../assets/images/drip_symbol.svg')} alt="drip symbol" /></DripScore>
      </AccountWrapper>
      
    </NavWrapper>
  );
}
