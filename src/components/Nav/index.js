import React, { useState } from 'react'
import styled from 'styled-components'
import Web3Status from '../Web3Status'
import theme from '../../theme'

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

const NavList = styled.ul`
  display: flex;
  width: 40%;
  padding: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const NavItem = styled.li`
  list-style: none;
  font-weight: bold;
  padding: 15px 25px;
  margin-right: 5px;
  background: ${({ active }) => active ? 'linear-gradient(180deg, rgba(141, 251, 201, 0) 0%, rgba(141, 251, 201, 0.1) 100%)' : 'none'};
  border-bottom: ${({ active }) => active ? '1px solid #8DFBC9' : 'none'};
`

const NavLink = styled.a`
  font-size: 16px;
  text-decoration: none;
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
  font-weight: bold;
  width: 75px;
  height: 32px;
  color: #8DFBC9;
  border: 1px solid #8DFBC9;
  border-radius: 30px;
`

export default function Nav() {
  const [active, setActive] = useState(true)

  return (
    <NavWrapper>
      <BrandWrapper><Logo src={require('../../assets/images/drip_logo.png')} alt="drip logo" /></BrandWrapper>
      <NavList>
        <NavItem active={active}>
          <NavLink href="/" active={active}>Dashboard</NavLink>
        </NavItem>
        <NavItem active={false}>
          <NavLink href="/rewards" active={false}>Rewards</NavLink>
        </NavItem>
        <NavItem active={false}>
          <NavLink href="/activity" active={false}>Activity</NavLink>
        </NavItem>
        <NavItem active={false}>
          <NavLink href="/faq" active={false}>FAQ</NavLink>
        </NavItem>
      </NavList>
      <AccountWrapper>
        <LoginWrapper>
          <Web3Status />
        </LoginWrapper>
        <DripScore>200 D</DripScore>
      </AccountWrapper>
      
    </NavWrapper>
  );
}
