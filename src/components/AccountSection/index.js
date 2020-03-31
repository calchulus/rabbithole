import React from 'react'
import styled from 'styled-components'
import Web3Status from '../Web3Status'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  align-items: center;
  padding-top: ${({ theme }) => theme.bigPadding};
`

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`

const Blurb = styled.div`
  font-size: 1rem;
  margin-top: ${({ theme }) => theme.bigPadding};
  text-align: left;
`

const LoginWrapper = styled.div`
  margin-top: 32px;
  width: 100%;
`

export default function AccountSection() {
  return (
    <Wrapper>
      <Title>
        {/* <span role="img" aria-label="trophy" style={{ marginRight: '8px' }}>
          👾
        </span> */}
        Janus{' '}
      </Title>
      <Blurb>Explore the world of Ethereum. Complete quests, earn points.</Blurb>
      <LoginWrapper>
        <Web3Status />
      </LoginWrapper>
    </Wrapper>
  )
}
