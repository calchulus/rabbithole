import React from 'react'
import styled from "styled-components"

const Wrapper = styled.div`
  text-align: center;
`

const Header = styled.h2`
  text-align: center;
  margin: 40px 0;
`

const Faqs = styled.div`
  width: 70%;
  margin: auto;

  @media (max-width: 550px) {
    width: 90%;
  }
`

const Faq = styled.div`
  background-color: #1f1f1f;
  border: 1px solid ${({ theme }) => theme.outlinePurple};
  border-radius: 10px;
  height: 125px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding 15px 75px;

  @media (max-width: 550px) {
    padding 15px;
    height: auto;
  }
`

const Question = styled.div`
  font-size: 20px;
  font-weight: bold;

  @media (max-width: 550px) {
    font-size: 18px;
    padding-bottom: 15px;
  }
`

const Footer = styled.div`
  height: 100px;
  
  @media (max-width: 550px) {
    height: 50px;
  }
`

const faqs = [
  {
    question: "What is Rabbit Hole?",
    answer: "Rabbit Hole is an on-chain achievement system to get users learning how to use crypto."
  },
  {
    question: "What can I do with my XP?",
    answer: "For now, XP is a reputation score that can be accessed by other dApps. In the future, who knows what it will be used for ;) "
  },
  {
    question: "How do you decide which dApps will get on Rabbit Hole?",
    answer: "We’re a team of crypto enthusiasts who use these platforms every day. We only list dApps that are fully audited, have little risk, and create a better ecosystem for Etheruem."
  },
  {
    question: "Why can’t I unlock challenges that I’ve completed?",
    answer: "If you’ve completed a quest but haven’t completed the pre-requisites, you won’t be able to receive the XP from the quest. Complete the prerequisites in order to complete the quest."
  },
  {
    question: "How can I get in contact with the team?",
    answer: "You can join <a href=\"https://discordapp.com\"> our discord here</a> and message the moderators."
  },
]

export default function FAQ() {
  return (
    <Wrapper>
      <Header>Frequently Asked Questions</Header>
      <Faqs>
        {faqs.map((faq, i) => {
          return (
            <Faq key={i}>
              <Question>{faq.question}</Question>
              <div>{faq.answer}</div>
            </Faq>
          )
        })}
      </Faqs>
      <Footer />
    </Wrapper>
  );
}
