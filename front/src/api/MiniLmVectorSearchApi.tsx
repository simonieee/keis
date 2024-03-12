import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Api = {
  getSingleSearch: async (question: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/minilm_model/search/?question=${question}`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  },
  dataUpload: async (data: FormData) => {
    try {
      const response = await axios.post(`${BASE_URL}/minilm_model/data_upload/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  },
  similarityVerification: async (data: FormData) => {
    try {
      const response = await axios.post(`${BASE_URL}/minilm_model/similarity_verification/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  },
};

export default Api;
