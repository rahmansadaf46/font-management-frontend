import axios from 'axios';

// Create an Axios instance for API requests
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// API call for uploading a font
export const uploadFont = (formData: FormData) => {
  return api.post('/fonts/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// API call for getting all fonts
export const getFonts = () => {
  return api.get('/fonts');
};

// API call for deleting a font
export const deleteFont = (fontId: string) => {
  return api.delete(`/fonts/${fontId}`);
};

// API call for creating a font group
export const createFontGroup = (name: string, fontIds: string[]) => {
  return api.post('/font-groups', { name, fontIds });
};

// API call for getting all font groups
export const getFontGroups = () => {
  return api.get('/font-groups');
};

// API call for updating a font group
export const updateFontGroup = (groupId: string, title: string, fontIds: string[]) => {
  return api.put(`/font-groups/${groupId}`, { name: title, fontIds });
};

// API call for deleting a font group
export const deleteFontGroup = (groupId: string) => {
  return api.delete(`/font-groups/${groupId}`);
};
