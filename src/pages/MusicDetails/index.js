import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import styled from "styled-components";
import {Link} from 'react-router-dom'

import AudioPlayer from "../../components/AudioPlayer";

import {Creators as CreatorsMusic} from "./ducks/music";

const Line = styled.div`
  display:flex;
  justify-content: space-between;
  margin-bottom: 30px;
  padding-top: 30px;
  
  h1{
    text-align: center;
    display: block;
    width: 100%;
  }
`

const BoxImage = styled.div`
  width: 500px;
  max-height: 300px;
  
  img{
    height: 100%;
    margin-right: 50px;
  }
`

const Table = styled.table`
width: 100%;

  thead{
    margin-bottom: 20px;
    text-align: center;
    font-size: 24px;
    
    td {
      padding-bottom: 20px
    }
  }
  
  tbody{
    td{
      padding: 10px 5px;
    }
    tr:nth-of-type(odd){
     background-color: rgba(255,255,255,.05);
    }
  }
`
const LinkHome = styled.div`
  a{
    color: #FFF;
    text-align: center;
    display: block;
    width: 100%;
    margin: 20px 0;
    cursor: pointer;
  }
`

const MusicDetails = () => {

  const {spotifyId} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CreatorsMusic.fetchMusicByIdSaga(spotifyId))
  }, [spotifyId, dispatch])

  const music = useSelector(state => state.musicDetails)

  const msToTime = (duration) => {
    let milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

  return music.loading
    ? (
      <>
        LOADING!!!!!!!!!!!!!!!!!
      </>
    ) : (
      typeof music.item.album === 'undefined' ? (
        <span>-</span>
      ) : (
        <>
          <Line>
            <h1>{music.item.name}</h1>
          </Line>
          <Line>
            <BoxImage>
              <img src={music.item.album.images[0].url} alt="" />
            </BoxImage>

            <div style={{width: "100%"}}>
              <AudioPlayer
                url={music.item.preview_url}
              />
            </div>
          </Line>

          <Table>
            <thead>
            <tr>
              <td colSpan={2}>Albúm</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                Duração
              </td>
              <td>
                {msToTime(music.item.duration_ms)}
              </td>
            </tr>
            <tr>
              <td> Artistas</td>
              <td>
                {
                  music.item.album.artists.map(artist => artist.name + ' / ')
                }
              </td>
            </tr>
            <tr>
              <td>Nome</td>
              <td>{music.item.album.name}</td>
            </tr>
            <tr>
              <td>Data de lançamento</td>
              <td>{music.item.album.release_date}</td>
            </tr>
            </tbody>
          </Table>

          <LinkHome>
            <Link to="/painel">
              Voltar a página principal
            </Link>
          </LinkHome>
        </>
      )
    )
}

export default MusicDetails