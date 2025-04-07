import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import CreateFontGroupPage from './CreateFontGroupPage';
import FontGroupsPage from './FontGroupsPage';
import FontListPage from './FontListPage';
import FontUploadPage from './FontUploadPage';

const Home: React.FC = () => {
  const renderFontList = useSelector((state: RootState) => state.font.renderFontList);
  return (
    <div key={renderFontList} className="container mt-5">
      <FontUploadPage />
      <FontListPage />
      <CreateFontGroupPage />
      <FontGroupsPage />
    </div>
  );
};

export default Home;
