import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, GetProp, Typography, Upload, message } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/lib/upload/interface';
import axios from 'axios';
import { LargeVectorSearchApi, MiniLmVectorSearchApi } from '@src/api';

const { Text } = Typography;
const exampleData = [
  {
    category: '강구조물가공원 및 건립원',
    metadata: {
      total: '강구조물가공원 및 건립원 하위(25%) 3,500만원, 중위값 3,885만원, 상위(25%) 4,144만원',
      bottom: '하위(25%) 3,500만원',
      middle: '중위값 3,885만원',
      top: '상위(25%) 4,144만원',
    },
  },
  {
    category: '건물도장공',
    metadata: {
      total: '건물도장공 하위(25%) 3,108만원, 중위값 3,730만원, 상위(25%) 4,144만원',
      bottom: '하위(25%) 3,108만원',
      middle: '중위값 3,730만원',
      top: '상위(25%) 4,144만원',
    },
  },
];

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
};

const DataUploadVectordb: React.FC<Props> = ({ miniLmDbStatus, largeDbStatus }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewJson, setPreviewJson] = useState<any>(null);

  // 업로드 버튼 클릭 시 실행되는 함수
  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file.originFileObj as RcFile);
    });
    await LargeVectorSearchApi.dataUpload(formData);
    await MiniLmVectorSearchApi.dataUpload(formData);
  };

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
      // 파일이 선택되면 내용을 읽고 미리보기를 생성합니다.
      if (newFileList.length > 0) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const content = e.target?.result;
          try {
            const json = JSON.parse(content as string);
            // JSON의 일부를 미리보기로 설정합니다. 여기서는 파일 전체를 설정합니다.
            setPreviewJson(json);
          } catch (error) {
            message.error('파일 내용을 파싱하는데 실패했습니다.');
            console.error(error);
          }
        };
        fileReader.readAsText(newFileList[0].originFileObj as Blob);
      } else {
        setPreviewJson(null); // 파일 선택이 취소되면 미리보기를 초기화합니다.
      }
    },
    fileList,
  };

  return (
    <div>
      <div className="mb-4 mt-10 flex items-center justify-start">
        <Text italic className="ml-1 mr-6">
          데이터 파일 업로드
        </Text>
        <Upload {...props}>
          <Button icon={<UploadOutlined />} disabled={fileList.length > 0}>
            파일 선택
          </Button>
        </Upload>
        {miniLmDbStatus?.total_vectors ? (
          <Text type="danger" className="ml-4">
            miniLm Vector DB에 저장된 데이터 수: {miniLmDbStatus?.total_vectors} {<br />}
            largeLm Vector DB에 저장된 데이터 수 : {largeDbStatus?.total_vectors} <br />
            데이터 중복을 피하기 위해 새로운 데이터를 업로드하려면 기존 데이터를 삭제해주세요.
          </Text>
        ) : (
          ''
        )}
      </div>
      <div style={{ marginTop: 16 }}>
        {previewJson ? (
          <div className="mb-4 flex">
            <h2 className="mr-4">JSON Preview:</h2>
            <pre
              className="rounded-lg bg-gray-100 p-4"
              style={{ fontSize: '12px', maxHeight: '600px', overflowY: 'auto' }}
            >
              {JSON.stringify(previewJson, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="mb-4 flex">
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
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          style={{ marginLeft: 10, backgroundColor: fileList.length === 0 ? '#cbd5e1' : '#3b82f6' }}
        >
          업로드
        </Button>
      </div>
    </div>
  );
};

export default DataUploadVectordb;
