import { useEffect, useState } from 'react';
import MainPresenter from './MainPresenter';
import { LargeVectorSearchApi, MiniLmVectorSearchApi, MongoDbApi, VectordbApi } from '@src/api';
import DbStatus from './components/DbStatus';
import { useLoading } from '@src/components/LoadingManager';

type DbStatusType = {
  model_name?: string;
  db_name?: string;
  dimension?: number;
  total_vectors?: number;
};

const initialDbStatus: DbStatusType = {
  model_name: '',
  db_name: '',
  dimension: 0,
  total_vectors: 0,
};

interface Metadata {
  total: string;
  bottom: string;
  middle: string;
  top: string;
  id: string;
  category: string;
}
interface CategoryData {
  score: number;
  metadata: Metadata;
}
interface SearchData {
  miniLmData: CategoryData[];
  largeData: CategoryData[];
}

const initialSearchData = {
  miniLmData: [],
  largeData: [],
};

interface SelectModels {
  model1: string;
  model2: string;
}

const MainContainer = () => {
  const [largeDbStatus, setLargeDbStatus] = useState<DbStatusType | undefined>(initialDbStatus);
  const [miniLmDbStatus, setMiniLmDbStatus] = useState<DbStatusType | undefined>(initialDbStatus);
  const [selectModels, setSelectModels] = useState<SelectModels>({ model1: '', model2: '' });
  const [searchData, setSearchData] = useState<SearchData>(initialSearchData);
  const { handleLoading } = useLoading();
  /**
   * miniLm 모델 단일 조회
   * @param question
   * @returns
   */
  const miniLmVectorSearch = async (question: string) => {
    const result = await MiniLmVectorSearchApi.getSingleSearch(question);
    if (result) {
      setSearchData({ ...searchData, miniLmData: result });
      return result;
    }
    return 0;
  };
  /**
   * e5-large 모델 단일 조회
   * @param question
   * @returns
   */
  const largeVectorSearch = async (question: string) => {
    const result = await LargeVectorSearchApi.getSingleVectorSearch(question);
    if (result) {
      console.log(result);
      setSearchData({ ...searchData, largeData: result });
      return result;
    }
    return 0;
  };
  /**
   * MiniLM 모델 DB 생성
   * @returns
   */
  const createMiniLmVectorDB = async () => {
    const result = await VectordbApi.createMiniLmVectorDb();
    if (result) {
      setMiniLmDbStatus({
        model_name: 'miniLM',
        db_name: result.db_name,
        dimension: result.dimension,
        total_vectors: result.total_vectors,
      });
      return true;
    }
    return false;
  };
  /**
   * e5-large 모델 DB 생성
   * @returns
   */
  const createLargeModelDB = async () => {
    const result = await VectordbApi.createLargeLmVectorDb();
    if (result) {
      setLargeDbStatus({
        model_name: 'e5-large',
        db_name: result.db_name,
        dimension: result.dimension,
        total_vectors: result.total_vectors,
      });
      return true;
    }
    return false;
  };
  /**
   * minilm-model Vector DB 상태 조회
   * @returns
   */
  const handleMiniLmDbStatus = async () => {
    const result = await VectordbApi.getMiniLmDbStatus();
    if (result) {
      return result;
    }
    return false;
  };
  /**
   * e5-large Vector DB 상태 조회
   * @returns
   */
  const handleLargeDbStatus = async () => {
    const result = await VectordbApi.getLargeDbStatus();
    if (result) {
      return result;
    }
    return false;
  };
  /**
   * miniLm-model Vector DB 삭제
   * @returns
   */
  const handleDeleteMiniLmDb = async () => {
    const result = await VectordbApi.deleteMiniLmDb();
    if (result) {
      // eslint-disable-next-line no-undefined
      setLargeDbStatus(undefined);
      return true;
    }
    return false;
  };
  /**
   * large-model Vector DB 삭제
   * @returns
   */
  const handleDeleteLargeDb = async () => {
    const result = await VectordbApi.deleteLargeDb();
    if (result) {
      // eslint-disable-next-line no-undefined
      setLargeDbStatus(undefined);
      return true;
    }
    return false;
  };
  const handleResultDataUpload = async (data: any) => {
    handleLoading(true);
    const result = await MongoDbApi.uploadResultData(data);
    if (result) {
      handleLoading(false);
      console.log('susccess!');
      return true;
    }
    handleLoading(false);
    return false;
  };
  /**
   * 초기 Vector DB 상태 업데이트
   */
  useEffect(() => {
    handleLoading(true);
    const fetchDbStatus = async () => {
      const largeDb = await handleLargeDbStatus();
      const miniLmDb = await handleMiniLmDbStatus();
      if (largeDb.db_name) {
        setLargeDbStatus({
          model_name:
            largeDb.dimension === 384
              ? 'paraphrase-multilingual-MiniLM-L12-v2'
              : 'intfloat/multilingual-e5-large',
          db_name: largeDb.db_name,
          dimension: largeDb.dimension,
          total_vectors: largeDb.total_vectors,
        });
      }
      if (miniLmDb.db_name) {
        setMiniLmDbStatus({
          model_name:
            miniLmDb.dimension === 384
              ? 'paraphrase-multilingual-MiniLM-L12-v2'
              : 'intfloat/multilingual-e5-large',
          db_name: miniLmDb.db_name,
          dimension: miniLmDb.dimension,
          total_vectors: miniLmDb.total_vectors,
        });
      }
      handleLoading(false);
    };
    fetchDbStatus();
  }, []);

  return (
    <MainPresenter
      largeDbStatus={largeDbStatus}
      miniLmDbStatus={miniLmDbStatus}
      handleDeleteMiniLmDb={handleDeleteMiniLmDb}
      handleDeleteLargeDb={handleDeleteLargeDb}
      createLargeModelDB={createLargeModelDB}
      createMiniLmVectorDB={createMiniLmVectorDB}
      setLargeDbStatus={setLargeDbStatus}
      setMiniLmDbStatus={setMiniLmDbStatus}
      largeVectorSearch={largeVectorSearch}
      miniLmVectorSearch={miniLmVectorSearch}
      searchData={searchData}
      setSelectModels={setSelectModels}
      selectModels={selectModels}
      handleResultDataUpload={handleResultDataUpload}
    />
  );
};

export default MainContainer;
