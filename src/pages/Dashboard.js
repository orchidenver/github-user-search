import React from 'react';
import { useContext } from 'react';

import { Info, Repos, User, Search, Navbar } from '../components';

import loader from '../images/loader.gif';

import { GithubContext } from '../context/context';

const Dashboard = () => {
  const { loading } = useContext(GithubContext);

  if (loading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img className='loading-img' src={loader} alt="loading information" />
      </main>
    )
  }

  return (
    <main>
      <Navbar></Navbar>
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
