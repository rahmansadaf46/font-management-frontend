import React from 'react';
import FontGroupList from './FontGroupList';

const FontGroupsComponent: React.FC = () => {
  return (
    <div className="container mt-5">
      <h6>Our Font Groups</h6>
      <FontGroupList />
    </div>
  );
};

export default FontGroupsComponent;
