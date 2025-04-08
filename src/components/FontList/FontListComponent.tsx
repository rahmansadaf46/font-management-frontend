import React from 'react';
import FontList from './FontList';

const FontListComponent: React.FC = () => {
  return (
    <div className="container mt-5">
      <h6>Our Fonts</h6>
      <FontList />
    </div>
  );
};

export default FontListComponent;
