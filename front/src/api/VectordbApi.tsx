import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Api = {
  /**
   * e5-large Vector DB 생성
   * @returns
   */
  createLargeLmVectorDb: async () => {
    try {
      const response = await axios.post(`${BASE_URL}/large_model/create_db/`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  },
  /**
   * MiniLM Vector DB 생성
   * @returns
   */
  createMiniLmVectorDb: async () => {
    try {
      const response = await axios.post(`${BASE_URL}/minilm_model/create_db/`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  },
  /**
   * Vector DB 상태 조회
   * @returns
   */
  getDbStatus: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/db/status/`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  },
  /**
   * miniLm-model Vector DB 상태 조회
   * @returns
   */
  getMiniLmDbStatus: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/minilm_model/status_db/`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  },
  /**
   * Vector DB 상태 조회
   * @returns
   */
  getLargeDbStatus: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/large_model/status_db/`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  },
  /**
   * Vector DB 초기화
   * @returns
   */
  deleteDb: async () => {
    try {
      const response = await axios.post(`${BASE_URL}/db/delete/`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  },
  /**
   * miniLm-model Vector DB 초기화
   * @returns
   */
  deleteMiniLmDb: async () => {
    try {
      const response = await axios.post(`${BASE_URL}/minilm_model/delete_db/`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  },
  /**
   * e5-model Vector DB 초기화
   * @returns
   */
  deleteLargeDb: async () => {
    try {
      const response = await axios.post(`${BASE_URL}/large_model/delete_db/`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  },
};
export default Api;
