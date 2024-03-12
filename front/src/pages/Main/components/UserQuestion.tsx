import { Button, Input, Typography } from 'antd';
import { useEffect, useState } from 'react';
import BarChart from './BarChart';
import { useLoading } from '@src/components/LoadingManager';

const { Text } = Typography;
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

interface Props {
  largeVectorSearch: (question: string) => Promise<CategoryData[]>;
  miniLmVectorSearch: (question: string) => Promise<CategoryData[]>;
  largeDbStatus?: {
    model_name?: string;
    db_name?: string;
    dimension?: number;
    total_vectors?: number;
  };
  searchData: SearchData;
}

const UserQuestion: React.FC<Props> = ({
  largeVectorSearch,
  miniLmVectorSearch,
  largeDbStatus,
  searchData,
}) => {
  const [question, setQuestion] = useState<string>('');
  const { handleLoading } = useLoading();
  const [searchResult, setSearchResult] = useState<SearchData>({ miniLmData: [], largeData: [] });
  const onClickQuestion = async (question: string) => {
    handleLoading(true);
    const largeData = await largeVectorSearch(question);
    const miniLmData = await miniLmVectorSearch(question);
    const search = { largeData, miniLmData };
    setSearchResult(search);
  };

  const onQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };
  useEffect(() => {
    searchResult && handleLoading(false);
  }, [searchResult]);

  return (
    <div className="mb-2 mt-10">
      <Text italic className="ml-1">
        사용자 질의 입력
      </Text>
      <div className="flex">
        <Input onChange={onQuestionChange} />
        <Button
          className="ml-2"
          type="primary"
          style={{ backgroundColor: '#3b82f6' }}
          onClick={() => onClickQuestion(question)}
        >
          검색
        </Button>
      </div>
      {largeDbStatus?.db_name ? (
        ''
      ) : (
        <Text type="danger" className="ml-4">
          현재 생성된 Vector DB가 없습니다.
        </Text>
      )}
      <div style={{ marginTop: 16 }}>
        {searchResult.miniLmData.length > 0 ? (
          <div className="mb-4">
            <h2 className="mb-4 mr-4">검색 결과</h2>
            <pre
              className="rounded-lg bg-gray-100 p-4"
              style={{ fontSize: '12px', maxHeight: '600px', overflowY: 'auto' }}
            >
              {JSON.stringify(searchResult, null, 2)}
            </pre>
          </div>
        ) : (
          ''
        )}
      </div>
      {searchResult.miniLmData.length > 0 ? (
        <BarChart searchData={searchData} searchInput={question} searchResult={searchResult} />
      ) : (
        ''
      )}
    </div>
  );
};

export default UserQuestion;
