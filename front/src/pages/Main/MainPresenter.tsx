import Step1 from './components/\bStep1';
import DbStatus from './components/DbStatus';
import SimilarityVerification from './components/SimilarityVerification';
import Stepper from './components/Stepper';
import UserQuestion from './components/UserQuestion';

type data = {
  model_name?: string;
  db_name?: string;
  dimension?: number;
  total_vectors?: number;
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
type dbStatus = {
  model_name?: string;
  db_name?: string;
  dimension?: number;
  total_vectors?: number;
};

type Props = {
  largeDbStatus?: dbStatus;
  miniLmDbStatus?: dbStatus;
  handleDeleteLargeDb: () => Promise<boolean>;
  handleDeleteMiniLmDb: () => Promise<boolean>;
  createLargeModelDB: () => Promise<boolean>;
  createMiniLmVectorDB: () => Promise<boolean>;
  setLargeDbStatus: React.Dispatch<React.SetStateAction<data | undefined>>;
  setMiniLmDbStatus: React.Dispatch<React.SetStateAction<data | undefined>>;
  largeVectorSearch: (question: string) => Promise<CategoryData[]>;
  miniLmVectorSearch: (question: string) => Promise<CategoryData[]>;
  searchData: SearchData;
  setSelectModels: React.Dispatch<React.SetStateAction<{ model1: string; model2: string }>>;
  selectModels: { model1: string; model2: string };
  handleResultDataUpload: (data: any) => Promise<boolean>;
};

const MainPresenter: React.FC<Props> = ({
  largeDbStatus,
  miniLmDbStatus,
  searchData,
  createLargeModelDB,
  createMiniLmVectorDB,
  setLargeDbStatus,
  largeVectorSearch,
  miniLmVectorSearch,
  setMiniLmDbStatus,
  handleDeleteLargeDb,
  handleDeleteMiniLmDb,
  setSelectModels,
  selectModels,
  handleResultDataUpload,
}) => {
  const steps = [
    {
      title: '모델 및 DB 설정',
      content: (
        <Step1
          largeDbStatus={largeDbStatus}
          miniLmDbStatus={miniLmDbStatus}
          handleDeleteLargeDb={handleDeleteLargeDb}
          createLargeModelDB={createLargeModelDB}
          createMiniLmVectorDB={createMiniLmVectorDB}
          setLargeDbStatus={setLargeDbStatus}
          setMiniLmDbStatus={setMiniLmDbStatus}
          handleDeleteMiniLmDb={handleDeleteMiniLmDb}
          setSelectModels={setSelectModels}
          selectModels={selectModels}
        />
      ),
    },
    {
      title: '단일 조회 테스트',
      content: (
        <UserQuestion
          largeVectorSearch={largeVectorSearch}
          miniLmVectorSearch={miniLmVectorSearch}
          largeDbStatus={largeDbStatus}
          searchData={searchData}
        />
      ),
    },
    {
      title: '유사도 검증',
      content: (
        <SimilarityVerification
          selectModels={selectModels}
          largeDbStatus={largeDbStatus}
          miniLmDbStatus={miniLmDbStatus}
          handleResultDataUpload={handleResultDataUpload}
        />
      ),
    },
  ];
  return (
    <div className="p-4 py-8 sm:ml-64 ">
      {/* <div className="mt-14 rounded-lg border-2 border-dashed border-gray-200 bg-white p-4 dark:border-gray-700"> */}
      <div className="mt-14 rounded-lg border-2 border-dashed border-gray-200 bg-white p-4 ">
        <Stepper steps={steps} />
      </div>
    </div>
  );
};

export default MainPresenter;
