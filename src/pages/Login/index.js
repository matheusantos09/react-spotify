import React from "react";
import {authEndPoint, clientId, redirectUri, scopesParametersUri} from "../../config/spotify";
import styled from "styled-components";

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100vh;
`

const Link = styled.a`
 text-align: center;
 display: inline-block;
 transform: translate(0, 50%);
 color: #1DB954;
 text-decoration: unset;
 border: 2px solid #1DB954;
 padding: 20px;
 border-radius: 40px;
 text-transform: uppercase;
 transition: .2s ease-out;
 font-weight: 500;
 
  &:hover {
      background-color: #1DB954;
      color: #FFF;
  }
`

const Login = () => (
  <Container>
    <Link
      href={`${authEndPoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopesParametersUri}&response_type=token&show_dialog=true`}>
      Entrar com o spotify
    </Link>
  </Container>
)


export default Login