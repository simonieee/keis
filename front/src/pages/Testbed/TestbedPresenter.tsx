import { Table, Typography, type TableColumnsType, Button } from 'antd';
import { resultData } from './type';
import { Fragment } from 'react';
import ScoreComparisonChart from '../Main/components/ScoreComparisonChart';

interface DataType {
  key: React.Key;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}

interface TestbedPresenterProps {
  testData: resultData[];
}

const { Text } = Typography;

const TestbedPresenter: React.FC<TestbedPresenterProps> = ({ testData }) => {
  const expandedRowRender = (record: any) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: '검색어', dataIndex: 'keyword', key: 'date' },
      { title: '직업/직무명', dataIndex: 'category', key: 'name' },
      {
        title: '하위',
        dataIndex: 'bottom',
        key: 'bottom',
      },
      {
        title: '중위',
        dataIndex: 'middle',
        key: 'middle',
      },
      {
        title: '상위',
        dataIndex: 'top',
        key: 'top',
      },
      {
        title: '유사도',
        dataIndex: 'score',
        key: 'score',
      },
    ];
    const model1Data: any = [];
    const model2Data: any = [];
    testData[record.key].model1.data.data.map((i, idx) => {
      model1Data.push({
        key: idx,
        keyword: i.keyword,
        category: i.metadata.category,
        bottom: i.metadata.bottom,
        middle: i.metadata.middle,
        top: i.metadata.top,
        score: i.score,
      });
    });
    testData[record.key].model2.data.data.map((i, idx) => {
      model2Data.push({
        key: idx,
        keyword: i.keyword,
        category: i.metadata.category,
        bottom: i.metadata.bottom,
        middle: i.metadata.middle,
        top: i.metadata.top,
        score: i.score,
      });
    });
    return (
      <Fragment>
        <ScoreComparisonChart data={testData[record.key]} />
        <div className="mb-4">
          <Text italic className="ml-1">
            Test Model1 Data
          </Text>
          <Table columns={columns} dataSource={model1Data} pagination={false} />
        </div>
        <div className="mb-4">
          <Text italic className="ml-1">
            Test Model2 Data
          </Text>
          <Table columns={columns} dataSource={model2Data} pagination={false} />
        </div>
      </Fragment>
    );
  };

  const columns: TableColumnsType<DataType> = [
    { title: 'TestCaseName', dataIndex: 'name', key: 'name' },
    { title: 'Decription', dataIndex: 'description', key: 'platform' },
    { title: 'Test Model1', dataIndex: 'model1', key: 'version' },
    { title: 'Model1 Score', dataIndex: 'score1', key: 'score1' },
    { title: 'Test Model2', dataIndex: 'model2', key: 'upgradeNum' },
    { title: 'Model2 Score', dataIndex: 'score2', key: 'score2' },
    { title: 'CreatAt', dataIndex: 'date', key: 'creator' },
  ];
  const data: any = [];
  testData.map((i, idx) => {
    data.push({
      key: idx,
      name: i.testCaseName,
      description: i.testCaseDescription,
      model1: i.model1.modelName,
      score1: i.model1.data.avg_score,
      model2: i.model2.modelName,
      score2: i.model2.data.avg_score,
      date: i.timestamp,
    });
  });
  return (
    <div className="p-4 py-8 sm:ml-64 ">
      <div className="p- mt-14 rounded-lg border-2 border-dashed border-gray-200 bg-white p-4">
        <Table
          scroll={{ x: 1300 }}
          columns={columns}
          expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default TestbedPresenter;
