import React, {memo, useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Creators as CreatorsHistory} from "../../pages/Dashboard/ducks/history";
import ItemList from './item'
import {toast} from "react-toastify";

const Container = styled.section`
  
  h1{
    text-align: center;
  }
`

const List = styled.ul`
padding: 0;
list-style: none;
`

const InputSearch = styled.input`
  padding: 5px 20px;
  border: 0;
  outline: 0;
  display: block;
  height: 100%;
  flex-grow: 1;
  background-color: rgba(255,255,255,0.9);
  width: 100%;
  border-radius: 50px;
  margin-bottom: 30px;
`

const History = () => {

  const historyFiltered = useSelector(state => state.history.historyFiltered)
  const dispatch = useDispatch();
  const [search, setSearch] = useState('')

  useEffect(() => {

    dispatch(CreatorsHistory.fetchHistorySaga())

  // eslint-disable-next-line
  }, []);

  const handleSearch = useCallback((e) => {

    console.log('useCallback');

    const value = e.target.value;
    setSearch(value)

    if (!search.trim().length) {
      toast.error('Digite algo para a busca')
    }

    dispatch(CreatorsHistory.historySearchSaga(value))

    // eslint-disable-next-line
  }, [search])

  return (
    <Container>
      <h1 style={{marginTop: 30, display: 'block'}}>Histórico</h1>
      <InputSearch type="search" value={search} onChange={handleSearch} />
      <List>
        {
          historyFiltered.map(item => (
            <ItemList key={item.played_at} item={item} />
          ))
        }
      </List>
    </Container>
  )
}

export default memo(History)