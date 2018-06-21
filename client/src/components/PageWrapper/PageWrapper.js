import React from 'react';
import { string, element, shape } from 'prop-types';

import Header from '../Header';

const PageWrapper = ({ match, children }) => (
  <div className="grid-1">
    <Header path={match.path} />
    {children}
  </div>
);

PageWrapper.propTypes = {
  children: element.isRequired,
  match: shape({
    path: string,
  }).isRequired,
};

export default PageWrapper;
