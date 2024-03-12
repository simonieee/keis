import { Button, Input, Typography, Upload, UploadFile, UploadProps, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { LargeVectorSearchApi, MiniLmVectorSearchApi } from '@src/api';
import { RcFile } from 'antd/es/upload';
import ScoreComparisonChart from './ScoreComparisonChart';
import { useLoading } from '@src/components/LoadingManager';
const { Text } = Typography;

const exampleData = [
  '강구조물가공원 및 건립원의 평균 임금은 얼마인가요?',
  '강구조물가공원 및 건립원의 하위 임금은 얼마인가요?',
  '강구조물가공원 및 건립원의 중위값 임금은 얼마인가요?',
  '강구조물가공원 및 건립원의 상위 임금은 얼마인가요?',
  '강구조물가공원 및 건립원의 임금은 다른 직업군과 비교해 어떤가요?',
  '강구조물가공원 및 건립원의 임금은 어떤 방식으로 지급되나요?',
  '강구조물가공원 및 건립원의 임금은 연봉으로 환산하면 어느 정도인가요?',
  '섀시조립·설치원의 평균 임금은 얼마인가요?',
  '섀시조립·설치원의 하위 25%의 임금은 얼마인가요?',
  '....',
];

interface Metadata {
  bottom: string;
  category: string;
  id: string;
  middle: string;
  top: string;
  total: string;
}

interface DataEntry {
  keyword: string;
  metadata: Metadata;
  score: number;
}

interface MinimumData {
  keyword: string;
  metadata: Metadata;
  score: number;
}

interface ApiResponse {
  data: DataEntry[];
  avg_score: number;
  minimum_data: MinimumData;
}

interface resultData {
  testCaseName: string;
  testCaseDescription: string;
  model1: {
    modelName?: string;
    data: ApiResponse;
  };
  model2: {
    modelName?: string;
    data: ApiResponse;
  };
}

type dbStatus = {
  model_name?: string;
  db_name?: string;
  dimension?: number;
  total_vectors?: number;
};

type testCaseType = {
  testCaseName: string;
  testCaseDescription: string;
};

type Props = {
  selectModels: { model1: string; model2: string };
  largeDbStatus?: dbStatus;
  miniLmDbStatus?: dbStatus;
  handleResultDataUpload: (data: any) => Promise<boolean>;
};

const SimilarityVerification: React.FC<Props> = ({
  largeDbStatus,
  miniLmDbStatus,
  handleResultDataUpload,
}) => {
  const { handleLoading } = useLoading();
  const [testCase, setTestCase] = useState<testCaseType>({
    testCaseName: '',
    testCaseDescription: '',
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewJson, setPreviewJson] = useState<any>(null);
  const [resultData, setResultData] = useState<resultData>({
    testCaseName: '',
    testCaseDescription: '',
    model1: {
      modelName: '',
      data: {
        data: [],
        avg_score: 0,
        minimum_data: {
          keyword: '',
          metadata: {
            bottom: '',
            category: '',
            id: '',
            middle: '',
            top: '',
            total: '',
          },
          score: 0,
        },
      },
    },
    model2: {
      modelName: '',
      data: {
        data: [],
        avg_score: 0,
        minimum_data: {
          keyword: '',
          metadata: {
            bottom: '',
            category: '',
            id: '',
            middle: '',
            top: '',
            total: '',
          },
          score: 0,
        },
      },
    },
  });

  const props: UploadProps = {
    multiple: false,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
      console.log(fileList[0]);
      if (newFileList.length > 0) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const content = e.target?.result;
          try {
            const json = JSON.parse(content as string);
            setPreviewJson(json);
          } catch (error) {
            message.error('파일 내용을 파싱하는데 실패했습니다.');
            console.error(error);
          }
        };
        fileReader.readAsText(newFileList[0].originFileObj as Blob);
      } else {
        setPreviewJson(null);
      }
    },
    fileList,
  };

  const handleUpload = async () => {
    handleLoading(true);
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file.originFileObj as RcFile);
    });
    const largeData = await LargeVectorSearchApi.similarityVerification(formData);
    const miniData = await MiniLmVectorSearchApi.similarityVerification(formData);
    const result = {
      testCaseName: testCase.testCaseName,
      testCaseDescription: testCase.testCaseDescription,
      model1: { modelName: largeDbStatus?.model_name, data: largeData },
      model2: { modelName: miniLmDbStatus?.model_name, data: miniData },
    };
    setPreviewJson(result);
    setResultData(result);
  };

  const onTestCaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestCase({ ...testCase, [e.target.name]: e.target.value });
  };

  console.log(testCase);

  useEffect(() => {
    handleLoading(false);
  }, [resultData]);

  return (
    <div className="mb-2 mt-10">
      <div className="mb-4 flex">
        <div className="w-1/2">
          <Text italic className="ml-1">
            Embedding Model 테스트-1 모델
          </Text>
          <Input defaultValue={largeDbStatus?.model_name} disabled />
        </div>
        <div className="ml-2 w-1/2">
          <Text italic className="ml-1">
            Embedding Model 테스트-2 모델
          </Text>
          <Input defaultValue={miniLmDbStatus?.model_name} disabled />
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2">
          <Text italic className="ml-1">
            테스트케이스명
          </Text>
          <Input value={testCase.testCaseName} name="testCaseName" onChange={onTestCaseChange} />
        </div>
        <div className="ml-2 w-1/2">
          <Text italic className="ml-1">
            테스트케이스 설명
          </Text>
          <Input
            value={testCase.testCaseDescription}
            name="testCaseDescription"
            onChange={onTestCaseChange}
          />
        </div>
      </div>
      <div className="mb-4 mt-10 flex items-center justify-start">
        <Text italic className="ml-1 mr-6">
          데이터 파일 업로드
        </Text>
        <Upload {...props}>
          <Button icon={<UploadOutlined />} disabled={fileList.length > 0}>
            파일 선택
          </Button>
        </Upload>
      </div>
      <div className="mt-6">
        {previewJson ? (
          <div className="mb-4">
            <h2 className="mr-4">JSON Preview:</h2>
            <pre
              className="rounded-lg bg-gray-100 p-4"
              style={{ fontSize: '12px', maxHeight: '600px', overflowY: 'auto' }}
            >
              {JSON.stringify(previewJson, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="mb-4">
            <h2 className="mr-4">JSON Example</h2>
            <pre
              className="rounded-lg bg-gray-100 p-4"
              style={{ fontSize: '12px', maxHeight: '600px', overflowY: 'auto' }}
            >
              {JSON.stringify(exampleData, null, 2)}
            </pre>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        {resultData.model1.data.data.length === 0 ? (
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            style={{
              marginLeft: 10,
              backgroundColor: fileList.length === 0 ? '#cbd5e1' : '#3b82f6',
            }}
          >
            업로드
          </Button>
        ) : (
          ''
        )}
      </div>
      <ScoreComparisonChart data={resultData} />
      <div className="flex justify-end">
        {resultData.model1.data.data.length === 0 ? (
          ''
        ) : (
          <Button
            type="primary"
            onClick={() => handleResultDataUpload(resultData)}
            disabled={fileList.length === 0}
            style={{
              marginLeft: 10,
              backgroundColor: fileList.length === 0 ? '#cbd5e1' : '#3b82f6',
            }}
          >
            결과 저장
          </Button>
        )}
      </div>
    </div>
  );
};

export default SimilarityVerification;
