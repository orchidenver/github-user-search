import React from 'react';
import { useContext } from 'react';

import { Helmet } from 'react-helmet';

import { Info, Repos, User, Search, Navbar } from '../components';

import loader from '../images/loader.gif';

import { GithubContext } from '../context/context';

const Dashboard = () => {
  const { loading } = useContext(GithubContext);

  if (loading) {
    return (
      <>
        <Helmet>
          <meta charset="utf-8" />
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
          <meta
            name="description"
            content="Project for searching Github users and exploring their profiles"
          />
          <title>Github User</title>
        </Helmet>
        <main>
          <Navbar />
          <Search />
          <img className='loading-img' src={loader} alt="loading information" />
        </main>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <meta
          name="description"
          content="Project for searching Github users and exploring their profiles"
        />
        <title>Github User Search</title>
      </Helmet>
      <main>
        <Navbar></Navbar>
        <Search />
        <Info />
        <User />
        <Repos />
      </main>
    </>
  );
};

export default Dashboard;
