import React, {useState} from 'react'
import {useScrollPosition} from "@n8tb1t/use-scroll-position"
import styled from "styled-components"

import ProgressBarPlayer from "../Player/progress-bar";
import {useSelector} from "react-redux";
import isEmpty from "../../helpers/isEmpty";

const TOP_VALUE_HIDDEN = -400

const ContainerFloat = styled.div`
  position: fixed;
  //height: 64px;
  width: 100%;
  background-color: #191919;
  bottom: -100px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  transition: .2s ease-out;
  padding: 15px 0;
  
 bottom: ${props => props.show && 0};
`

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  padding: 0 15px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`

const Image = styled.img`
  max-width: 64px;
  max-height: 64px;
  height: 100%;
  width: 100%;
  margin-right: 50px;
`

const MusicName = styled.div`
margin-bottom: 30px;
`

const InfoBlocks = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  
`

const PlayerFloat = () => {
  const [showOnScroll, setShowOnScroll] = useState(false)
  const music = useSelector(
    state => state.player.music
  )

  useScrollPosition(({_, currPos}) => {
    const isShow = currPos.y <= TOP_VALUE_HIDDEN
    if (!isEmpty(music) && (isShow !== showOnScroll)) setShowOnScroll(isShow)
  }, [music, showOnScroll])

  return <ContainerFloat show={showOnScroll}>
    {showOnScroll && <Container>
      <Image src={music.item.album.images[2].url} alt={music.item.name} />
      <InfoBlocks>
        <MusicName>{music.item.name} - {music.item.artists[0].name} <strong>{music.is_playing ? "Tocando agora!" : "Pausada"}</strong></MusicName>
        <ProgressBarPlayer />
      </InfoBlocks>
    </Container>}
  </ContainerFloat>

}

export default PlayerFloat