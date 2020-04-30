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
  display: flex;
  justify-content: space-around;
  align-items: center;

  & > h2 {
    width: 40%
    font-size: 40px;
    margin: 100px;
  }
`
const Input = styled.input`
  padding: 0.5em;
  font-size: 18px;
  margin: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 10px;
  height: 3em;
  width: 20%;
`

const Section = styled.div`
  background-color: ${({bgColor}) => bgColor};
  color: ${({color}) => color};
  width: 100%;
  height: ${({height}) => height ? height : '550px'};
`
const SecondSection = styled.div`
  background-color: #E0FEF4;
  color: #111111;
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`
const ThirdSection = styled.div`
  background-color: #1F1F1F;
  color: #F5F5FD;
  width: 100%;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const FourthSection = styled.div`
  background-color: #CBC4FC;
  color: #111111;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: space-around;
  align-items: center;

`
const Square = styled.div`
  width: 40%;
  background-color: #1F1F1F;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;

  & > h3 {
    color: #F5F5FD;
    font-size: 36px;
  }

  & > h4 {
    color: #A1A4B1;
    font-size: 24px;
  }
`


const CTAButton = styled.button`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #F5F5FD;
  border:none
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
`

const ImageDiv = styled.img`
 max-width: 100%;
 margin: 10px 0px 10px 0px;
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
            <Input type="text" />
            <CTAButton
               style={{backgroundColor: '#04BC86'}}
            >Submit</CTAButton>
            
          </Hero>
          <SecondSection>
            <h2>Rabbit Hole is an on-chain achievement system to get users using crypto while earning.</h2>
            <ImageDiv 
               src={require("../../assets/images/aragonQuest.png")}
               alt="">
            </ImageDiv>
            <ImageDiv 
               src={require("../../assets/images/0xQuest.png")}
               alt="">
            </ImageDiv>
            <ImageDiv 
               src={require("../../assets/images/setQuest.png")}
               alt="">
            </ImageDiv>
          </SecondSection>
          <ThirdSection>
            <h2>We curate the safest and most important decentralized aplications so you don't have to</h2>
            <ImageDiv 
               src={require("../../assets/images/dapps.png")}
               alt="">
            </ImageDiv>
          </ThirdSection>
          <FourthSection>
            <Square>
              <h3>Dapp Developers</h3>
              <h4>Want to get listed on Rabbit Hole?</h4>
              <CTAButton
                  style={{backgroundColor: '#5747C8'}}
              >Fill out this form</CTAButton>
            </Square>
            <Square>
              <h3>Users</h3>
              <h4>Want to start exploring the Rabbit Hole?</h4>
             <CTAButton
              style={{backgroundColor: '#04BC86'}}
             >Get Started</CTAButton>
             </Square>
          </FourthSection>
          <Section height={'300px'}>
          </Section>
        </>
      }
    </Wrapper>
  )
}
