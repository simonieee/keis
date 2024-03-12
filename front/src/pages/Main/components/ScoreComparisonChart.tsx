import React from 'react';
import ReactApexChart from 'react-apexcharts';

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

interface Props {
  data: resultData;
}

const ScoreComparisonChart: React.FC<Props> = ({ data }) => {
  // 평균 점수와 가장 낮은 점수 추출
  const largeDataAvgScore = data.model1.data.avg_score;
  const largeDataMinScore = data.model1.data.minimum_data.score;
  const miniDataAvgScore = data.model2.data.avg_score;
  const miniDataMinScore = data.model2.data.minimum_data.score;

  // 차트 설정
  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['avg_score', 'low_score'],
    },
    yaxis: {
      title: {
        text: '유사도 점수',
      },
    },
  };

  // 차트 데이터
  const series = [
    {
      name: 'intfloat/multilingual-e5-large',
      data: [largeDataAvgScore, largeDataMinScore],
    },
    {
      name: 'paraphrase-multilingual-MiniLM-L12-v2',
      data: [miniDataAvgScore, miniDataMinScore],
    },
  ];

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ScoreComparisonChart;
