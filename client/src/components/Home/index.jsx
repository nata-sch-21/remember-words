import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';

const Home = () => (
  <div className="grid-1">
    <Header header="Let's remember the words" />
    <div className="col block green button-text">
      <Link to="/start">Start</Link>
    </div>
  </div>
);

export default Home;
