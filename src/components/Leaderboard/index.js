import React from 'react'
import styled from 'styled-components'

const Leaderboard = styled.div`
  grid-area: leaderboard;
  width: 80%;
  margin: auto;
  margin-top: 25px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;

  & > img {
    width: 45px;
    height: 58px;
  }

  & > div {
    display: inline-block;
    margin-left: 15px;
  }
`

const Leader = styled.div`
  display: grid;
  grid-template-columns: 30px 55px auto 65px;
  grid-template-areas: "num moji name drip";
  padding: 5px;
  line-height: 25px;
  vertical-align: middle;
  color: ${({ isUser }) => isUser ? 'yellow' : 'inherit'};

  & > img {
    width: 25px;
    height: 25px;
    margin: auto;
  }
`

const SubHeading = styled.span`
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #A1A4B1;
`

const Board = styled.div`
  width: 90%;
  border: 1px solid ${({ theme }) => theme.outlinePurple};
  border-radius: 10px;
  background: #1F1F1F;
  font-size: 14px;
  padding: 10px;
  margin-top: 50px;
`

const DripScore = styled.span`
  grid-area: drip;
  color: #8DFBC9;
  font-family: Inter;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    height: 15px;
    margin-left: 3px;
  }
`

const Separator = styled.hr`
  margin: 30px auto;
  width: 60%
  border: 1px solid rgba(255, 255, 255, 0.1)
`

const leaderboardWithUser = {
  user: {
    position: 135,
    name: "scottoshi.eth",
    imageUrl: "ethmoji_sample.png",
    points: 200,
    onLeaderboard: false
  },
  leaders: [
    {
      name: "scottrepreneur.eth",
      imageUrl: "ethmoji_sample.png",
      points: 1000,
    },
    {
      name: "vitalik.eth",
      imageUrl: "ethmoji_sample.png",
      points: 999
    },
    {
      name: "flynn.eth",
      imageUrl: "ethmoji_sample.png",
      points: 988
    },
    {
      name: "eric.eth",
      imageUrl: "ethmoji_sample.png",
      points: 900
    },
    {
      name: "ismoney.eth",
      imageUrl: "ethmoji_sample.png",
      points: 850
    },
    {
      name: "rainbow.eth",
      imageUrl: "ethmoji_sample.png",
      points: 800
    },
    {
      name: "stan36.eth",
      imageUrl: "ethmoji_sample.png",
      points: 700
    },
    {
      name: "matthew.cent.eth",
      imageUrl: "ethmoji_sample.png",
      points: 600
    },
    {
      name: "toast.eth",
      imageUrl: "ethmoji_sample.png",
      points: 500
    },
    {
      name: "defidude.eth",
      imageUrl: "ethmoji_sample.png",
      points: 400
    }
  ]
}


export default function Leaderboard() {

  return (
    <Leaderboard>
      <img src={require('../../assets/images/drip_symbol.svg')} alt="Drip" />
      <div>
        Leaderboard
        <SubHeading>Who's got more drip?</SubHeading>
      </div>
      <Board>
        {leaderboardWithUser.leaders.map((leader, i) => {
          return (
            <Leader key={i} isUser={leaderboardWithUser.user.onLeaderboard}>
              <span style={{ gridArea: 'num' }}>{i+1}.</span>
              <img src={require('../../assets/images/' + leader.imageUrl)} alt={leader.name} style={{ gridArea: 'moji' }}/>
              <span style={{ gridArea: 'name' }}>{leader.name}</span>
              <DripScore>{leader.points} <img src={require('../../assets/images/drip_symbol.svg')} alt="Drip" /></DripScore>
            </Leader>
          );
        })}
        {!leaderboardWithUser.user.onLeaderboard ? (
          <>
            <Separator />
            <Leader isUser={leaderboardWithUser.user.onLeaderboard}>
              <span style={{ gridArea: 'num' }}>{leaderboardWithUser.user.position}.</span>
              <img src={require('../../assets/images/' + leaderboardWithUser.user.imageUrl)} alt={leaderboardWithUser.user.name} style={{ gridArea: 'moji' }}/>
              <span style={{ gridArea: 'name' }}>{leaderboardWithUser.user.name}</span>
              <DripScore>{leaderboardWithUser.user.points} <img src={require('../../assets/images/drip_symbol.svg')} alt="Drip" /></DripScore>
            </Leader>
          </>
        ): null }
      </Board>
    </Leaderboard>
  )
}
