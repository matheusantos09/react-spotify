import React from "react"
import styled from "styled-components"
import {FaSearch} from "react-icons/fa"
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

import Result from './result'
import {useDispatch} from "react-redux";
import apiSpotify from "../../services/api";
import {fetchSearchError, fetchSearchSuccess, showResult} from "../../store/ducks/search";

const Container = styled.div`
  margin-bottom: 30px;
`

const BlockSearchResult = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 500px;
  overflow: hidden;
`

const Input = styled.input`
  padding: 0 20px;
  border: 0;
  outline: 0;
  display: block;
  height: 100%;
  flex-grow: 1;
  background-color: rgba(255,255,255,0.9);
`

const Button = styled.button`
  color: #FFF;
  border: 0;
  display: block;
  height: 100%;
  cursor: pointer;
  font-size: 18px;
  background-color: #1DB954;
  padding: 0 20px;
  -webkit-appearance: button;
   font-family: inherit;
  line-height: 1;
  margin: 0;
`

const Search = () => {

  const dispatch = useDispatch();
  let searchWord = ''

  const handleSubmit = e => {
    e.preventDefault();

    searchWord = e.target.search.value

    if (!searchWord.trim().length) {
      toast.error('Por favor escreva algo para ser buscado', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }

    apiSpotify.get(`search?q=${searchWord}&type=track`)
      .then(response => {
        dispatch(showResult(true))
        dispatch(fetchSearchSuccess(response.data.tracks.items))
      })
      .catch((err) => {
        dispatch(fetchSearchError())
      })
  }

  return (
    <Container>
      <BlockSearchResult>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Input type="search" name="search" required />
          <Button><FaSearch /></Button>
        </Form>

        <Result />
      </BlockSearchResult>
    </Container>
  )
}

export default Search