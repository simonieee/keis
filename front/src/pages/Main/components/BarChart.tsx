import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface Metadata {
  total: string;
  bottom: string;
  middle: string;
  top: string;
  category: string;
  id: string;
}
interface CategoryData {
  score: number;
  metadata: Metadata;
}

interface SearchData {
  miniLmData: CategoryData[];
  largeData: CategoryData[];
}

type Props = {
  searchData: SearchData;
  searchInput: string;
  searchResult: SearchData;
};

interface CustomDataPoint {
  x: string | number;
  y: number;
  answer: string; // 커스텀 필드
}

interface CustomSeries {
  name: string;
  data: CustomDataPoint[];
}

interface FormatterParams {
  series: CustomSeries[];
  seriesIndex: number;
  dataPointIndex: number;
}

const BarChart: React.FC<Props> = ({ searchInput, searchResult }) => {
  // series 상태만 관리합니다.
  const [series, setSeries] = useState<any>([]);
  const [chartKey, setChartKey] = useState(0);
  useEffect(() => {
    // series 데이터를 업데이트합니다.
    const miniLmScores = searchResult.miniLmData.map((item) => item.score);
    const largeScores = searchResult.largeData.map((item) => item.score);

    setSeries([
      {
        name: 'intfloat/multilingual-e5-large',
        data: largeScores,
      },
      {
        name: 'miniLM',
        data: miniLmScores,
      },
    ]);
    setChartKey((prevKey) => prevKey + 1);
  }, [searchResult]);

  // options 객체를 직접 상태로 관리하지 않고, 컴포넌트 내에서 계산합니다.
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
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['1순위', '2순위', '3순위', '4순위', '5순위'],
    },
    yaxis: {
      title: {
        text: '유사도 점수',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number, { seriesIndex, dataPointIndex }: FormatterParams) => {
          // searchResult에서 최신 데이터를 직접 참조합니다.
          const categories =
            seriesIndex === 0
              ? searchResult.largeData.map((item) => item.metadata.category)
              : searchResult.miniLmData.map((item) => item.metadata.category);
          const answer = categories[dataPointIndex] || '';
          return `${answer} (${val})`;
        },
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart key={chartKey} options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default BarChart;
