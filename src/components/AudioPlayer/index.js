import React, {memo} from "react"
import AudioSpectrum from 'react-audio-spectrum'
import styled from "styled-components";
import {useAudio, useMeasure} from "react-use";
import {FaBackward, FaForward, FaPause, FaPlay, FaVolumeDown, FaVolumeMute, FaVolumeUp} from "react-icons/all";

import ProgressBarPlayer from "../ProgressBar";

const Container = styled.div`
  width: 100%;
  
  button {
    display: inline-flex;
    align-items: center;
    color: #FFF;
    background-color: transparent;
    border: 1px solid #FFF;
    padding: 5px;
    margin-right: 10px;
    margin-bottom: 5px;
    border-radius: 8px;
    
    span {
      margin-left: 5px;
    }
  }
`

const Line = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`

const AudioPlayer = (
  {
    url,
    height,
    width,
    capColor,
    capHeight,
    meterWidth,
    meterCount,
    meterColor,
    gap,
    play
  }
) => {

  const [ref, {width: widthContainer}] = useMeasure();

  if (!width) {
    width = widthContainer
  }

  const [audio, state, controls] = useAudio({
    src: url,
    autoPlay: play,
    id: 'audio-element',
    crossOrigin: "anonymous"
  });

  return <Container ref={ref}>
    {url ? (
      <>
        <AudioSpectrum
          id="audio-canvas"
          audioId={'audio-element'}
          height={height}
          width={width}
          capColor={capColor}
          capHeight={capHeight}
          meterWidth={meterWidth}
          meterCount={meterCount}
          meterColor={meterColor}
          gap={gap}
        />

        <ProgressBarPlayer
          showTime={true}
          value={state.time}
          duration={state.duration}
        />

        <div>
          {audio}

          <Line>
            <div>
              <button onClick={controls.mute}><FaVolumeMute /></button>
              <button onClick={controls.unmute}><FaVolumeDown /></button>
            </div>

            <div>
              <button onClick={() => controls.seek(state.time - 5)}><FaBackward /> <span>-5 sec</span></button>

              {state.paused ? (
                <button onClick={controls.play}><FaPlay /></button>
              ) : (
                <button onClick={controls.pause}><FaPause /></button>
              )}

              <button onClick={() => controls.seek(state.time + 5)}><FaForward /> <span>+5 sec</span></button>
            </div>

            <div>
              <button onClick={() => controls.volume(.1)}><FaVolumeUp /> <span>10%</span></button>
              <button onClick={() => controls.volume(.5)}><FaVolumeUp /> <span>50%</span></button>
              <button onClick={() => controls.volume(1)}><FaVolumeUp /> <span>100%</span></button>
            </div>
          </Line>

        </div>
      </>
    ) : (
      <p>Não foi posível reproduzir sua musica</p>
    )}
  </Container>

}

AudioPlayer.defaultProps = {
  url: '',
  height: 300,
  width: 0,
  capColor: '#00d4ff',
  capHeight: 2,
  meterWidth: 4,
  meterCount: 240,
  meterColor: [
    {stop: 0, color: '#00d4ff'},
    {stop: 0.5, color: '#1db954'},
    {stop: 1, color: '#149841'}
  ],
  gap: 6,
  play: false
}

export default memo(AudioPlayer)