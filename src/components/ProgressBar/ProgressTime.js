import React, {memo, useCallback} from "react"
import styled from "styled-components";
import PropType from 'prop-types'
import {mask} from "remask";


const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const ProgressTime = ({current, max}) => {
  current = Math.round(current)
  max = Math.round(max)

  const fillZeros = useCallback(value => {
    for (let count = String(value).length; count < 4; count++) {
      value = '0' + value
    }
    return value
  }, [])

  return (
    <>
      <Container>
        <span>{mask(fillZeros(current), '99:99')}</span>
        <span>{mask(fillZeros(max), '99:99')}</span>
      </Container>
    </>
  )
}

ProgressTime.defaultProps = {
  current: 0,
  max: 1,
}

ProgressTime.PropType = {
  current: PropType.number,
  max: PropType.number,
}

export default memo(ProgressTime)