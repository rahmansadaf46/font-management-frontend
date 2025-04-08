import React from 'react';
import { useSelector } from 'react-redux';
import CreateFontGroupComponent from '../components/CreateFontGroup/CreateFontGroupComponent';
import FontListComponent from '../components/FontList/FontListComponent';
import FontUploadComponent from '../components/FontUpload/FontUploadComponent';
import { RootState } from '../store';
import FontGroupsComponent from '../components/FontGroupList/FontGroupsComponent';

const Home: React.FC = () => {
  const renderFontList = useSelector((state: RootState) => state.font.renderFontList);
  return (
    <div key={renderFontList} className="container mt-5">
      <FontUploadComponent />
      <FontListComponent />
      <CreateFontGroupComponent />
      <FontGroupsComponent />
    </div>
  );
};

export default Home;
