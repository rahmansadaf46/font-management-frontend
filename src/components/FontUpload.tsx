import { CloudUpload } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFont } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setRenderFontList } from '../store/fontSlice';

const FontUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const renderFontList = useSelector((state: RootState) => state.font.renderFontList);
  const dispatch = useDispatch();

  const handleFontListChange = () => {
    dispatch(setRenderFontList(renderFontList + 1));
  };
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'font/ttf': ['.ttf'],
    },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('font', file);

    setUploading(true);
    try {
      await uploadFont(formData);
      alert('Font uploaded successfully!');
      setFile(null); // Clear file after successful upload
      handleFontListChange()
    } catch (error) {
      alert('Failed to upload font!');
      console.error(error);
    }
    setUploading(false);
  };


  return (
    <div>
      <div
        {...getRootProps()}
        className="upload-box p-5 text-center mt-5"
      >
        <input {...getInputProps()} />
        <CloudUpload style={{ color: '#9DA3AF' }} className="mb-2" size={40} />
        {file ? (
          <div>
            <h5>{file.name} ready for upload</h5>

          </div>
        ) : (
          <div style={{ color: '#9DA3AF' }}>
            <p><b>Click to upload</b> or drag and drop</p>
            <p style={{ fontSize: '14px' }}>Only TTF File Allowed</p>
          </div>
        )}


      </div>
      {file && (
          <div className='text-center'>
          <button onClick={handleUpload} className="btn btn-primary mt-3" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      )}
   
    </div>
  );
};

export default FontUpload;
