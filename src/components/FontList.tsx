import React, { useEffect, useState } from 'react';
import { deleteFont, getFonts } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setRenderFontList } from '../store/fontSlice';
import { FontGroup } from '../types';


const FontList: React.FC = () => {
    const [fonts, setFonts] = useState<FontGroup[]>([]);
    const renderFontList = useSelector((state: RootState) => state.font.renderFontList);
    const dispatch = useDispatch();
  
    const handleFontListChange = () => {
      dispatch(setRenderFontList(renderFontList + 1));
    };
    // Load fonts on component mount
    useEffect(() => {
        const fetchFonts = async () => {
            try {
                const response = await getFonts();
                setFonts(response.data);
            } catch (error) {
                console.error('Failed to fetch fonts:', error);
                alert('Failed to fetch fonts!');
            }
        };

        fetchFonts();
    }, []);

    // Handle font deletion
    const handleDelete = async (fontId: string) => {
        try {
            await deleteFont(fontId);
            setFonts(prevFonts => prevFonts.filter(font => font._id !== fontId));
            handleFontListChange()
            alert('Font deleted successfully!');
        } catch (error) {
            console.error('Failed to delete font:', error);
            alert('Failed to delete font!');
        }
    };

    // Inject all font faces once when fonts change
    useEffect(() => {
        const styleElement = document.createElement('style');
        document.head.appendChild(styleElement);

        const fontFaces = fonts.map(font => {
            const fontFileName = (font.path ?? '').replace(/\\/g, '/');
            const fontFamilyName = `${font.name}-${font._id}`;

            return `
                @font-face {
                    font-family: '${fontFamilyName}';
                    src: url('http://localhost:5050/${fontFileName}') format('truetype');
                }
            `;
        }).join('');

        styleElement.textContent = fontFaces;

        return () => {
            // Cleanup on unmount
            document.head.removeChild(styleElement);
        };
    }, [fonts]);

    return (
        <div>
            <div className="mb-3">
                <small className="text-muted">
                    Browse a list of Zepto fonts to build your font group.
                </small>
            </div>

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">FONT NAME</th>
                            <th scope="col">PREVIEW</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {fonts.map((font) => {
                            const fontFamilyName = `${font.name}-${font._id}`;

                            return (
                                <tr key={font._id}>
                                    <td className="align-middle">{font.name}</td>
                                    <td className="align-middle">
                                        <div style={{
                                            fontFamily: `'${fontFamilyName}', sans-serif`,
                                            fontSize: '20px',
                                            color: '#333'
                                        }}>
                                            Example Text
                                        </div>
                                    </td>
                                    <td className="align-middle">
                                        <button
                                            className="btn btn-outline-light btn-sm text-danger"
                                            onClick={() => handleDelete(font._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FontList;