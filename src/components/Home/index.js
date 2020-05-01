import React from 'react'
import styled from 'styled-components'
import QuestSection from '../QuestSection'
import { useWeb3React } from '@web3-react/core'
import useMedia from 'use-media'

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

    @media (max-width: 550px) {
      font-size: 24px;
      text-align: center;
      width: 80%;
      margin: auto;
    }
  }

  @media (max-width: 550px) {
    flex-direction: column;
  }
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

  @media (max-width: 550px) {
    & > h2 {
      font-size: 18px;
      width: 80%;
      margin: 20px auto;
      text-align: center;
    }
  }
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

  @media (max-width: 550px) {

    & > h2 {
      font-size: 18px;
      width: 80%;
      margin: 25px auto;
      text-align: center;
    }
  }
`
const FourthSection = styled.div`
  background-color: #CBC4FC;
  color: #111111;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 550px) {
    flex-direction: column;
    height: 800px;
  }
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
  
  @media (max-width: 550px) {
    width: 80%;   
    text-align: center;

    & > h4 {
      width: 80%;
      margin: 20px auto;
    }
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
  margin: 20px 0;
  border-radius: 10px;
`

const ImageDiv = styled.img`
 max-width: 100%;
 margin: 10px 0px;

 @media (max-width: 550px) {
   max-width: 80%;
 }
`


export default function Home() {
  const { account } = useWeb3React()
  
  const isXXXSmall = useMedia({ maxWidth: '550px' })
  
  return (
    <Wrapper>
      {account ? 
        <QuestSection /> : 
        <>
          <Hero>
            <h2>Adventure into the world of crypto and earn rewards by using crypto</h2>
            <div 
              id="mc_embed_signup"
            >
              <form 
                action="https://rabbithole.us8.list-manage.com/subscribe/post?u=aed6a168d98a5e08ef7e1ddd7&id=8840bb2ffc" 
                method="post" 
                id="mc-embedded-subscribe-form" 
                name="mc-embedded-subscribe-form" 
                className="validate" 
                target="_blank" 
                noValidate
              >
                <div id="mc_embed_signup_scroll">
                  <input 
                    type="email" 
                    name="EMAIL" 
                    className="email" 
                    id="mce-EMAIL" 
                    placeholder="email address" 
                    required
                  />
                  <div 
                    style={{ position: 'absolute', left: '-5000px' }} 
                    aria-hidden="true"
                  >
                    <input 
                      type="text" 
                      name="b_aed6a168d98a5e08ef7e1ddd7_8840bb2ffc" 
                      tabIndex="-1" 
                    />
                  </div>
                  <div className="clear">
                    <input 
                      type="submit" 
                      value="Subscribe" 
                      name="subscribe" 
                      id="mc-embedded-subscribe" 
                      className="button"
                      />
                  </div>
                </div>
              </form>
            </div>  
          </Hero>
          <SecondSection>
            <h2>Rabbit Hole is an on-chain achievement system to get users using crypto while earning.</h2>
            {!isXXXSmall ? (
              <>
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
              </>
            ) : (
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <ImageDiv 
                    src={require("../../assets/images/compound-quest-landing.svg")}
                    alt=""
                    style={{ display: 'inline-block', margin: '0 10px' }}>
                </ImageDiv>
                <ImageDiv 
                    src={require("../../assets/images/dcl-quest-landing.svg")}
                    alt=""
                    style={{ display: 'inline-block', margin: '0 10px' }}>
                </ImageDiv>
              </div>
            )}
            
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
              >
                Fill out this form
              </CTAButton>
            </Square>
            <Square>
              <h3>Users</h3>
              <h4>Want to start exploring the Rabbit Hole?</h4>
              <CTAButton
                style={{backgroundColor: '#04BC86'}}
              > 
                Get Started
              </CTAButton>
             </Square>
          </FourthSection>
          <Section height={'300px'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <a href="https://discord.gg/V7WMqbs">
              <img src={require("../../assets/images/discord_logo.png")} alt="Join the RabbitHole Discord" style={{ width: '50px' }} />
            </a>
          </Section>
        </>
      }
    </Wrapper>
  )
}
