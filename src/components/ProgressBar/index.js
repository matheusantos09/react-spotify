import React from "react"
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux'

import PropType from 'prop-types'
import {Creators as CreatorsHistory} from "../../pages/Dashboard/ducks/history";

const ProgressBarWrapper = styled.div`
  border: 1px solid #252525;
  height: 10px;
  width: 100%;
  border-radius: 60px;
    overflow: hidden;
`

const ProgressBar = styled.div`
  transition: .2s ease-out;
  background: #1DB954;
  height: 100%;
  width: ${props => `${props.width}%`};
      border-radius: 40px;
`

const ProgressBarPlayer = () => {

  const dispatch = useDispatch();

  const music = useSelector(
    state => state.player.music
  )

  const progressValue = Math.round((music.progress_ms * 100 / (music.item.duration_ms || 1)));

  if (progressValue === 2) {
    dispatch(CreatorsHistory.fetchHistorySaga())
  }

  return (
    <ProgressBarWrapper>
      <ProgressBar width={progressValue} />
    </ProgressBarWrapper>
  )
}

ProgressBarPlayer.defaultProps = {
  value: 0
}

ProgressBar.PropType = {
  value: PropType.number
}

export default ProgressBarPlayer