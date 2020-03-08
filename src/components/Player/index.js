import React, {useEffect} from "react"
import styled from "styled-components"
import ContentLoader from "react-content-loader"

import ProgressBarPlayer from "./progress-bar";
import Constrols from "../Controls";
import {Creators as CreatorsPlayer} from "../../store/ducks/player";
import {useDispatch, useSelector} from "react-redux";

import isEmpty from "../../helpers/isEmpty";
import {SPEED_REQUEST_MUSIC} from "../../config/spotify";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`

const Data = styled.div`
`

const MusicArtist = styled.div`
text-align: center;
    font-size: 30px;
    margin: 10px 0;
`

const Playing = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
`

const Image = styled.img`
  margin: 0 auto;
  display: block;
  max-height: 550px;
  border-radius: 50px;
`

const Player = () => {

    const dispatch = useDispatch();
    const music = useSelector(
        state => state.player.music
    )

    useEffect(() => {

        const IntervalFetch = setInterval(() => {

            dispatch(CreatorsPlayer.fetchMusicSaga())

        }, SPEED_REQUEST_MUSIC);

        return () => clearTimeout(IntervalFetch);

    }, []);

    return (
        <Container>
            {
                !isEmpty(music) && music.item
                    ? (
                        <>
                            <Image src={music.item.album.images[0].url} alt={music.item.name}/>

                            <Data>
                                <MusicArtist>
                                    {music.item.name} - {music.item.artists[0].name}
                                </MusicArtist>
                                <Playing>
                                    {music.is_playing ? "Tocando agora!" : "Pausada"}
                                </Playing>
                                <Constrols/>
                                <ProgressBarPlayer/>
                            </Data>
                        </>
                    )
                    : (
                        <ContentLoader
                            speed={2}
                            width={600}
                            height={160}
                            viewBox="0 0 600 160"
                            backgroundColor="#e8e9ff"
                            foregroundColor="#1DB954"
                        >
                            <rect x="173" y="12" rx="3" ry="3" width="410" height="6"/>
                            <rect x="177" y="33" rx="3" ry="3" width="380" height="6"/>
                            <rect x="177" y="53" rx="3" ry="3" width="178" height="6"/>
                            <rect x="2" y="1" rx="0" ry="0" width="160" height="154"/>
                        </ContentLoader>
                    )
            }
        </Container>
    )
}

export default Player
