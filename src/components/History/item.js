import React, {memo} from "react"
import styled from "styled-components";
import {format, utcToZonedTime} from 'date-fns-tz'
import {Link} from 'react-router-dom'

const Item = styled.li`
  display: flex;
  border-bottom: 1px solid #252525;
  padding: 20px 0;

  h2{
    margin-top: 0;
    margin-bottom: 10px;
  }
    
  a{
   color: #FFF;
   text-decoration: unset;
  }
`

const BoxImage = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border-radius: 8px;
  overflow: hidden;
  
  img{
    width: 100%;
  }
`

const ItemData = styled.div`
`

const ItemTime = styled.div` 
`

const ItemList = ({item}) => {

  const handleDate = (date) => {

    date = new Date(date)
    const timeZone = 'America/Sao_Paulo'
    const dateZoned = utcToZonedTime(date, timeZone)

    return format(dateZoned, 'dd/MM/yyyy HH:mm', {timeZone: timeZone})
  }

  return (
    <Item>
      <Link to={'/music/' + item.track.uri}>
        <BoxImage>
          <img
            src={item.track.album.images[0].url}
            alt=""
          />
        </BoxImage>
      </Link>
      <ItemData>
        <Link to={'/music/' + item.track.uri}>
          <h2>{item.track.name} - {item.track.artists[0].name}</h2>
        </Link>
        <ItemTime>
          <strong>Tocada em: </strong>
          {handleDate(item.played_at)}
        </ItemTime>
      </ItemData>
    </Item>
  )
}

export default memo(ItemList)