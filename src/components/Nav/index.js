import React from 'react'
import styled from 'styled-components'
import Web3Status from '../Web3Status'
import { withRouter } from 'react-router-dom'

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
  max-width: 200px;
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


class Nav extends React.Component {
  render() {
    const { location } = this.props

    return (
      <NavWrapper>
        <BrandWrapper><Logo src={require('../../assets/images/rabbithole.png')} alt="rabbithole logo" /></BrandWrapper>
        <NavList>
          <NavItem href="/" active={location.pathname === '/'}>Dashboard</NavItem>
          <NavItem href="/rewards" active={location.pathname === '/rewards'}>Rewards</NavItem>
          <NavItem href="/activity" active={location.pathname === '/activity'}>Activity</NavItem>
          <NavItem href="/faq" active={location.pathname === '/faq'}>FAQ</NavItem>
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
}

export default withRouter(Nav)
