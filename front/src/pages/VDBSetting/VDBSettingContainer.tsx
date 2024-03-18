import { useState } from 'react';
import VDBSettingPresenter from './VDBSettingPresenter';
import { testDescTypes, SelectModelTypes } from './type';
import { ChromaDbApi } from '@src/api';
import sample from '@src/assets/data/new_data.json';

const initialTestDesc = {
  testName: '',
  userName: '',
};

const VDBSettingContainer = () => {
  /* Router */
  /* State */
  const [selectedModels, setSelectedModels] = useState<SelectModelTypes[]>([]);
  const [selectedData, setSelectedData] = useState<number>(0);
  const [testDesc, setTestDesc] = useState<testDescTypes>(initialTestDesc);
  /* Hooks */
  /* Functions */
  const createDbAndDataUpload = async () => {
    try {
      await Promise.all(
        selectedModels.map(async (i) => {
          const dbName = i.symbol + '-' + selectedData;
          console.log(i.modelName, dbName);
          const createDb = await ChromaDbApi.createDb(i.modelName, dbName);
          console.log(createDb);
          if (createDb.name) {
            const formData = new FormData();
            formData.append(
              'file',
              new Blob([JSON.stringify(sample[selectedData].data)], { type: 'application/json' })
            );
            formData.append('db_name', dbName);
            formData.append('model_name', i.modelName);
            const a = await ChromaDbApi.dataUpload(formData);
            console.log(a);
          }
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
  /* Render */
  return (
    <VDBSettingPresenter
      selectedModels={selectedModels}
      setSelectedModels={setSelectedModels}
      setSelectedData={setSelectedData}
      selectedData={selectedData}
      testDesc={testDesc}
      setTestDesc={setTestDesc}
      createDbAndDataUpload={createDbAndDataUpload}
    />
  );
};

export default VDBSettingContainer;
