import React, { useEffect, useState } from "react";
import useConstellationApi from "../../../api/useConstellationApi";
import CustomAlert from "../../../common/atoms/CustomAlert";
const ListTemplateModalConstellation = ({
  setIsModalOpen,
  setPointList,
  setLineList,
}) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [templateList, setTemplateList] = useState({
    templateList: [],
  });

  const handlePutTemplateConstellation = (template) => {
    setPointList(template.pointList);
    setLineList(template.lineList);
    handleCloseModal();
  };

  const getTemplateModalConstellation = async () => {
    try {
      const response =
        await useConstellationApi.constellationsGetTemplateList();
      if (response.status === 200) {
        setTemplateList(response.resultData);
      } else {
        setIsAlertVisible(true);
        setAlertMessage("");
      }
    } catch (e) {
      setIsAlertVisible(true);
      setAlertMessage("");
    }
  };

  useEffect(() => {
    getTemplateModalConstellation();
  }, []);

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <CustomAlert
          message={alertMessage}
          isVisible={isAlertVisible}
          onClose={() => setIsAlertVisible(false)}
        />
        <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
        <div className="z-10 rounded bg-white p-4 shadow-md">
          <div className="mt-4 flex justify-center">
            {templateList?.templateList.map((template) => (
              <div key={template.templateId}>
                <img
                  src={template.imageUrl}
                  onClick={() => {
                    handlePutTemplateConstellation(template);
                  }}
                />
              </div>
            ))}
            <button
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={handleCloseModal}
            >
              창 닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTemplateModalConstellation;
