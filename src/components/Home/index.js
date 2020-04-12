import React from 'react'
import styled from 'styled-components'
import QuestSection from '../QuestSection'
// import useMedia from 'use-media'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export default function Home() {
  // const isSmall = useMedia({ maxWidth: '940px' })
  return (
    <Wrapper>
      <QuestSection />
    </Wrapper>
  )
}
