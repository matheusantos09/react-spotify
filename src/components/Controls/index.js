import React, {memo, useCallback} from "react"
import {FaPause, FaPlay, FaStepBackward, FaStepForward} from "react-icons/fa";

import styled from "styled-components"
import {useDispatch, useSelector} from "react-redux";
import {Creators as CreatorsPlayer} from "../../pages/Dashboard/ducks/player";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  
  svg{
    cursor: pointer;
    padding: 5px;
  }
`

const ContainerButton = styled.div`
  border-radius: 50%;
  box-shadow: 0 0 0 2px #FFF inset;
  padding: 5px 5px 5px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Constrols = () => {

  const dispatch = useDispatch()
  const player = useSelector(
    state => state.player
  )

  const music = player.music
  const play = player.controls.isPlaying

  let ButtonIconPlay = FaPlay

  if (play) {
    ButtonIconPlay = FaPause
  }

  const handlePlay = useCallback(() => {
    dispatch(CreatorsPlayer.fetchPlayPauseMusicSaga(play, music))
  }, [play, music, dispatch])

  const handleStepBackward = useCallback(() => {
    dispatch(CreatorsPlayer.fetchStepBackwardSaga())
  }, [dispatch])

  const handleStepForward = useCallback(() => {
    dispatch(CreatorsPlayer.fetchStepForwardSaga())
  }, [dispatch])

  return <Container>
    <FaStepBackward onClick={handleStepBackward} />

    <ContainerButton>
      <ButtonIconPlay size={20} onClick={handlePlay} />
    </ContainerButton>

    <FaStepForward onClick={handleStepForward} />
  </Container>
}

export default memo(Constrols)