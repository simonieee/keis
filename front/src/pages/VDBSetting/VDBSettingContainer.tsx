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
      // const dbCreationResults = await Promise.all(
      //   selectedModels.map(async (model) => {
      //     const dbName = model.symbol + '-' + selectedData + 1;
      //     console.log(model.modelName, dbName);
      //     const createDbResponse = await ChromaDbApi.createDb(model.modelName, dbName);
      //     if (createDbResponse.status !== 200) {
      //       // ���� �ڵ带 Ȯ���ϰų� ������ �˻��Ͽ� ���� ���� �Ǵ�
      //       throw new Error(`DB creation failed for model: ${model.modelName}, dbName: ${dbName}`);
      //     }
      //     return { modelName: model.modelName, dbName };
      //   })
      // );

      // console.log(dbCreationResults);

      // // ��� DB ������ ������ ��, �� DB�� ���� ���ε�
      // for (const { modelName, dbName } of dbCreationResults) {
      //   const formData = new FormData();
      //   formData.append(
      //     'file',
      //     new Blob([JSON.stringify(sample[selectedData].data)], { type: 'application/json' })
      //   );
      //   formData.append('db_name', dbName);
      //   formData.append('model_name', modelName);

      //   const uploadResponse = await ChromaDbApi.dataUpload(formData);
      //   console.log(uploadResponse);
      // }
      await Promise.all(
        selectedModels.map(async (i) => {
          const dbName = i.symbol + '-' + selectedData;
          console.log(i.modelName, dbName);
          const createDb = await ChromaDbApi.createDb(i.modelName, dbName);
          console.log(createDb);
          if (createDb.db_name) {
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
