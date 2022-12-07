import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';

import { Helmet } from 'react-helmet';

import styled from 'styled-components';

import loginImg from '../images/login-img.svg';

const Login = () => {
  const {
    loginWithRedirect,
  } = useAuth0();


  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <meta
          name="description"
          content="Login. Project for searching Github users and exploring their profiles"
        />
        <title>Login Github User Search</title>
      </Helmet>
      <Wrapper>
        <div className="container">
          <img src={loginImg} alt="user login to github" />
          <h1>Github User</h1>
          <button className="btn" onClick={loginWithRedirect}>Login / Sign Up</button>
        </div>
      </Wrapper>
    </>
  )
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;

export default Login;
