import React from 'react';
import FontGroupList from '../components/FontGroupList';

const FontGroupsPage: React.FC = () => {
  return (
    <div className="container mt-5">
      <h6>Our Font Groups</h6>
      <FontGroupList />
    </div>
  );
};

export default FontGroupsPage;
