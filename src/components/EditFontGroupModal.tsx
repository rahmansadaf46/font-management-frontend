import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFonts, updateFontGroup } from '../services/api';
import { RootState } from '../store';
import { setRenderFontList } from '../store/fontSlice';

interface Font {
    _id: string;
    name: string;
    isActive?: boolean;
}

interface FontGroupRow {
    fontName: string;
    fontId: string;
    specificSize: string;
    priceChange: string;
}


interface Font {
    _id: string;
    name: string;
}

interface FontGroup {
    _id: string;
    name: string;
    fonts: Font[];
}

interface EditFontGroupModalProps {
    show: boolean;
    currentGroup: FontGroup;
    handleClose: () => void;
}
const EditFontGroupModal: React.FC<EditFontGroupModalProps> = ({ show, currentGroup, handleClose }) => {
    const [fontGroups, setFontGroups] = useState<Font[]>([]); // List of available fonts
    const [rows, setRows] = useState<FontGroupRow[]>([{ fontName: '', fontId: '', specificSize: '1.00', priceChange: '0' }]); // Font rows for selection
    const [groupTitle, setGroupTitle] = useState('');
    const renderFontList = useSelector((state: RootState) => state.font.renderFontList);
    const dispatch = useDispatch();

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

        const fetchFontGroup = async () => {
            try {
                const fontGroup = currentGroup;
                if (fontGroup) {
                    setGroupTitle(fontGroup.name);
                    setRows(fontGroup.fonts.filter((font: Font) => font.isActive).map((font: Font) => ({
                        fontName: font.name,
                        fontId: font._id,
                        specificSize: '1.00',
                        priceChange: '0',
                    })));
                }
            } catch (error) {
                console.error('Failed to fetch font group:', error);
                alert('Failed to fetch font group!');
            }
        };

        fetchFonts();
        fetchFontGroup();
    }, [currentGroup, renderFontList]);

    const handleFontListChange = () => {
        dispatch(setRenderFontList(renderFontList + 1));
    };

    const handleAddRow = () => {
        setRows([...rows, { fontName: '', fontId: '', specificSize: '1.00', priceChange: '0' }]);
    };

    const handleDeleteRow = (index: number) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const fontId = e.target.value;
        const selectedFont = fontGroups.find(font => font._id === fontId);
        const updatedRows = [...rows];
        updatedRows[index] = {
            ...updatedRows[index],
            fontName: selectedFont ? selectedFont.name : '',
            fontId: fontId,
        };
        setRows(updatedRows);
    };

    const handleGroupTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupTitle(e.target.value);
    };

    const handleUpdateFontGroup = async () => {
        const selectedFonts = rows.filter(row => row.fontName !== '').length;
        if (selectedFonts < 2) {
            alert('You must select at least two fonts');
            return;
        }
        if (groupTitle === '') {
            alert('Group title is required');
            return;
        }

        const fontGroupData = {
            title: groupTitle,
            fonts: rows.filter(row => row.fontId !== '').map(row => row.fontId),
        };

        try {
            await updateFontGroup(currentGroup._id, fontGroupData.title, fontGroupData.fonts);
            alert('Font group updated successfully');
            handleFontListChange();
        } catch (error) {
            alert('Failed to update font group!');
            console.error(error);
        }
    };

    return (
        <div
            className="modal fade show custom-modal"
            style={{ display: show ? 'block' : 'none', backdropFilter: 'blur(5px)' }}
            tabIndex={-1}
            aria-labelledby="editModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">Edit Font Group</h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
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
                                <div
                                    style={{ border: '1px solid lightGray', borderRadius: '7px', boxShadow: '1px 1px 5px gray' }}
                                    className="row mb-3 p-2 mx-1"
                                    key={index}
                                >
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
                                            disabled={rows.length === 1}
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="d-flex justify-content-between">
                                {/* Add Row Button */}
                                <button
                                    className="btn btn-light mb-4 px-5"
                                    style={{ border: '1px solid gray' }}
                                    onClick={handleAddRow}
                                >
                                    + Add Row
                                </button>

                                {/* Update Font Group Button */}
                                <button
                                    className="btn btn-success mb-4 px-5"
                                    onClick={handleUpdateFontGroup}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default EditFontGroupModal;
