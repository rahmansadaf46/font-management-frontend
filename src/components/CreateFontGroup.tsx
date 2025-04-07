import React, { useEffect, useState } from 'react';
import { createFontGroup, getFonts } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setRenderFontList } from '../store/fontSlice';
import { Font, FontGroupRow } from '../types';

const CreateFontGroup: React.FC = () => {
    const [fontGroups, setFontGroups] = useState<Font[]>([]); // List of available fonts
    const [rows, setRows] = useState<FontGroupRow[]>([{ fontName: '', fontId: '', specificSize: '1.00', priceChange: '0' }]); // Font rows for selection
    const [groupTitle, setGroupTitle] = useState('');
    const renderFontList = useSelector((state: RootState) => state.font.renderFontList);
    const dispatch = useDispatch();
    const handleFontListChange = () => {
        dispatch(setRenderFontList(renderFontList + 1));
    };


    useEffect(() => {
        const fetchFonts = async () => {
            try {
                const response = await getFonts();
                setFontGroups(response.data);
            } catch (error) {
                console.error('Failed to fetch fonts:', error);
                alert('Failed to fetch fonts!');
            }
        };

        fetchFonts();
    }, []);
    // Handle font row addition
    const handleAddRow = () => {
        setRows([...rows, { fontName: '', fontId: '', specificSize: '1.00', priceChange: '0' }]);
    };

    // Handle font row deletion
    const handleDeleteRow = (index: number) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const fontId = e.target.value; // The selected font's ID
        const selectedFont = fontGroups.find(font => font._id === fontId); // Find the font by ID
        const updatedRows = [...rows];
        updatedRows[index] = {
            ...updatedRows[index],
            fontName: selectedFont ? selectedFont.name : '', // Set font name
            fontId: fontId, // Set font ID
        };
        setRows(updatedRows);
    };

    // Handle group title change
    const handleGroupTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupTitle(e.target.value);
    };

    // Handle font group creation
    const handleCreateFontGroup = async () => {
        const selectedFonts = rows.filter(row => row.fontName !== '').length; // Only count rows where a font is selected
        if (selectedFonts < 2) {
            alert('You must select at least two fonts');
            return;
        }
        if (groupTitle === '') {
            alert('Group title is required');
            return;
        }

        // Prepare the data for API call
        const fontGroupData = {
            title: groupTitle,
            fonts: rows.filter(row => row.fontId !== '').map(row => row.fontId),
        };
        try {
            await createFontGroup(fontGroupData.title, fontGroupData.fonts);
            alert('Font group created successfully');
            setRows([{ fontName: '', fontId: '', specificSize: '1.00', priceChange: '0' }]);
            handleFontListChange()
        } catch (error) {
            alert('Failed to upload font!');
            console.error(error);
        }
    };

    return (
        <div>
            <div className="mb-4">
                <small className="text-muted">You have to select at least two fonts</small>
            </div>

            {/* Group Title */}
            <div className="form-group mb-4">
                <input
                    type="text"
                    className="form-control"
                    id="groupTitle"
                    value={groupTitle}
                    onChange={handleGroupTitleChange}
                    placeholder="Group Title"
                />
            </div>

            {/* Font Group Rows */}
            {rows.map((row, index) => (
                <div style={{ border: '1px solid lightGray', borderRadius: '7px', boxShadow: '1px 1px 5px gray' }} className="row mb-3 p-2 mx-1" key={index}>
                    <div className="col">
                        <select
                            className="form-select"
                            value={row.fontId}
                            onChange={(e) => handleFontChange(e, index)}
                        >
                            <option value="">Select Font</option>
                            {fontGroups.map((font) => (
                                <option key={font._id} value={font._id}>
                                    {font.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={row.specificSize}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={row.priceChange}
                        />
                    </div>
                    <div className="col-auto">
                        <button
                            className="btn btn-outline-light btn-sm text-danger"
                            onClick={() => handleDeleteRow(index)}
                            disabled={rows.length === 1} // Disable delete for the first row
                        >
                            X
                        </button>
                    </div>
                </div>
            ))}

            <div className='d-flex justify-content-between'>
                {/* Add Row Button */}
                <button className="btn btn-light mb-4 px-5" style={{ border: '1px solid gray' }} onClick={handleAddRow}>
                    + Add Row
                </button>

                {/* Create Font Group Button */}
                <button className="btn btn-success mb-4 px-5" onClick={handleCreateFontGroup}>
                    Create
                </button>
            </div>
        </div>
    );
};

export default CreateFontGroup;
