import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontGroup } from '../../types';
import { RootState } from '../../store';
import { setRenderFontList } from '../../store/fontSlice';
import { deleteFontGroup, getFontGroups } from '../../services/api';
import EditFontGroupModal from './EditFontGroupModal';


const FontGroupList: React.FC = () => {
  const [fontGroups, setFontGroups] = useState<FontGroup[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<FontGroup>({
    _id: '',
    name: 'hello',
    fonts: [{ name: '', _id: '' }]
  });
  const renderFontList = useSelector((state: RootState) => state.font.renderFontList);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFontGroups = async () => {
      try {
        const response = await getFontGroups();
        setFontGroups(response.data);
      } catch (error) {
        console.error('Failed to fetch font groups:', error);
        alert('Failed to fetch font groups!');
      }
    };

    fetchFontGroups();
  }, [renderFontList]);

  const handleFontListChange = () => {
    dispatch(setRenderFontList(renderFontList + 1));
  };

  const handleDelete = async (groupId: string) => {
    try {
      await deleteFontGroup(groupId);
      setFontGroups(prevFonts => prevFonts.filter(font => font._id !== groupId));
      handleFontListChange();
      alert('Font Group deleted successfully!');
    } catch (error) {
      console.error('Failed to delete font:', error);
      alert('Failed to delete font!');
    }
  };

  // Show Edit Modal with selected font group data
  const handleEdit = (group: FontGroup) => {
    setCurrentGroup(group);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentGroup({
      _id: '',
      name: 'hello',
      fonts: [{ name: '', _id: '' }]
    });
  };

  return (
    <div>
      <div className="mb-3">
        <small className="text-muted">You have to select at least two fonts</small>
      </div>

      <table  className="table table-hover mb-5" >
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Fonts</th>
            <th scope="col">Count</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fontGroups.map((group) => (
            <tr key={group._id}>
              <td>{group.name}</td>
              <td> {group.fonts.map((font, index) => (
                <span
                  key={font._id}
                  style={{ color: font.isActive ? 'inherit' : 'lightgray' }}
                >
                  {font.name}
                  {index !== group.fonts.length - 1 && ', '}
                </span>
              ))}</td>
              <td>{group.fonts.length}</td>
              <td>
                <button
                  className="btn btn-outline-light btn-sm text-primary"
                  onClick={() => handleEdit(group)}
                >
                  Edit
                </button>
                <button
                  className="ms-1 btn btn-outline-light btn-sm text-danger"
                  onClick={() => handleDelete(group._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <EditFontGroupModal
        show={showModal}
        currentGroup={currentGroup}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

export default FontGroupList;
