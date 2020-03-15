import React from "react"
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux'

import PropType from 'prop-types'
import {Creators as CreatorsHistory} from "../../pages/Dashboard/ducks/history";

import ProgressTime from "./ProgressTime";

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

const ProgressBarPlayer = (
  {
    value,
    duration,
    showTime
  }
) => {

  const dispatch = useDispatch();

  let music = useSelector(
    state => state.player.music
  )

  if (typeof value !== 'undefined' && typeof duration !== 'undefined') {
    music = {
      progress_ms: value,
      item: {
        duration_ms: duration
      }
    }
  }

  const progressValue = Math.round((music.progress_ms * 100 / (music.item.duration_ms || 1)));

  if (progressValue === 2) {
    dispatch(CreatorsHistory.fetchHistorySaga())
  }

  return (
    <>
      <ProgressBarWrapper>
        <ProgressBar width={progressValue} />
      </ProgressBarWrapper>

      {showTime && <ProgressTime current={music.progress_ms} max={music.item.duration_ms} />}
    </>
  )
}

ProgressBarPlayer.defaultProps = {
  // value: 0,
  // duration: 0,
  showTime: false
}

ProgressBarPlayer.PropType = {
  // value: PropType.number,
  // duration: PropType.number,
  showTime: PropType.bool
}

export default ProgressBarPlayer