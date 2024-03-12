import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const Api = {
  uploadResultData: async (data: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/db/data_upload/`, data);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  },
  dataRetrieve: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/db/data_retrieve/`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  },
};

export default Api;
