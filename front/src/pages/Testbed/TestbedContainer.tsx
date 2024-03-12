import { MongoDbApi } from '@src/api';
import TestbedPresenter from './TestbedPresenter';
import { useEffect, useState } from 'react';
import { initialResultData, resultData } from './type';
import { useLoading } from '@src/components/LoadingManager';

const TestbedContainer = () => {
  const { handleLoading } = useLoading();
  const [testData, setTestData] = useState<resultData[]>([initialResultData]);
  const handleDataRetrieval = async () => {
    handleLoading(true);
    const result = await MongoDbApi.dataRetrieve();
    if (result) {
      setTestData(result);
      handleLoading(false);
      return true;
    }
    handleLoading(false);
    return false;
  };
  useEffect(() => {
    const fetchData = async () => {
      await handleDataRetrieval();
    };
    fetchData();
  }, []);

  return <TestbedPresenter testData={testData} />;
};

export default TestbedContainer;
