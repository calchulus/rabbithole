import React from 'react'
import styled from 'styled-components'
import QuestSection from '../QuestSection'
import { useWeb3React } from '@web3-react/core'
// import useMedia from 'use-media'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Hero = styled.div`
  width: 100%;
  height 500px;

  & > h2 {
    width: 450px;
  }
`

const Section = styled.div`
  background-color: ${({bgColor}) => bgColor};
  color: ${({color}) => color};
  width: 100%;
  height: ${({height}) => height ? height : '550px'};
`

export default function Home() {
  const { account } = useWeb3React()
  // const isSmall = useMedia({ maxWidth: '940px' })
  return (
    <Wrapper>
      {account ? 
        <QuestSection /> : 
        <>
          <Hero>
            <h2>Adventure into the world of crypto and earn rewards by using crypto</h2>
          </Hero>
          <Section bgColor={'#E0FEF4'} color={'#111111'}>
            Hello
          </Section>
          <Section>
            We curate the most important decentralized applications so you don’t have to.
          </Section>
          <Section bgColor={'#CBC4FC'} color={'#111111'}>
            Get Involved
          </Section>
          <Section height={'300px'}>
            Footer
          </Section>
        </>
      }
    </Wrapper>
  )
}
