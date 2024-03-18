import { Button, Divider, Input, Space, Tooltip, Typography } from 'antd';
import { CommonProps, SelectModelTypes } from '../type';
import sample from '@src/assets/data/new_data.json';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
const { Text } = Typography;
const models = [
  {
    modelName: 'sentence-transformers/LaBSE',
    symbol: 'LaBSE',
  },
  {
    modelName: 'sentence-transformers/clip-ViT-B-32-multilingual-v1',
    symbol: 'clip-v1',
  },
  {
    modelName: 'sentence-transformers/distiluse-base-multilingual-cased-v2',
    symbol: 'distiluse-v2',
  },
  {
    modelName: 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2',
    symbol: 'paraphrase-L12-v2',
  },
  {
    modelName: 'sentence-transformers/paraphrase-multilingual-mpnet-base-v2',
    symbol: 'mpnet-v2',
  },
  {
    modelName: 'intfloat/multilingual-e5-base',
    symbol: 'e5-base',
  },
  {
    modelName: 'intfloat/multilingual-e5-small',
    symbol: 'e5-small',
  },
  {
    modelName: 'intfloat/multilingual-e5-large',
    symbol: 'e5-large',
  },
  {
    modelName: 'goldenrooster/multilingual-e5-large',
    symbol: 'e5-large-gr',
  },
  {
    modelName: 'morgendigital/multilingual-e5-large-quantized',
    symbol: 'e5-large-q',
  },
  {
    modelName: 'kev216/sentence-embedding-LaBSE',
    symbol: 'LaBSE-kev',
  },
  {
    modelName: 'mlx-community/multilingual-e5-large-mlx',
    symbol: 'e5-large-mlx',
  },
  {
    modelName: 'Griffin88/sentence-embedding-LaBSE',
    symbol: 'LaBSE-g88',
  },
];

const Model: React.FC<CommonProps> = ({
  selectedModels,
  setSelectedModels,
  setSelectedData,
  selectedData,
  setTestDesc,
  testDesc,
  createDbAndDataUpload,
}) => {
  /* Router */
  /* State */
  console.log(selectedModels);
  const [logs, setLogs] = useState<string[]>([]);
  /* Hooks */
  useEffect(() => {
    const socket = io('http://localhost:9999');

    socket.on('connect', () => {
      console.log('connect');
    });

    socket.on('log', (message: string) => {
      setLogs((prev) => [...prev, message]);
    });
  }, []);
  console.log(logs);

  /* Functions */
  const handleModelClick = (model: SelectModelTypes) => {
    setSelectedModels((prev) => {
      const isModelSelected = prev.some((m) => m.modelName === model.modelName);
      if (isModelSelected) {
        return prev.filter((m) => m.modelName !== model.modelName);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, model];
    });
  };

  const handleSelectData = (data: number) => {
    setSelectedData((prev) => {
      if (prev === data) {
        return 0;
      }
      return data;
    });
  };

  const handleTestDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestDesc({ ...testDesc, [e.target.name]: e.target.value });
  };

  /* Render */
  return (
    <div className="mb-2 mt-4">
      <div className="mb-4">
        <div className="flex">
          <div className="w-1/2">
            <Text italic className="ml-1">
              사용자명
            </Text>
            <Input name="userName" onChange={(e) => handleTestDesc(e)} value={testDesc.userName} />
          </div>
          <div className="ml-2 w-1/2">
            <Text italic className="ml-1">
              테스트케이스명
            </Text>
            <Input name="testName" onChange={(e) => handleTestDesc(e)} value={testDesc.testName} />
          </div>
        </div>
        <Divider orientation="left">Model Selects</Divider>
        <Text italic className="ml-2">
          모델을 선택해주세요. *최대 3개 선택가능합니다. 선택된 모델은 파란색으로 표시됩니다.
        </Text>
        <Space wrap className="mt-4">
          {models.map((model) => (
            <Tooltip title={model.symbol} key={model.symbol}>
              <Button
                type={selectedModels.includes(model) ? 'primary' : 'default'}
                onClick={() => handleModelClick(model)}
                style={{
                  backgroundColor: selectedModels.includes(model) ? '#3b82f6' : '',
                }}
              >
                {model.modelName}
              </Button>
            </Tooltip>
          ))}
        </Space>
        <Divider orientation="left">Upload Data</Divider>
        <div className="mb-4">
          <Text italic className="ml-2 ">
            VectorDB에 업로드할 데이터를 선택해주세요.
          </Text>
        </div>
        <Space wrap>
          {sample.map((data, idx) => (
            <Tooltip title="sample Data 1" key={idx}>
              <Button
                type={selectedData === idx ? 'primary' : 'default'}
                onClick={() => handleSelectData(idx)}
                style={{
                  backgroundColor: selectedData === idx ? '#3b82f6' : '',
                }}
              >
                {data.name}
              </Button>
            </Tooltip>
          ))}
        </Space>
        <div style={{ marginTop: 16 }}>
          {selectedData !== null ? (
            <div className="mb-4">
              <h2 className="mr-4">{sample[selectedData].name} Preview</h2>
              <pre
                className="rounded-lg bg-gray-100 p-4"
                style={{ fontSize: '12px', maxHeight: '600px', overflowY: 'auto' }}
              >
                {JSON.stringify(sample[selectedData].data, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="mb-4">
              <h2 className="mr-4">JSON Preview</h2>
              <pre
                className="rounded-lg bg-gray-100 p-4"
                style={{ fontSize: '12px', maxHeight: '600px', overflowY: 'auto' }}
              >
                {JSON.stringify(sample[0].data[0], null, 2)}
              </pre>
            </div>
          )}
        </div>
        {logs && logs.length > 0 ? (
          <div className="mb-4">
            <h2 className="mr-4">Logs</h2>
            <pre
              className="rounded-lg bg-gray-100 p-4"
              style={{ fontSize: '12px', maxHeight: '600px', overflowY: 'auto' }}
            >
              {logs.map((log, idx) => (
                <div key={idx}>{log}</div>
              ))}
            </pre>
          </div>
        ) : (
          ''
        )}
        <div className="flex justify-end">
          {selectedData !== null ? (
            <Button
              type="primary"
              style={{ backgroundColor: '#3b82f6' }}
              onClick={createDbAndDataUpload}
            >
              VectorDB 생성 및 업로드
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default Model;
