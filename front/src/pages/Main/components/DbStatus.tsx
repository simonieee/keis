import { Button, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
import DataUploadVectordb from './DataUploadVectordb';

const { Option } = Select;
const { Text } = Typography;
interface data {
  model_name?: string;
  db_name?: string;
  dimension?: number;
  total_vectors?: number;
}

type Props = {
  dbStatus?: {
    model_name?: string;
    db_name?: string;
    dimension?: number;
    total_vectors?: number;
  };
  miniLmDbStatus?: data;
  largeDbStatus?: data;
  handleDeleteMiniLmDb: () => Promise<boolean>;
  handleDeleteLargeDb: () => Promise<boolean>;
  creatVectorDB?: () => Promise<boolean>;
  createLargeModelDB: () => Promise<boolean>;
  createMiniLmVectorDB: () => Promise<boolean>;
  setLargeDbStatus: React.Dispatch<React.SetStateAction<data | undefined>>;
  setDbStatus: React.Dispatch<React.SetStateAction<data | undefined>>;
  setMiniLmDbStatus: React.Dispatch<React.SetStateAction<data | undefined>>;
  selectModels: { model1: string; model2: string };
  setSelectModels: React.Dispatch<React.SetStateAction<{ model1: string; model2: string }>>;
};

const DbStatus: React.FC<Props> = ({
  miniLmDbStatus,
  largeDbStatus,
  creatVectorDB,
  setDbStatus,
  setMiniLmDbStatus,
  createMiniLmVectorDB,
  setLargeDbStatus,
  createLargeModelDB,
  handleDeleteMiniLmDb,
  handleDeleteLargeDb,
  selectModels,
  setSelectModels,
}) => {
  const handleDeleteDb = async () => {
    const largeDel = await handleDeleteLargeDb();
    const miniDel = await handleDeleteMiniLmDb();
    if (largeDel) {
      setLargeDbStatus({ model_name: '', db_name: '', dimension: 0, total_vectors: 0 });
    }
    if (miniDel) {
      setDbStatus({ model_name: '', db_name: '', dimension: 0, total_vectors: 0 });
    }
  };
  const handleCreateDb = async () => {
    // TODO : 모델 추가될 경우 selectModels에 선택된 모델에 맞는 dimension으로 생성해야함
    await createLargeModelDB();
    await createMiniLmVectorDB();
  };

  const onChangeModel1 = (value: string) => {
    setSelectModels({ ...selectModels, model1: value });
  };
  const onChangeModel2 = (value: string) => {
    setSelectModels({ ...selectModels, model2: value });
  };

  const models = [
    {
      value: 'e5-large',
      label: 'intfloat/multilingual-e5-large',
    },
    {
      value: 'miniLM',
      label: 'paraphrase-multilingual-MiniLM-L12-v2',
    },
  ];
  console.log(selectModels);
  useEffect(() => {
    miniLmDbStatus?.db_name && largeDbStatus?.db_name
      ? setSelectModels({
          model1: 'intfloat/multilingual-e5-large',
          model2: 'paraphrase-multilingual-MiniLM-L12-v2',
        })
      : null;
  }, []);
  console.log(selectModels);
  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <div className="mb-2 mt-10">
      <div className="mb-4">
        <Text italic className="ml-1">
          Embedding Model 테스트-1 모델 선택
        </Text>
        <Select
          className="mb-4"
          showSearch
          style={{ width: '100%' }}
          placeholder="Choose an embedding model"
          optionFilterProp="children"
          onChange={onChangeModel1}
          value={
            miniLmDbStatus?.db_name && largeDbStatus?.db_name
              ? miniLmDbStatus.model_name
              : selectModels.model1
          }
          filterOption={filterOption}
          // eslint-disable-next-line prettier/prettier
          disabled={miniLmDbStatus?.db_name && largeDbStatus?.db_name ? true : false}
        >
          {models
            .filter((model) => model.value !== selectModels.model2)
            .map((model) => (
              <Option key={model.value} value={model.value}>
                {model.label}
              </Option>
            ))}
        </Select>
        <Text italic className="ml-1">
          Embedding Model 테스트-2 모델 선택
        </Text>
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Choose another embedding model"
          optionFilterProp="children"
          onChange={onChangeModel2}
          value={
            miniLmDbStatus?.db_name && largeDbStatus?.db_name
              ? largeDbStatus.model_name
              : selectModels.model2
          }
          filterOption={filterOption}
          disabled={miniLmDbStatus?.db_name && largeDbStatus?.db_name ? true : false}
        >
          {models
            .filter((model) => model.value !== selectModels.model1)
            .map((model) => (
              <Option key={model.value} value={model.value}>
                {model.label}
              </Option>
            ))}
        </Select>
      </div>

      {/* <SelectModel
        setDbStatus={setDbStatus}
        dbStatus={dbStatus}
        title="Embedding Model 테스트-1 모델 선택"
      />
      <SelectModel
        setDbStatus={setDbStatus}
        dbStatus={dbStatus}
        title="Embedding Model 테스트-2 모델 선택"
      /> */}
      {/* <Text italic className="ml-1">
        Embedding Model 테스트-1 모델 선택
      </Text>
      <div className="mb-4">
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Choose an embedding model"
          optionFilterProp="children"
          onChange={onChangeModel}
          value={dbStatus?.model_name}
          onSearch={onSearch}
          filterOption={filterOption}
          disabled={dbStatus?.db_name ? true : false}
          options={[
            {
              value: 'e5-large',
              label: 'intfloat/multilingual-e5-large',
            },
            {
              value: 'miniLM',
              label: 'paraphrase-multilingual-MiniLM-L12-v2',
            },
          ]}
        />
      </div>
      <Text italic className="ml-1">
        테스트-1 모델 Vector DB Dimension
      </Text>
      <div className="mb-4 flex">
        <Input
          name="dimension"
          onChange={onChangeDbStatus}
          placeholder={
            dbStatus?.dimension ? dbStatus.dimension.toString() : 'Vector DB 차원수를 입력해주세요.'
          }
          value={dbStatus?.dimension}
          className="mb-4"
          disabled
        />
      </div> */}
      <div className="flex justify-end">
        <Button
          type="primary"
          className="mr-2"
          style={{
            backgroundColor:
              miniLmDbStatus?.db_name && largeDbStatus?.db_name ? '#cbd5e1' : '#3b82f6',
          }}
          disabled={miniLmDbStatus?.db_name && largeDbStatus?.db_name ? true : false}
          onClick={handleCreateDb}
        >
          DB 생성
        </Button>
        <Button
          type="primary"
          danger
          onClick={handleDeleteDb}
          disabled={miniLmDbStatus?.db_name && largeDbStatus?.db_name ? false : true}
        >
          DB 초기화
        </Button>
      </div>
      <DataUploadVectordb largeDbStatus={largeDbStatus} miniLmDbStatus={miniLmDbStatus} />
    </div>
  );
};

export default DbStatus;
