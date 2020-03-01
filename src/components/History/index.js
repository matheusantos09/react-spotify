import React, {useEffect} from "react";
import styled from "styled-components";
import apiSpotify from "../../services/api";
import {useDispatch, useSelector} from "react-redux";
import {fetchHistoryError, fetchHistorySuccess} from "../../store/ducks/history";

const Container = styled.section`
  
  h1{
    text-align: center;
  }
`

const List = styled.ul`
padding: 0;
list-style: none;
`

const Item = styled.li`
  display: flex;
  border-bottom: 1px solid #252525;
  padding: 20px 0;

    img{
        max-width: 100px;
        height: auto;
        margin-right: 20px;
    }
    
    h2{
      margin-top: 0;
      margin-bottom: 10px;
    }
`

const ItemData = styled.div`
`

const ItemTime = styled.div` 
`

const History = () => {

  const history = useSelector(
    state => state.history
  )
  const dispatch = useDispatch();

  useEffect(() => {

    apiSpotify.get('/me/player/recently-played?limit=10')
      .then(response => {
        dispatch(fetchHistorySuccess(response.data.items))
      })
      .catch((err) => {
        dispatch(fetchHistoryError())
      })

  }, []);

  return (
    <Container>
      <h1>Histórico</h1>
      <List>
        {
          history.map(item => (
            <Item key={item.played_at}>
              <img
                src={item.track.album.images[0].url}
                alt="" />
              <ItemData>
                <h2>{item.track.name} - {item.track.artists[0].name}</h2>
                <ItemTime>
                  <strong>Tocada em: </strong>
                  {item.played_at}
                </ItemTime>
              </ItemData>
            </Item>
          ))
        }
      </List>
    </Container>
  )
}

export default History