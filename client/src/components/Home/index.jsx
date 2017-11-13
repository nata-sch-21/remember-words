import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="wrapper no-back">
    <div className="row">
      <div className="col-6">
        <h2>
          Let&apos;s remember the words
        </h2>
      </div>
    </div>
    <div className="row">
      <div className="col-6 green">
        <Link to="/dictionaries">Start</Link>
      </div>
    </div>
  </div>
);

export default Home;
