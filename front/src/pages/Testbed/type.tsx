export interface Metadata {
  bottom: string;
  category: string;
  id: string;
  middle: string;
  top: string;
  total: string;
}

export interface DataEntry {
  keyword: string;
  metadata: Metadata;
  score: number;
}

export interface MinimumData {
  keyword: string;
  metadata: Metadata;
  score: number;
}

export interface ApiResponse {
  data: DataEntry[];
  avg_score: number;
  minimum_data: MinimumData;
}

export interface resultData {
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
  timestamp: string;
}

export const initialResultData: resultData = {
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
  timestamp: '',
};
