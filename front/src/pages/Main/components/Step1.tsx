import { Fragment } from 'react';
import DbStatus from './DbStatus';
interface data {
  model_name?: string;
  db_name?: string;
  dimension?: number;
  total_vectors?: number;
}
type DbStatus = {
  model_name?: string;
  db_name?: string;
  dimension?: number;
  total_vectors?: number;
};
type Props = {
  largeDbStatus?: DbStatus;
  miniLmDbStatus?: DbStatus;
  handleDeleteLargeDb: () => Promise<boolean>;
  handleDeleteMiniLmDb: () => Promise<boolean>;
  createLargeModelDB: () => Promise<boolean>;
  createMiniLmVectorDB: () => Promise<boolean>;
  setLargeDbStatus: React.Dispatch<React.SetStateAction<data | undefined>>;
  setMiniLmDbStatus: React.Dispatch<React.SetStateAction<data | undefined>>;
  setSelectModels: React.Dispatch<React.SetStateAction<{ model1: string; model2: string }>>;
  selectModels: { model1: string; model2: string };
};
const Step1: React.FC<Props> = ({
  largeDbStatus,
  miniLmDbStatus,
  createLargeModelDB,
  createMiniLmVectorDB,
  setLargeDbStatus,
  setMiniLmDbStatus,
  handleDeleteLargeDb,
  handleDeleteMiniLmDb,
  setSelectModels,
  selectModels,
}) => {
  return (
    <Fragment>
      <DbStatus
        miniLmDbStatus={miniLmDbStatus}
        largeDbStatus={largeDbStatus}
        setDbStatus={setMiniLmDbStatus}
        setMiniLmDbStatus={setMiniLmDbStatus}
        setLargeDbStatus={setLargeDbStatus}
        createMiniLmVectorDB={createMiniLmVectorDB}
        createLargeModelDB={createLargeModelDB}
        handleDeleteMiniLmDb={handleDeleteMiniLmDb}
        handleDeleteLargeDb={handleDeleteLargeDb}
        setSelectModels={setSelectModels}
        selectModels={selectModels}
      />
    </Fragment>
  );
};

export default Step1;
