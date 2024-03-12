import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const Api = {
  createDb: async (modelName: string, dbName: string) => {
    try {
      console.log(typeof modelName, typeof dbName);
      console.log(modelName, dbName);
      const response = await axios.post(
        `${BASE_URL}/vector_db/create_db/?model_name=${modelName}&db_name=${dbName}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  },
  dataUpload: async (formdata: FormData) => {
    try {
      console.log(formdata);
      const response = await axios.post(`${BASE_URL}/vector_db/data_upload/`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
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
