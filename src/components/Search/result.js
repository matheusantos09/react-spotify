import React from "react"
import styled from "styled-components"

import ListLoader from './list-loader'
import {useDispatch, useSelector} from "react-redux";
import {Creators as CreatorsSearch} from "../../pages/Dashboard/ducks/search";

const Container = styled.div`
    background-color: white;
    color: #000;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    right: 0;
    top: 0;
    bottom: 0;
    max-width: 400px;
    left: auto;
    width: 100%;
    position: fixed;
    z-index: 1;
    transition: .3s ease-out;
    transform: ${props => props.show ? 'translateX(0)' : 'translateX(100%)'};
    padding: 20px;
    overflow-x: unset;
    overflow-y: auto;
    
    ul{
      list-style: none;
      padding: 0;
      margin-top: 0;
      
      li{
        display: flex;
        align-items: center;
        position: relative;
        
        &:not(:last-child){
          margin-bottom: 10px;
        }
        
        &:hover{
          div{
            opacity: 1;
            visibility: visible;
          }
        }
        
        img{
        max-width: 100px;
        border-radius: 8px;
        margin-right: 10px;
        }
       
       div{
          opacity: 0;
          visibility: hidden; 
       }       
      }
    }
`

const BoxActions = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 10px 20px;
  background-color: white;
  transition: .2s ease-out;
  align-items: center;
`

const ButtonQueue = styled.div`
 padding: 8px 10px;
 border-radius: 2px;
 background-color: #1DB954; 
 color: #FFF;
 transition: .2s ease-out;
 cursor: pointer;
 
 &:hover{
  opacity: .8;
 }
`

const ButtonPlay = styled(ButtonQueue)`
 margin-right: 10px;
`

const BackgroundList = styled.div`
    position: fixed;
    z-index: 1;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: ${props => props.show ? 'unset' : 'none'};
`

const Result = () => {

  const show = useSelector(state => state.search.showResult)
  const list = useSelector(state => state.search.searchResult)
  const loading = useSelector(state => state.search.loading)
  const dispatch = useDispatch()

  if (!list.length) {
    return <></>
  }

  const handlePlayMusic = (uri, trackNumber) => {
    dispatch(CreatorsSearch.playMusic(uri, trackNumber))
  }

  const handleQueueMusic = (uri) => {
    dispatch(CreatorsSearch.addMusicQueue(uri))
  }

  const handleCloseList = () => {
    dispatch(CreatorsSearch.showResult(false))
  }

  return (
    <>
      <BackgroundList show={show} onClick={() => handleCloseList()} />
      <Container show={show}>
        {
          loading
            ? (
              <ListLoader />
            )
            : (
              <ul>
                {
                  list.map(item => (
                    <li key={item.id}>
                      <img
                        src={item.album.images[0].url}
                        alt="" />
                      <span>{item.name} - {item.artists[0].name}</span>

                      <div>
                        <BoxActions>
                          <ButtonPlay
                            onClick={() => handlePlayMusic(item.album.uri, item.track_number)}
                          >
                            Tocar
                          </ButtonPlay>
                          <ButtonQueue onClick={() => handleQueueMusic(item.uri)}>Adcionar na fila</ButtonQueue>
                        </BoxActions>
                      </div>
                    </li>
                  ))
                }
              </ul>
            )
        }
      </Container>
    </>
  )
}

export default Result