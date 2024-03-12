import { Model } from './Components';
import { CommonProps } from './type';

const VDBSettingPresenter: React.FC<CommonProps> = ({
  setSelectedModels,
  selectedModels,
  setSelectedData,
  selectedData,
  testDesc,
  setTestDesc,
  createDbAndDataUpload,
}) => {
  return (
    <div className="p-4 py-8 sm:ml-64 ">
      <div className="p- mt-14 rounded-lg border-2 border-dashed border-gray-200 bg-white p-4">
        <Model
          selectedModels={selectedModels}
          setSelectedModels={setSelectedModels}
          setSelectedData={setSelectedData}
          selectedData={selectedData}
          testDesc={testDesc}
          setTestDesc={setTestDesc}
          createDbAndDataUpload={createDbAndDataUpload}
        />
      </div>
    </div>
  );
};

export default VDBSettingPresenter;
