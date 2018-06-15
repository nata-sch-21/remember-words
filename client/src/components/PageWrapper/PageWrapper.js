import React from 'react';
import { string, element, shape } from 'prop-types';

import Header from '../Header';

const PageWrapper = ({ location, children }) => (
  <div className="grid-1">
    <Header path={location.pathname} />
    {children}
  </div>
);

PageWrapper.propTypes = {
  children: element.isRequired,
  location: shape({
    pathname: string,
  }).isRequired,
};

export default PageWrapper;
