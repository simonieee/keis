export interface Metadata {
  total: string;
  bottom: string;
  middle: string;
  top: string;
}

export interface DataItem {
  category: string;
  metadata: Metadata;
}

export interface SampleDataTypes {
  name: string;
  data: DataItem[];
}

export interface testDescTypes {
  testName: string;
  userName: string;
}

export interface SelectModelTypes {
  modelName: string;
  symbol: string;
}
export type createDbAndDataUpload = () => Promise<void>;
export type selectedModels = SelectModelTypes[];
export type setSelectedModels = React.Dispatch<React.SetStateAction<SelectModelTypes[]>>;

export interface CommonProps {
  selectedModels: SelectModelTypes[];
  setSelectedModels: React.Dispatch<React.SetStateAction<SelectModelTypes[]>>;
  selectedData: number;
  setSelectedData: React.Dispatch<React.SetStateAction<number>>;
  setTestDesc: React.Dispatch<React.SetStateAction<testDescTypes>>;
  testDesc: testDescTypes;
  createDbAndDataUpload: () => Promise<void>;
}
